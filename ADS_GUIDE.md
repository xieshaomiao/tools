# 网站广告接入指南（Google AdSense）

Toolly 只发布网站，不发布 App，也不接入 AdMob。

## 1. 默认关闭

不设置环境变量时，网站不加载 Google 广告网络，也不显示空广告框。

```env
NEXT_PUBLIC_ADSENSE_MODE=off
```

## 2. 站点审核模式

用户本人在 AdSense 添加网站并取得真实发布商 ID 后：

```env
NEXT_PUBLIC_ADSENSE_MODE=review
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-真实16位数字
```

审核模式只输出 `google-adsense-account` Meta 与 `/ads.txt`，不加载广告脚本。

## 3. 正式投放模式

只有同时完成以下事项后才允许切换：

- AdSense 网站审核通过；
- 在 AdSense `Privacy & messaging` 配置并发布 Google 认证 CMP；
- 配置 EEA、英国、瑞士及适用地区的隐私消息；
- 关闭 Auto ads，或排除登录、账号、隐私、错误和工具操作页面；
- 创建真实文章广告单元。

```env
NEXT_PUBLIC_ADSENSE_MODE=live
NEXT_PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-真实16位数字
NEXT_PUBLIC_ADSENSE_ARTICLE_SLOT=真实广告单元数字
NEXT_PUBLIC_ADSENSE_COMPLIANCE_READY=true
NEXT_PUBLIC_SITE_URL=https://toolly-ruddy.vercel.app
NEXT_PUBLIC_ADSENSE_PRODUCTION_HOST=toolly-ruddy.vercel.app
```

运行 `npm run ad:validate` 后重新构建和部署。严禁点击自己的广告、要求用户点击广告或购买点击流量。

上述 `review` 与 `live` 变量只配置在 Vercel 的 Production 环境。Preview 和 Development 环境必须保持 `off`。正式投放还要求广告主机名与网站公开地址完全一致，避免 Preview 误加载真实广告；以后绑定自定义域名时需要同步更新两个地址变量。旧的 `NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT` 不会启用广告，正式投放必须显式配置文章广告单元。
