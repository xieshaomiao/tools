# 同时发布网站和移动 App

## 1. 网站部署（推荐 Vercel）

1. 在 GitHub 上确认仓库已推送至 `main`。
2. 登录 Vercel，创建新项目，选择 `https://github.com/xieshaomiao/tools`。
3. Vercel 会自动识别 Next.js，构建命令保持 `npm run build`。
4. 部署后，你会得到一个临时域名，如 `toolly.vercel.app`。
5. 替换 `app/layout.tsx` 中的 `metadata.metadataBase` 为你的正式域名（如果要自定义域名）。
6. 绑定域名并完成 DNS 验证。

## 2. 移动 App 打包（Capacitor）

### 2.1. 准备工作

1. 申请 Apple Developer 帐号和 Google Play 开发者帐号。
2. 手里准备好 App 名称、描述、截图、隐私政策链接等。

### 2.2. 本地打包流程

```bash
npm install
npm run build
npx cap init "Toolly" "com.yourcompany.toolly"
npx cap add android
npx cap add ios
npm run build
npx cap sync
```

### 2.3. Android 发布

1. 打开 Android Studio：`npx cap open android`
2. 在 Android Studio 中创建签名密钥，并配置 `build.gradle`。
3. 生成 `.aab` 文件。
4. 登录 Google Play Console，创建应用条目，填写信息，上载 `.aab`。
5. 提交审核并发布。

### 2.4. iOS 发布

1. 打开 Xcode：`npx cap open ios`
2. 配置团队、Bundle ID、签名证书和描述文件。
3. 生成归档并上传到 App Store Connect。
4. 填写 App Store 元数据并提交审核。

## 3. 广告配置

1. 先发布网站并获取正式域名。
2. 在 `app/config/ad.ts` 中替换 `publisherId` 为真实 AdSense `ca-pub-...`。
3. 替换广告单元 `sampleAdUnit` 为真实 Ad Unit ID。
4. 部署到线上站点后，Google AdSense 需要验证网站并允许显示广告。

## 4. 现在可做的事

- 网站：推送到 GitHub，连接 Vercel 部署。
- App：补充真实 `com.yourcompany.toolly` 包名，完成 Capacitor 平台添加。
- 广告：先完成网站部署，再替换真实 AdSense ID。

## 5. 本仓库当前准备情况

- `vercel.json` 已创建。
- `capacitor.config.ts` 已存在。
- `app/config/ad.ts` 已存在广告占位配置。
- `DEPLOY_VERSEL.md`、`CAPACITOR_README.md` 已包含发布说明。

如果你要，我可以继续直接：

- 生成 `package.json` 的 `deploy:vercel` 命令
- 创建 `README.md` 中的部署步骤摘要
- 把 `workflow-add` 分支合并到 `main` 并推送
