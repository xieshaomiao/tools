import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export type UserRecord = {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  membershipExpiry?: string;
};

export type SessionRecord = {
  token: string;
  userId: string;
  createdAt: string;
};

const dataDir = path.join(process.cwd(), 'app', 'data');
const usersFile = path.join(dataDir, 'users.json');
const sessionsFile = path.join(dataDir, 'sessions.json');

async function ensureDataFiles() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(usersFile);
  } catch {
    await fs.writeFile(usersFile, '[]');
  }
  try {
    await fs.access(sessionsFile);
  } catch {
    await fs.writeFile(sessionsFile, '[]');
  }
}

async function readJson<T>(filePath: string, defaultValue: T): Promise<T> {
  await ensureDataFiles();
  try {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content || 'null') ?? defaultValue;
  } catch {
    return defaultValue;
  }
}

async function writeJson(filePath: string, data: unknown) {
  await ensureDataFiles();
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function loadUsers(): Promise<UserRecord[]> {
  return readJson<UserRecord[]>(usersFile, []);
}

export async function saveUsers(users: UserRecord[]) {
  return writeJson(usersFile, users);
}

export async function loadSessions(): Promise<SessionRecord[]> {
  return readJson<SessionRecord[]>(sessionsFile, []);
}

export async function saveSessions(sessions: SessionRecord[]) {
  return writeJson(sessionsFile, sessions);
}

export function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function createExpiry(days: number) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

export async function registerUser(email: string, password: string) {
  const users = await loadUsers();
  const normalizedEmail = email.trim().toLowerCase();
  if (users.some((item) => item.email === normalizedEmail)) {
    return { success: false, message: '该邮箱已注册，请直接登录。' };
  }

  const newUser: UserRecord = {
    id: crypto.randomUUID(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
    membershipExpiry: createExpiry(180),
  };

  users.push(newUser);
  await saveUsers(users);
  return { success: true, message: '注册成功，已开启半年免费会员体验。', user: newUser };
}

export async function authenticateUser(email: string, password: string) {
  const users = await loadUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = hashPassword(password);
  return users.find((user) => user.email === normalizedEmail && user.passwordHash === passwordHash) ?? null;
}

export async function createSession(userId: string) {
  const sessions = await loadSessions();
  const token = crypto.randomUUID();
  sessions.push({ token, userId, createdAt: new Date().toISOString() });
  await saveSessions(sessions);
  return token;
}

export async function getSession(token: string) {
  const sessions = await loadSessions();
  return sessions.find((session) => session.token === token) ?? null;
}

export async function invalidateSession(token: string) {
  const sessions = await loadSessions();
  const filtered = sessions.filter((session) => session.token !== token);
  await saveSessions(filtered);
}

export async function getUserById(id: string) {
  const users = await loadUsers();
  return users.find((user) => user.id === id) ?? null;
}

export async function getUserFromToken(token: string) {
  if (!token) return null;
  const session = await getSession(token);
  if (!session) return null;
  return getUserById(session.userId);
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
  const users = await loadUsers();
  const user = users.find((item) => item.id === userId);
  if (!user) return null;
  const addDays = plan === 'monthly' ? 30 : 365;
  user.membershipExpiry = createExpiry(addDays);
  await saveUsers(users);
  return user;
}
