# Capacitor 本地打包指南（快速模板）

1. 在本机安装 Capacitor CLI（可选）：

```bash
npm install -g @capacitor/cli
npm install @capacitor/core
```

2. 初始化（仅在本地运行一次）：

```bash
npx cap init
# 或使用仓库内模板： npx cap init "Toolly" "com.yourcompany.toolly"
```

3. 添加平台：

```bash
npx cap add android
npx cap add ios
```

4. 构建并同步 Web 代码：

```bash
npm run build
npx cap sync
npx cap open android    # 在 Android Studio 中打开
npx cap open ios        # 在 Xcode 中打开
```

注意：iOS 构建需要 Apple Developer 账号和在 Xcode 中配置签名；Android 推荐使用 `.aab` 并在 Google Play Console 中上传。
