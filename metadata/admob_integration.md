# AdMob 集成说明（Capacitor）

1. 建议使用插件：`@capacitor-community/admob`（社区插件）或 Google 官方 SDK 在原生层集成。

2. 安装（示例）：

```bash
npm install @capacitor-community/admob
npx cap sync
```

3. 在 Capacitor 原生项目中（Android / iOS），按照插件 README 执行 SDK 配置，并在运行时使用测试 `ad unit id` 验证广告展示。

4. 在代码中使用示例：

```ts
import { AdMob } from '@capacitor-community/admob';

await AdMob.initialize();
await AdMob.showBanner({ adId: 'ca-app-pub-3940256099942544/6300978111', position: 'BOTTOM_CENTER' });
```

5. 上架前将测试 `adId` 替换为你在 AdMob 控制台创建的真实 `ad unit id`。
