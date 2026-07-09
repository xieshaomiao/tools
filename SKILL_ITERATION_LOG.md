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
| `product-design:audit` | 2 | 100 | 登录/注册、账号说明、PDF 结果区和手机端体验审计；截图保存在 `/tmp/toolly-auth-qa-20260709/` 与 `/tmp/toolly-pdf-convert-qa/` |
| `build-web-apps:frontend-testing-debugging` | 2 | 100 | 登录注册、英文错误、手机无横向溢出、PDF 转 Word 下载、兼容兜底、SEO 与 Lighthouse 回归通过 |
| `build-web-apps:react-best-practices` | 2 | 100 | 账号页静态文案模块级管理、语言判断 hook 复用、PDF 转换分支拆分为独立函数，构建通过 |

## 未计数记录

- `browser:control-in-app-browser`：本轮已连接成功并读取完整文档，但 DOM 快照接口报 `incrementalAriaSnapshot` 兼容错误；改用已获授权的常规 Playwright 完成验证，因此本轮不计为完成。
