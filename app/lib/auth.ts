import crypto from 'crypto';
import { neon } from '@neondatabase/serverless';

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  membershipExpiry?: string;
};

export type SessionRecord = {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

type UserRow = {
  id: string;
  email: string;
  password_hash: string;
  password_salt: string;
  created_at: string | Date;
  membership_expiry: string | Date | null;
};

type SessionRow = {
  user_id: string;
  created_at: string | Date;
  expires_at: string | Date;
};

let sqlClient: ReturnType<typeof neon> | null = null;
let schemaPromise: Promise<void> | null = null;

function getSql() {
  if (sqlClient) return sqlClient;
  const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured.');
  }
  sqlClient = neon(databaseUrl);
  return sqlClient;
}

async function ensureSchema() {
  if (!schemaPromise) {
    const initialization = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS toolly_users (
          id TEXT PRIMARY KEY,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          password_salt TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          membership_expiry TIMESTAMPTZ
        )
      `;
      await sql`
        CREATE TABLE IF NOT EXISTS toolly_sessions (
          token_hash TEXT PRIMARY KEY,
          user_id TEXT NOT NULL REFERENCES toolly_users(id) ON DELETE CASCADE,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          expires_at TIMESTAMPTZ NOT NULL
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS toolly_sessions_user_id_idx ON toolly_sessions(user_id)`;
      await sql`CREATE INDEX IF NOT EXISTS toolly_sessions_expires_at_idx ON toolly_sessions(expires_at)`;
    })();
    schemaPromise = initialization.catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

function toIsoString(value: string | Date) {
  return new Date(value).toISOString();
}

function rowToUser(row: UserRow): UserRecord {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    passwordSalt: row.password_salt,
    createdAt: toIsoString(row.created_at),
    membershipExpiry: row.membership_expiry ? toIsoString(row.membership_expiry) : undefined,
  };
}

function hashPassword(password: string, salt: string) {
  return crypto.scryptSync(password, salt, 64).toString('hex');
}

function verifyPassword(password: string, salt: string, expectedHash: string) {
  try {
    const actual = Buffer.from(hashPassword(password, salt), 'hex');
    const expected = Buffer.from(expectedHash, 'hex');
    return actual.length === expected.length && crypto.timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

function hashToken(token: string) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

export function createExpiry(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export async function registerUser(email: string, password: string) {
  await ensureSchema();
  const sql = getSql();
  const normalizedEmail = email.trim().toLowerCase();
  const salt = crypto.randomBytes(16).toString('hex');
  const passwordHash = hashPassword(password, salt);
  const id = crypto.randomUUID();
  const membershipExpiry = createExpiry(180);

  const rows = await sql`
    INSERT INTO toolly_users (
      id, email, password_hash, password_salt, membership_expiry
    ) VALUES (
      ${id}, ${normalizedEmail}, ${passwordHash}, ${salt}, ${membershipExpiry}
    )
    ON CONFLICT (email) DO NOTHING
    RETURNING id, email, password_hash, password_salt, created_at, membership_expiry
  ` as unknown as UserRow[];

  if (!rows.length) {
    return { success: false as const, message: '该邮箱已注册，请直接登录。' };
  }

  return {
    success: true as const,
    message: '注册成功，已开启半年免费会员体验。',
    user: rowToUser(rows[0]),
  };
}

export async function authenticateUser(email: string, password: string) {
  await ensureSchema();
  const sql = getSql();
  const normalizedEmail = email.trim().toLowerCase();
  const rows = await sql`
    SELECT id, email, password_hash, password_salt, created_at, membership_expiry
    FROM toolly_users
    WHERE email = ${normalizedEmail}
    LIMIT 1
  ` as unknown as UserRow[];

  const row = rows[0];
  if (!row || !verifyPassword(password, row.password_salt, row.password_hash)) {
    return null;
  }
  return rowToUser(row);
}

export async function createSession(userId: string) {
  await ensureSchema();
  const sql = getSql();
  const token = crypto.randomBytes(32).toString('base64url');
  const tokenHash = hashToken(token);
  const expiresAt = createExpiry(30);

  await sql`DELETE FROM toolly_sessions WHERE expires_at <= NOW()`;
  await sql`
    INSERT INTO toolly_sessions (token_hash, user_id, expires_at)
    VALUES (${tokenHash}, ${userId}, ${expiresAt})
  `;
  return token;
}

export async function getSession(token: string): Promise<SessionRecord | null> {
  if (!token) return null;
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT user_id, created_at, expires_at
    FROM toolly_sessions
    WHERE token_hash = ${hashToken(token)} AND expires_at > NOW()
    LIMIT 1
  ` as unknown as SessionRow[];

  const row = rows[0];
  if (!row) return null;
  return {
    token,
    userId: row.user_id,
    createdAt: toIsoString(row.created_at),
    expiresAt: toIsoString(row.expires_at),
  };
}

export async function invalidateSession(token: string) {
  if (!token) return;
  await ensureSchema();
  const sql = getSql();
  await sql`DELETE FROM toolly_sessions WHERE token_hash = ${hashToken(token)}`;
}

export async function getUserById(id: string) {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, email, password_hash, password_salt, created_at, membership_expiry
    FROM toolly_users
    WHERE id = ${id}
    LIMIT 1
  ` as unknown as UserRow[];
  return rows[0] ? rowToUser(rows[0]) : null;
}

export async function getUserFromToken(token: string) {
  if (!token) return null;
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT u.id, u.email, u.password_hash, u.password_salt, u.created_at, u.membership_expiry
    FROM toolly_sessions AS s
    INNER JOIN toolly_users AS u ON u.id = s.user_id
    WHERE s.token_hash = ${hashToken(token)} AND s.expires_at > NOW()
    LIMIT 1
  ` as unknown as UserRow[];
  return rows[0] ? rowToUser(rows[0]) : null;
}

export function getMembershipStatus(user: UserRecord | null) {
  if (!user) {
    return { isActive: false, expiresAt: null, remainingDays: 0 };
  }
  const now = new Date();
  const expiresAt = user.membershipExpiry ? new Date(user.membershipExpiry) : null;
  const isActive = expiresAt ? expiresAt > now : false;
  const remainingDays = expiresAt ? Math.max(Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)), 0) : 0;
  return {
    isActive,
    expiresAt: expiresAt?.toISOString() ?? null,
    remainingDays,
  };
}

export async function upgradeMembership(userId: string, plan: 'monthly' | 'yearly') {
  await ensureSchema();
  const sql = getSql();
  const addDays = plan === 'monthly' ? 30 : 365;
  const rows = await sql`
    UPDATE toolly_users
    SET membership_expiry = GREATEST(COALESCE(membership_expiry, NOW()), NOW()) + (${addDays} * INTERVAL '1 day')
    WHERE id = ${userId}
    RETURNING id, email, password_hash, password_salt, created_at, membership_expiry
  ` as unknown as UserRow[];
  return rows[0] ? rowToUser(rows[0]) : null;
}
