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
| `product-design:audit` | 1 | 100 | 目录、空结果、详情页和手机端审计；截图和笔记保存在 `/tmp/toolly-taste-audit-after-local/` |
| `build-web-apps:frontend-testing-debugging` | 1 | 100 | 搜索、空结果、登录门槛、桌面/手机 Playwright 回归通过 |
| `build-web-apps:react-best-practices` | 1 | 100 | 服务端页面静态数据保持模块级，客户端门槛组件保持轻量，构建通过 |

## 未计数记录

- `browser:control-in-app-browser`：本轮已连接成功，但读取工具目录时超时并重置；改用已获授权的常规 Playwright 完成验证，因此本轮不计为完成。
