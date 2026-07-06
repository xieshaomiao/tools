# Toolly 网站与移动 App 发布状态

## 1. 网站部署

- Vercel 项目：`one-zero2/toolly`
- 当前线上地址：`https://toolly-ruddy.vercel.app`
- GitHub 仓库：`https://github.com/xieshaomiao/tools`
- `main` 分支已连接 Vercel，后续推送会自动触发部署。
- 如需自定义域名，在 Vercel 项目设置中添加域名并完成 DNS 验证；站点元数据会自动读取生产域名。

## 2. 移动 App 打包（Capacitor）

### 2.1. 准备工作

1. 申请 Apple Developer 帐号和 Google Play 开发者帐号。
2. 手里准备好 App 名称、描述、截图、隐私政策链接等。

### 2.2. 本地打包流程

仓库已经安装 Capacitor 8 的核心、iOS、Android 与命令行依赖。最终 App ID（Bundle ID / Application ID）为 `com.xieshaomiao.toolly`。

当前 Next.js 项目包含服务端 API，不能直接静态导出到 `out/`。因此需要先选定移动端方案：

1. 独立移动客户端，调用线上 Toolly API（更适合商店发布）。
2. 仅把线上网站包进 WebView（开发快，但 Capacitor 官方不建议把 `server.url` 用于生产，商店审核风险也更高）。

确定方案与 App ID 后，再运行：

```bash
npm run cap:add-android
npm run cap:add-ios
npm run cap:sync
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

## 4. 当前阻塞项

- App：当前采用连接线上 Toolly 网站的 WebView 方案；提交商店前仍建议评估独立移动客户端，以降低审核风险并改善离线体验。
- iOS：Xcode 与 iOS 26.5 运行时已安装；提交时仍需要 Apple Developer 帐号、签名身份和描述文件。
- Android：Android Studio、SDK 与构建工具已安装；提交时仍需要 Google Play 开发者帐号与上传签名密钥。
- 广告：需要真实 AdSense Publisher ID 和广告单元 ID。
- 会员账号：当前仍使用本地 JSON 文件，Vercel 上不能作为可靠的长期数据库；商用前应迁移到持久化数据库。

## 5. 本仓库当前准备情况

- `capacitor.config.ts` 已存在。
- `app/config/ad.ts` 已存在广告占位配置。
- `DEPLOY_VERSEL.md`、`CAPACITOR_README.md` 已包含发布说明。
- Next.js、React 与 Capacitor 已升级到当前安全版本，依赖审计为 0 个漏洞。
- GitHub `main` 已连接 Vercel 自动部署。
- Android 单元测试、调试 APK 与未签名 Release AAB 已构建通过。
- iOS 模拟器 Debug 与真机 Release 无签名编译已通过；正式归档仍需 Apple Developer 签名身份。
- iPhone 17 Pro（iOS 26.5）模拟器已实际安装并启动 Toolly，首页加载正常且未发现应用级运行错误。
