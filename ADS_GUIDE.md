# 广告接入指南（AdSense / AdMob）

## 网站：Google AdSense

1. 注册 AdSense：访问 https://www.google.com/adsense 并使用 Google 帐号注册。
2. 在站点验证阶段，AdSense 会要求你将一段代码放入站点 `<head>`，或以 DNS 验证方式确认所有权。
3. 注册通过并获得 `Publisher ID`（格式 `ca-pub-XXXXXXXXXXXX`）后：
   - 将 `app/config/ad.ts` 中的 `publisherId` 替换为真实 `ca-pub-...`。
   - 在 `app/components/AdSlot.tsx` 中把 `data-ad-client` 的占位 `ca-pub-...` 替换为你的 `ca-pub-...`，并将 `data-ad-slot` 替换为 AdSense 提供的 `ad unit` id。
4. 本地测试使用 AdSense 的测试广告单元或在 AdSense 管理台设置为显示测试广告。

## 移动 App：Google AdMob

1. 在 https://admob.google.com 使用 Google 帐号创建 AdMob 帐户。
2. 在 AdMob 中添加你的应用（在未上架前可选择“尚未发布的应用”并使用包名）。
3. 创建广告单元（Banner / Interstitial / Rewarded），记下 `ad unit id`。
4. 集成到 Capacitor：在 Android / iOS 原生层使用官方 AdMob SDK，或使用社区插件。例如：`@capacitor-community/admob`。在测试阶段使用 AdMob 提供的测试单元，替换为真实单元后上架即可。

## 建议流程
- 先部署网站并获得域名，因为 AdSense 要求已部署站点验证。
- 使用 AdMob 的“测试广告单元”在本地/测试机验证广告展示，确认无崩溃或冲突后替换为真实单元。
