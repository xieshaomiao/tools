# 安全推送到 GitHub（建议使用 PAT）

1. 在 GitHub 设置 → Developer settings → Personal access tokens 创建一个短期 PAT，勾选 `repo` 权限（生成后请立即复制并妥善保存）。

2. 在本地将远程添加并推送（示例）：

```bash
git remote add origin git@github.com:yourname/your-repo.git
git push -u origin main
```

如果需要用 HTTPS + PAT：

```bash
git remote add origin https://github.com/yourname/your-repo.git
git push https://<TOKEN>@github.com/yourname/your-repo.git
```

安全提示：
- 不要在聊天或代码中明文分享密码或长期有效的凭证；
- 推送后即时撤销该 PAT（在 GitHub 上删除）；
- 若希望我替你推送，请提供短期 PAT，我将在操作完成后提醒你删除该 Token。
