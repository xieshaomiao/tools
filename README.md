# Toolly

Toolly 是一个基于 Next.js 的在线工具聚合网站，包含多个工具页面、移动下载落地页与广告位示例。

## 1. 本地启动

1. 在项目根目录运行：

   ```bash
   npm install
   npm run dev
   ```

2. 打开浏览器并访问：

   ```text
   http://localhost:3000
   ```

> 注意：不要使用 `www.localhost.com:3000`，正确地址是 `localhost`。

如果 `localhost` 访问失败，可改用：

```text
http://127.0.0.1:3000
```

### 常用命令

- `npm run dev` - 启动本地开发服务器
- `npm run build` - 生产环境构建
- `npm run start` - 启动构建后的应用

## 2. 当前项目状态

当前项目是一个网站应用，包含：

- `app/page.tsx` 首页
- `app/tools/[toolKey]/page.tsx` 工具详情页
- `app/download/page.tsx` 下载落地页
- `app/download/app-store/page.tsx` iOS 占位页
- `app/download/google-play/page.tsx` Android 占位页

这些页面本质上是网站内容占位，不代表已在 App Store 或 Google Play 发布。

## 3. App Store / Google Play 上架说明

要让应用在 App Store 或 Google Play 中搜索到，必须：

1. 将项目打包成真实的 iOS 或 Android App
2. 在 App Store Connect / Google Play Console 中创建应用条目
3. 上传应用包、填写应用信息、提交审核
4. 审核通过后才会在商店中可搜索、可下载

目前，该仓库中还没有完成上述发布流程，因此“商店搜索不到”是正常现象。

## 4. App 上架准备建议

### iOS 上架准备

- 使用 Xcode 创建 iOS 项目或使用跨平台框架（例如 Expo、Capacitor）包装网站
- 申请 Apple Developer 帐号
- 配置 Bundle ID、签名证书、描述文件
- 准备 App Store 页面截图、隐私政策、应用简介、关键词
- 使用 App Store Connect 提交 TestFlight 测试与审核

### Android 上架准备

- 使用 Android Studio / Flutter / Capacitor / Expo 创建 Android 包
- 申请 Google Play 开发者帐号
- 配置包名、签名密钥、版本号
- 生成 App Bundle (`.aab`) 或 APK
- 在 Google Play Console 填写应用详情、隐私政策、截图
- 提交审核并发布

### 封装网站为移动 App 的两种方式

- 纯 WebView / PWA 包装：快速实现移动入口，但依赖线上网站
- 原生或混合 App：更稳定、可集成推送、离线缓存、应用内购买等功能

## 5. 下一步操作（我可以代做的准备工作）

我可以为你在仓库中生成并准备好大部分上架与广告相关的文件，之后你只需完成第三方服务的注册与验证：

- 生成 Capacitor 配置模板与打包说明（已添加 `capacitor.config.ts`）。
- 添加部署到 Vercel 的说明（见 `DEPLOY_VERSEL.md`）。
- 添加广告接入指南（见 `ADS_GUIDE.md`）和广告占位（`app/config/ad.ts`、`AdSlot`）。
- 添加上架素材清单（见 `APP_STORE_ASSETS.md`）。

本地构建与验证命令：

```bash
npm install
npm run build
npm run start
```

部署提示：将代码推送到 GitHub 后，可在 Vercel 连接仓库并进行一键部署；完成域名绑定后，替换 `app/config/ad.ts` 中的 `publisherId` 为 AdSense 的 `ca-pub-...`即可开始广告审核与投放。

## 5. 下一步操作

如果你想继续，我可以直接帮助你：

- 选择 App 打包方案（PWA、Capacitor、Expo 等）
- 创建 iOS / Android 项目结构
- 生成打包配置和上架文档
- 更新下载页为真实 App Store / Google Play 链接
