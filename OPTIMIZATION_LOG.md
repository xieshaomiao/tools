# Toolly 持续优化记录

只记录对真实用户、搜索可见度、性能、可靠性或合规收益有明确价值且已经验证的改进。累计数量不是提交次数，也不包含格式化、改名等无用户价值的机械变化。

## 2026-07-07 · 搜索发现与双语体验

- 用户问题：网站技术上可访问，但搜索引擎尚未建立稳定收录；工具页正文较薄，全球用户没有英文入口；未配置广告时仍显示占位内容。
- 有效改进：44 项。
  - 28 个工具分别新增独立英文名称、描述、关键词、示例和可索引页面。
  - 新增英文首页、英文工具目录、真实站内搜索、中文与英文互链。
  - 为工具页增加可见面包屑、使用步骤、场景说明、限制、相关工具和常见问题。
  - 增加 WebApplication、FAQPage、BreadcrumbList、CollectionPage 和 WebSite SearchAction 结构化数据。
  - 为中英文页面增加 Canonical、hreflang 与 x-default，并将站点地图扩展为 67 个公开网址。
  - 增加 Google、Bing、百度验证配置入口、IndexNow 批量提交和 67 页自动 SEO 审计。
  - 英文工具控件、提示、复制与下载入口完成本地化。
  - 未配置真实 AdSense 时隐藏占位广告，避免伤害用户信任；保留审核通过后的环境变量启用方式。
  - 完成 Google Search Console 所有权验证、站点地图提交和首页优先抓取请求。
- 验证证据：TypeScript 检查和生产构建通过；67 页本地与线上 SEO 审计通过；8 个新增工具、26 种文档转换、9 项原功能回归全部通过；复制下载正常；桌面 1280px 与手机 390px 无横向溢出；线上浏览器无相关错误。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：44 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-08 · 首屏找工具与真实结果可信度

- 用户问题：首页只能先点进目录再筛工具；工具目录缺少按类别浏览；时间戳工具方向不明确；4 个本地文本工具被假会员门槛阻断；普通工具页一度被强制登录拦截，且会员页仍展示未上线的续费承诺。当前会话未拿到新的 Google Search Console 报表数据，因为没有可复用的已登录 GSC 会话。
- 有效改进：5 项。
  - 首页中英文首屏新增真实搜索框、热门需求快捷入口和任务型快速开始模块，减少用户为“找工具”多跳一步。
  - 中英文工具目录改为“搜索 + 热门查询 + 分类分组浏览”，无查询时可直接按类别扫描 28 个工具，提升手机端发现效率和内部链接质量。
  - 时间戳工具新增双向模式切换与更完整结果，明确区分“时间戳转日期”和“日期转时间戳”，同时输出 ISO、本地时间、秒级与毫秒级结果。
  - 关键词提取、SEO 标题生成、文案润色、摘要生成改为免费直用，移除对本地可完成能力的假会员阻断。
  - 修复普通工具页被统一登录门槛误拦截的问题，并将会员页/会员面板改为诚实说明：当前仅在线翻译依赖登录，真实支付未开放，不再展示伪续费按钮。
- 验证证据：TypeScript 检查通过；生产构建通过；67 页本地 SEO 审计通过两次；Lighthouse 本地首页移动端 Performance 0.95 / SEO 1.00、桌面端 Performance 0.99 / SEO 1.00；桌面浏览器验证首页搜索跳转到“时间戳”结果页；时间戳工具双向转换输出正确，复制后系统剪贴板内容匹配，文本下载生成 `.playwright-cli/toolly-timestamp.txt`；文档转换工具成功将 `/tmp/toolly-sample.txt` 转为 PDF，并下载到 `.playwright-cli/toolly-sample.pdf`；手机 390px 首页首屏搜索、快捷入口和分类入口均清晰可达；浏览器控制台无错误。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：49 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-08 · 登录门槛与中文 PDF 转 Word 修复

