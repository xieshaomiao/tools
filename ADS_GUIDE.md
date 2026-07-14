# 网站广告接入指南（Google AdSense）

Toolly 只发布网站，不发布 App，也不接入 AdMob。

## 0. 真实发布商资料由运营者本人填写

AdSense 发布商 ID 不能由代码生成，也不能借用他人的号码。运营者只应在 Google AdSense 官方页面亲自填写真实姓名或企业名称、永久收款国家/地区、邮寄地址、电话、身份验证、税务和收款账户。不要把身份证号、税号、完整住址、验证码或银行卡资料写进仓库、环境变量、Issue 或聊天记录。

创建账号时务必先核对“收款地址所在的国家/地区”。该字段可能按当前网络位置自动选择，而且提交后通常无法直接修改；必须与真实收款地址、身份证明、税务和银行资料一致。账号创建后，再从 AdSense 的账号信息页面复制属于该账号的 `ca-pub-` 发布商 ID。

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
NEXT_PUBLIC_ADSENSE_CMP_PROVIDER=google-privacy-messaging
NEXT_PUBLIC_ADSENSE_CMP_PUBLISHED=true
NEXT_PUBLIC_SITE_URL=https://toolly-ruddy.vercel.app
NEXT_PUBLIC_ADSENSE_PRODUCTION_HOST=toolly-ruddy.vercel.app
```

运行 `npm run ad:validate` 后重新构建和部署。严禁点击自己的广告、要求用户点击广告或购买点击流量。

使用 Google 自带的 `Privacy & messaging` 时，CMP provider 填 `google-privacy-messaging`；使用 Google 认证的第三方 CMP 时填 `google-certified-third-party`。只有消息已经在后台发布后才能把 `NEXT_PUBLIC_ADSENSE_CMP_PUBLISHED` 设为 `true`。这两个变量是上线人员的明确确认，代码无法代替 Google 后台的真实发布状态。

上述 `review` 与 `live` 变量只配置在 Vercel 的 Production 环境。Preview 和 Development 环境必须保持 `off`。正式投放还要求广告主机名与网站公开地址完全一致，避免 Preview 误加载真实广告；以后绑定自定义域名时需要同步更新两个地址变量。旧的 `NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT` 不会启用广告，正式投放必须显式配置文章广告单元。
