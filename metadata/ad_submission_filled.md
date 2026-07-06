# AdSense 提交草稿（请在下列处填写真实信息后提交）

- 网站名称：Toolly
- 网站 URL：https://yourdomain.com   <-- 请替换为你的域名
- 联系邮箱：support@yourdomain.com   <-- 请替换为你使用的联系邮箱
- 网站用途：提供文案、SEO 与内容生成工具，含会员功能与广告位。
- 隐私政策 URL：https://yourdomain.com/privacy   <-- 请确认部署后填写完整 URL
- 技术说明：站点使用 Next.js 14，广告通过在页面中注入 Google AdSense 脚本与 `ins.adsbygoogle` 占位实现。AdSense 注册后请将 `app/config/ad.ts` 中的 `publisherId` 替换为 `ca-pub-...`。

验证方式建议：在 Vercel 上部署并添加域名后，优先使用 HTML 验证将代码放入 `<head>`，或按 AdSense 指示添加 DNS 记录。
