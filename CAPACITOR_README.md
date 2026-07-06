# Capacitor 本地打包指南

原生工程已生成，App ID 为 `com.xieshaomiao.toolly`。Capacitor 依赖已经安装在项目中，无需全局安装。

1. 网站代码或 Capacitor 配置发生变化后，同步两端：

```bash
npm install
npm run cap:sync
```

2. 打开 Android 工程：

```bash
npx cap open android
```

3. 打开 iOS 工程：

```bash
npx cap open ios
```

当前 App 加载 `https://toolly-ruddy.vercel.app`，断网时显示内置离线提示页。iOS 构建需要完整 Xcode、Apple Developer 帐号和签名；Android 构建需要 Android Studio/SDK，商店发布推荐生成签名 `.aab`。
