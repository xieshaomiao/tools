# AdSense 提交模板（供你在注册时复制粘贴）

- 网站名称：Toolly
- 网站 URL：https://yourdomain.com  (部署并绑定域名后填写)
- 联系邮箱：support@yourdomain.com
- 网站用途：提供文案、SEO 与内容生成工具，含会员功能与广告位。
- 隐私政策 URL：https://yourdomain.com/privacy
- 技术说明：站点使用 Next.js 14，广告通过在页面中注入 Google AdSense 脚本与 `ins.adsbygoogle` 占位实现。等待审核通过后将在 `app/config/ad.ts` 中替换 `publisherId`。

注册后会得到 `Publisher ID (ca-pub-...)`，并可能要求在 `<head>` 注入一段验证代码或添加 DNS 验证记录。