- 用户问题：用户页面未登录也能使用工具；登录/注册入口不够明显；用户上传 4.7KB ReportLab 中文 PDF 转 Word 时报“当前浏览器无法解析这个 PDF”；需要确认转换结果可以复制和下载，同时不能伤害网站可搜索性。
- 有效改进：11 项。
  - 全站增加统一 Toolly 顶部导航，提供工具目录、登录/注册、已登录邮箱和退出入口。
  - 工具交互区统一改为登录后可用；未登录时隐藏文件上传和执行按钮，但保留工具说明、FAQ、相关工具和结构化内容给搜索引擎抓取。
  - 登录页支持从任意工具页携带返回路径，登录或注册成功后回到原工具。
  - 登录/注册页增加中英文自适应说明，明确文件仍在浏览器本地处理。
  - 登录页设置 noindex，避免搜索结果进入账号页而不是工具页。
  - SEO 文案类后台接口增加登录校验，未登录直接调用返回 401。
  - PDF 解析库切换到兼容性更高的 legacy 版本，降低 Safari/WebKit 老环境出现 `undefined is not a function` 的概率。
  - 构建时自动准备 PDF.js CMap、标准字体和 wasm 静态资源，修复 ReportLab/中文字体 PDF 在浏览器端无法正确提取文字的问题。
  - PDF 转 Word 改为按页和文本行生成 DOCX，保留分页结构和更清晰的换行。
  - PDF 转 Excel/HTML/TXT 增加可提取文字判断；扫描图像版 PDF 会给出需要 OCR 的诚实提示。
  - 转换失败提示改为用户能理解的原因，覆盖密码保护、损坏文件、特殊字体映射和浏览器兼容问题。
- 验证证据：TypeScript 检查通过；生产构建通过；本地生产版未登录访问 `/tools/pdf-convert` 时文件上传入口为 0 且 SEO 正文仍可见；登录后上传入口为 1，退出后重新隐藏；未登录 POST `/api/seo/title` 返回 401；4.7KB ReportLab 中文 PDF 在 Chrome 转 Word、WebKit 转 Word、Chrome 转 Excel 均显示“转换完成，文件可以下载”，预览和下载文件内均检出中文内容；复制按钮返回“结果已复制到剪贴板”；338KB 完整 PDF 转 Word 通过；67 页本地 SEO 审计通过。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：60 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-08 · PDF 服务器兼容转换兜底

- 用户问题：线上真实浏览器仍可能出现“当前浏览器无法解析这个 PDF”，即使同一文件在自动化 Chrome/WebKit 中可以转换；需要保证用户点“开始转换”后能拿到 Word 下载结果。
- 有效改进：5 项。
  - 新增登录保护的 `/api/document/convert` 兼容转换接口，支持 PDF 转 Word、Excel、TXT 和 HTML。
  - 前端 PDF 转换保留“优先浏览器本地处理”；一旦本地 PDF.js 解析失败，会自动切换到服务器兼容转换并继续生成文件。
  - 服务器端 PDF.js 显式接入 worker、CMap、标准字体和 wasm，并在 Next/Vercel 打包配置中包含这些资源，避免部署后缺文件。
  - PDF 工具说明更新为更诚实的隐私提示：优先本地处理；浏览器无法解析时启用兼容转换且不保存文件。
  - 增加隐藏回归测试开关，可稳定模拟“本地解析失败”并验证前端自动 fallback 链路。
- 验证证据：TypeScript 检查通过；生产构建通过；本地生产版直接调用兼容转换接口将 `/Users/xieshaomiao/Downloads/谢绍渺_完整版简历.pdf` 转成 Word，HTTP 200，预览和 DOCX 均检出“优势亮点/工作经历/项目经验”；强制前端本地失败后页面自动调用 `/api/document/convert`，状态显示“转换完成，文件可以下载”，下载 DOCX 含简历内容；正常浏览器本地转换不调用兼容接口且下载 DOCX 含内容；未登录工具入口隐藏、兼容接口返回 401；67 页本地 SEO 审计通过。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：65 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-08 · 官网首页视觉与转化路径升级

- 用户问题：首页已经可搜索工具，但视觉质感仍偏普通目录页；用户希望官网更接近优秀动效产品站的节奏和版式，同时不能复制第三方内容。
- 有效改进：8 项。
  - 中文首页改为原创高质感 SaaS 官网结构：大首屏、渐变背景、玻璃拟态转换卡、浮动工具提示和明确双按钮入口。
  - 英文首页同步升级同一套视觉系统，保证中英文入口体验一致。
  - 首屏强化“PDF 转 Word、图片压缩、JSON 格式化、字数统计”等真实需求文案，减少用户理解成本。
  - 新增四类热门工具卡：PDF 与办公文件、图片处理、文本与内容、开发者工具，提升高频搜索词内部链接权重。
  - 新增“优先本地处理、真实可下载、登录后可用、兼容兜底”信任模块，把隐私与结果能力前置展示。
  - 新增三步流程模块，把“选择任务 → 处理文件或文本 → 复制/下载结果”的路径视觉化。
  - 顶部导航和页脚升级为统一品牌玻璃质感，增强官网完整度和登录入口可见性。
  - 补充轻量 CSS 动效，并尊重系统“减少动态效果”设置，避免动画影响可访问性。
