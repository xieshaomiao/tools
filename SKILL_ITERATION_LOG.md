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
| `product-design:audit` | 7 | 100 | 手机端登录审计发现表单被介绍内容压到第二屏；调整为表单优先后，390×844 首屏可直接登录；前后截图保存在 `/tmp/toolly-auth-production-20260713/` |
| `build-web-apps:frontend-testing-debugging` | 7 | 100 | 内置浏览器验证桌面/手机登录页、登录跳转、已登录重定向、无横向溢出和控制台健康；生产注册/登录/退出闭环均为 HTTP 200 |
| `build-web-apps:react-best-practices` | 7 | 100 | 登录状态避免首屏闪烁，密码哈希改为异步，客户端请求增加超时与安全响应解析；`npm run check` 与 `npm run build` 通过 |
| `github:github` | 1 | 100 | GitHub CLI 未登录无法改远端 Topics；已增强 README 高频关键词入口和 `package.json` 搜索关键词，准备后续补齐仓库 Topics |
| `browser:control-in-app-browser` | 1 | 100 | 本轮内置浏览器 DOM、截图、控制台与登录交互全部可用，验证生产手机表单首屏、桌面双栏和登录后跳转 |
| `vercel:investigation-mode` | 1 | 100 | 按运行日志→浏览器→部署顺序定位到手机首屏顺序和 Neon/Vercel TLS 重置两类问题，并分别修复可控范围内的根因 |
| `vercel:auth` | 1 | 100 | 完成注册、登录、会话、退出与生产数据库连通性回归；新增数据库临时故障重试和状态接口降级 |
| `vercel:deployments-cicd` | 1 | 100 | 强制无缓存生产部署为 READY，主域名完成别名切换，生产 API、浏览器、日志和抓取入口均复测 |

## 未计数记录

- `browser:control-in-app-browser`：此前两轮 DOM 快照接口报 `incrementalAriaSnapshot` 兼容错误而未计数；2026-07-13 本轮接口恢复并完成真实交互验证，已开始计数。
