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
| `product-design:audit` | 3 | 100 | 首页首屏审计出动态渐变、毛玻璃、漂浮动画和对比度问题；截图保存在 `/tmp/toolly-home-perf-qa-20260709/` |
| `build-web-apps:frontend-testing-debugging` | 3 | 100 | 首页桌面 Lighthouse 65/96/100/100 → 100/100/100/100，移动端 92/100/100/100；SEO、搜索和截图回归通过 |
| `build-web-apps:react-best-practices` | 3 | 100 | 首页中英文组件保持静态服务端渲染，移除无必要动画 CSS 和首屏昂贵视觉效果，`npm run check` 与 `npm run build` 通过 |
| `github:github` | 1 | 100 | GitHub CLI 未登录无法改远端 Topics；已增强 README 高频关键词入口和 `package.json` 搜索关键词，准备后续补齐仓库 Topics |

## 未计数记录

- `browser:control-in-app-browser`：本轮和上一轮均可连接并打开页面，但 DOM 快照接口报 `incrementalAriaSnapshot` 兼容错误；改用已获授权的常规 Playwright 完成验证，因此仍不计为完成。
