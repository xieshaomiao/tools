# 部署到 Vercel（推荐）

当前状态：

- 线上地址：`https://toolly-ruddy.vercel.app`
- Vercel 项目：`one-zero2/toolly`
- GitHub：`https://github.com/xieshaomiao/tools`
- `main` 分支已连接自动部署。

后续发布：

1. 完成本地构建与安全检查。
2. 将代码推送到 GitHub `main`，Vercel 会自动构建并发布。
3. 在 Vercel Deployments 中确认状态为 Ready。
4. 检查线上首页、工具页和 API。

站点元数据会自动读取 Vercel 生产域名；绑定自定义域名时，可通过 `NEXT_PUBLIC_SITE_URL` 明确指定根地址。

在 AdSense 中注册并验证站点后，替换 `app/config/ad.ts` 中的 `publisherId` 和广告单元 ID。
