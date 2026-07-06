# 部署到 Vercel（推荐）

步骤概览：

1. 将代码推送到 GitHub（示例）：

```bash
git remote add origin git@github.com:yourname/your-repo.git
git push -u origin main
```

2. 在 https://vercel.com 使用你的 GitHub 账号登录并创建新项目，选择刚刚推送的仓库。

3. 在 Vercel 项目设置中设置构建命令：`npm run build`，发布目录：`.next`（默认即可）。

4. 绑定域名：购买域名（例如通过 Namecheap / GoDaddy），在 Vercel 添加域名并在域名 DNS 管理处添加 A/CAA 或 CNAME 指向 Vercel 提供的记录以完成验证。

5. 更新站点根地址：把 `app/layout.tsx` 中的 `metadata.metadataBase` 修改为 `https://yourdomain.com`。

6. 验证站点并提交给 Google Search Console（可通过 Vercel 的自动部署触发 sitemap）。

7. 在 AdSense 中注册并验证站点后，替换 `app/config/ad.ts` 中的 `publisherId` 为 `ca-pub-...`，并替换 `AdSlot` 中的 `data-ad-slot` 为你的 ad unit id。

注意：我无法代替你创建 GitHub、Vercel、域名或 Google 帐号。上架前我会在仓库内生成所有所需的配置文件与说明，你可逐项执行或让我指导你逐步完成。 