- 验证证据：TypeScript 检查通过；生产构建通过；67 页本地 SEO 审计通过；本地桌面截图确认首屏、热门工具、流程和 CTA 正常展示；手机 390px 验证无横向溢出，搜索入口与 PDF 工具入口可见。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：73 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-08 · 多 Skill 工具目录与详情页体验审计

- 用户问题：新版首页已具备较强视觉质感，但工具目录和详情页仍是旧版样式；目录文案声称“所有工具均可直接使用”，与实际登录要求不一致；搜索无结果时缺少明确下一步；未登录门槛没有清楚说明注册后能获得什么。
- 有效改进：8 项。
  - 中文工具目录升级为与新版首页一致的蓝紫渐变、玻璃卡和高对比度工具卡视觉。
  - 英文工具目录同步升级，保证全球搜索入口与中文站体验一致。
  - 将目录中的“所有工具均可直接使用”纠正为“注册或登录后处理真实结果”，消除信任冲突。
  - 搜索结果页增加“清除搜索，查看全部工具”，减少用户被困在单次查询中。
  - 搜索空结果增加全部工具入口和热门查询建议，提供可执行的恢复路径。
  - 工具详情页新增三步任务路径、真实输出、复制/下载和隐私说明，强化首屏信息层级。
  - 未登录门槛改为“免费注册优先 + 已有账号登录”，并明确快速开始、真实结果和隐私优先三项价值。
  - 修复工具卡“进入/Open”文字对比度不足问题，将 Lighthouse Accessibility 从 0.96 提升到 1.00。
- 验证证据：TypeScript 检查通过；Next.js 生产构建通过；67 个公开页面 SEO 审查通过；Playwright 验证 28 个工具卡、PDF 搜索结果、空结果恢复入口、未登录注册入口和上传框隐藏；英文目录正常；手机 390px 无横向溢出；Lighthouse Performance 0.97、Accessibility 1.00、Best Practices 1.00、SEO 1.00。
- Skill 追踪：新增 `SKILL_ITERATION_LOG.md`，本轮完成 `product-design:audit`、`frontend-testing-debugging`、`react-best-practices` 各 1 / 100。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：81 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-09 · 登录注册体验与 PDF 转 Word 可靠性

- 用户问题：登录/注册页不够像正式产品入口，英文登录状态和失败提示不一致；账号页仍需更清楚解释登录后才能使用工具；真实 PDF 转 Word 需要在浏览器解析失败、中文字体映射和扫描/无文字层 PDF 场景下都能给用户可下载结果。
- 有效改进：10 项。
  - 登录/注册页升级为双栏产品化界面，突出“回到刚才任务、真实结果、隐私优先”，减少用户进入工具前的不安感。
  - 登录/注册增加客户端内联校验、密码显示/隐藏按钮、明确的 8–128 位密码提示和可访问错误关联。
  - 注册模式同步到 URL `mode=register`，便于从工具页或外部入口直接进入注册状态。
  - 登录与注册接口支持英文 locale，英文路径下的错误提示、成功提示和登录失败提示不再混用中文。
  - 全局头部和页脚在 `/auth?next=/en/...` 场景下正确切换英文，并移除登录页顶部指向自身的登录按钮。
  - 账号说明页改为“免费账号、登录后使用工具、当前未开放真实支付”的诚实说明，并补足 meta description 以通过 SEO 审计。
  - 会员面板文案统一为“登录后进入工具操作区”，消除“无需注册/直接使用免费工具”的旧口径冲突。
  - 隐私页移除上架前占位邮箱，改为 GitHub Issues 联系入口并提醒不要公开敏感信息。
  - PDF 转 Word 增加无文字层/扫描型 PDF 的图片版 Word 输出：无法提取文字时将页面图像嵌入 DOCX，保证仍能下载可打开文件。
  - 服务器兼容转换将 PDF.js CMap、标准字体和 wasm 改为真实文件系统路径，修复中文 PDF fallback 抽不到文字的问题。
