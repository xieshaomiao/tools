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
| `product-design:audit` | 9 | 100 | 线上手机截图发现页头账号检查空白、翻译 FAQ 会员口径和账号页试用口径；统一为可见状态与免费网站账号说明 |
| `build-web-apps:frontend-testing-debugging` | 9 | 100 | 完成线上 390×844 首页、翻译 FAQ、无横向溢出检查，以及生产注册、翻译、PDF 转 Word、DOCX、退出完整回归 |
| `build-web-apps:react-best-practices` | 9 | 100 | 账号检查和退出请求增加 AbortController 超时与稳定状态；移除重复翻译权限请求后，检查与生产构建通过 |
| `github:github` | 1 | 100 | GitHub CLI 未登录无法改远端 Topics；已增强 README 高频关键词入口和 `package.json` 搜索关键词，准备后续补齐仓库 Topics |
| `browser:control-in-app-browser` | 3 | 100 | 线上 390×844 首页和翻译 FAQ 完成可见截图与 DOM 复核：首页无账号空白和横向溢出，FAQ 显示免费账号且无会员/180 天文案 |
| `vercel:investigation-mode` | 2 | 100 | 交叉验证浏览器、curl、Node 与 Vercel API，确认直连 TLS 重置来自本机网络出口；显式代理可恢复请求，部署本身为 READY，网站增加离线恢复 |
| `vercel:auth` | 3 | 100 | 生产临时账号完成注册、登录态、免费翻译、受保护 PDF 转 Word、退出和退出后匿名状态回归，账号已从数据库清理 |
| `vercel:deployments-cicd` | 3 | 100 | GitHub 主分支提交 `86a5e9d` 自动部署为 `READY`，主地址与备用地址上线免费账号口径并通过 65 页线上 SEO 审计 |

## 未计数记录

- `browser:control-in-app-browser`：此前两轮 DOM 快照接口报 `incrementalAriaSnapshot` 兼容错误而未计数；2026-07-13 本轮接口恢复并完成真实交互验证，已开始计数。
