# Toolly Skill 迭代追踪

目标：对适用于 Toolly 网站的技能分别完成至少 100 轮有效迭代。

计数规则：

- 一轮必须包含：真实问题证据、代码或内容改进、构建/交互/线上验证。
- 同一项修改不能重复计入多个空泛轮次。
- 不为凑数调用与网站无关的技能；新增技能前先确认它能解决真实用户问题。
- 失败的工具调用只记录原因，不计为完成轮次。

## 当前进度

| Skill | 已完成 | 目标 | 本轮证据 |
| --- | ---: | ---: | --- |
| `product-design:audit` | 8 | 100 | 审计发现 App 占位下载页与“仅网站”定位冲突且损害信任；首页改为真实注册 CTA，博客改为工具任务入口，旧地址保留永久跳转 |
| `build-web-apps:frontend-testing-debugging` | 8 | 100 | 内置浏览器完成 390×844 注册首屏、真实注册跳转、首页无溢出和控制台检查；生产接口再验证注册、状态、PDF 转 Word、401 鉴权和 DOCX 完整性 |
| `build-web-apps:react-best-practices` | 8 | 100 | 账号状态、密码修改、超时取消、断网恢复和 App 入口清理完成后，`npm run check` 与生产构建均通过 |
| `github:github` | 1 | 100 | GitHub CLI 未登录无法改远端 Topics；已增强 README 高频关键词入口和 `package.json` 搜索关键词，准备后续补齐仓库 Topics |
| `browser:control-in-app-browser` | 2 | 100 | 本地生产版手机视口完成 DOM、截图、控制台和真实注册交互，注册后跳转 `/tools`；生产导航受本机代理间歇超时影响时改用同版本线上接口与抓取证据复核 |
| `vercel:investigation-mode` | 2 | 100 | 交叉验证浏览器、curl、Node 与 Vercel API，确认直连 TLS 重置来自本机网络出口；显式代理可恢复请求，部署本身为 READY，网站增加离线恢复 |
| `vercel:auth` | 2 | 100 | 新增安全修改密码和旧会话失效；生产再次验证注册、登录态、受保护转换接口、未开放升级接口与测试账号清理 |
| `vercel:deployments-cicd` | 2 | 100 | GitHub 主分支提交 `4ee7b5f` 自动部署为 `READY`，三个生产别名切换到 `dpl_3UPZf9WfpE3ZhXyhaHWd4TFCvESK`，线上 sitemap 与旧地址跳转复测通过 |

## 未计数记录

- `browser:control-in-app-browser`：此前两轮 DOM 快照接口报 `incrementalAriaSnapshot` 兼容错误而未计数；2026-07-13 本轮接口恢复并完成真实交互验证，已开始计数。