- 验证证据：`npm run check` 通过；`npm run build` 通过；本地生产版登录/注册 Playwright 验证 20 项通过，截图在 `/tmp/toolly-auth-qa-20260709/`；测试账号全部清理；`/Users/xieshaomiao/Downloads/谢绍渺_简历1.pdf` 本地浏览器转 Word 成功，预览可复制且下载 DOCX 内检出“谢绍渺”；强制本地解析失败时页面自动走兼容转换并下载含中文文字的 DOCX；无文字层临时 PDF 转 Word 下载包包含 `word/media/` 图片；67 页本地 SEO 审计通过；Lighthouse 首页桌面 Performance 0.65 / Accessibility 0.96 / Best Practices 1.00 / SEO 1.00，PDF 工具页移动端 Performance 0.84 / Accessibility 1.00 / Best Practices 1.00 / SEO 1.00。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：91 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-09 · 官网首页首屏性能与可访问性优化

- 用户问题：官网首页视觉升级后首屏偏重，Lighthouse 桌面 Performance 仅 0.65，LCP 为 4.7 秒；同时可访问性分数停在 0.96，浅灰小字和 PDF 色块存在对比度不足。
- 有效改进：7 项。
  - 首页中英文首屏背景由多层动态径向渐变改为静态轻量渐变，减少首次绘制负担。
  - 移除首屏漂浮卡片、光球动画和对应全局 CSS，避免动画影响 LCP 与主线程稳定性。
  - 将 LCP 标题中的渐变透明文字改为高对比纯色强调，降低标题渲染成本并保持品牌色。
  - 搜索框、热门标签、统计卡和信任模块移除首屏毛玻璃效果，改为白底轻阴影，视觉更稳也更快。
  - 右侧转换演示卡减轻大阴影并缩短首屏高度，让移动端和桌面端更快展示核心内容。
  - 修复站点头部小字、浮层标签和 PDF 色块的颜色对比度问题，将 Accessibility 提升到 1.00。
  - 保留首页搜索、PDF 入口、分类入口和登录入口，确保性能优化没有牺牲转化路径。
- 验证证据：`npm run check` 通过；`npm run build` 通过；67 页本地 SEO 审计通过；内置浏览器可打开本地首页并检出 5 个 PDF 工具入口，但 DOM 快照接口仍报 `incrementalAriaSnapshot` 兼容错误，故本轮不计入 browser skill；Playwright 截图保存在 `/tmp/toolly-home-perf-qa-20260709/`，桌面首页、手机首页和手机 PDF 搜索页均正常；手机 `/tools?q=pdf` 检出 1 个 PDF 工具结果；Lighthouse 首页桌面 Performance / Accessibility / Best Practices / SEO 从 65 / 96 / 100 / 100 提升到 100 / 100 / 100 / 100，LCP 从 4.7 秒降到 0.6 秒；移动端 Lighthouse 为 Performance 92 / Accessibility 100 / Best Practices 100 / SEO 100，LCP 2.5 秒。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：98 / 500（达到 500 后继续向 1000 推进）。

## 2026-07-09 · GitHub 开源发现与关键词入口增强

- 用户问题：希望网站和 GitHub 仓库更容易被搜索到；当前 GitHub CLI 未登录，无法直接修改仓库 Topics，需要先做可被 GitHub 搜索索引的 README 与项目元数据增强。
- 有效改进：4 项。
  - README 增加“高频搜索入口”表格，覆盖 PDF 转 Word、图片压缩、JSON 格式化、二维码生成、人民币大写等中英文关键词。
  - README 高频入口直接链接到线上工具页，降低从 GitHub 到网站工具页的跳转成本。
  - README 补充建议 GitHub Topics，方便后续登录 GitHub 后一键补齐仓库主题。
  - `package.json` 扩展关键词，增加 `pdf-to-word`、`online-pdf-converter`、`image-compressor`、`json-formatter`、`chinese-office-tools` 等长尾搜索词。
- 验证证据：`gh auth status` 确认当前 GitHub CLI 未登录，未擅自修改远端 Topics；`rg` 检出 README 和 `package.json` 中新增关键词；`npm run check` 通过；`npm run build` 通过。
- 上线地址：https://toolly-ruddy.vercel.app
- GitHub：https://github.com/xieshaomiao/tools
- 累计有效优化项：102 / 500（达到 500 后继续向 1000 推进）。
