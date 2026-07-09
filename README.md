# Toolly 在线工具箱 · Free Online Tools

[访问正式网站](https://toolly-ruddy.vercel.app) · [全部在线工具](https://toolly-ruddy.vercel.app/tools) · [网站地图](https://toolly-ruddy.vercel.app/sitemap.xml)

Toolly 是面向中国和全球用户的免费在线工具箱，基于 Next.js 构建。网站提供常用文档格式互转、图片处理、文本处理、编码转换、中文办公与开发者工具。处理结果可以复制或下载；文档、图片和多数文本工具优先在浏览器本地运行。

Toolly is a free bilingual collection of browser-based document, image, content and developer utilities. Visit the [English homepage](https://toolly-ruddy.vercel.app/en) or [English tool directory](https://toolly-ruddy.vercel.app/en/tools).

## 高频搜索入口 · Popular tool pages

| 中文关键词 | English keywords | 入口 |
| --- | --- | --- |
| PDF 转 Word、PDF 转 Excel、Word 转 PDF、图片转 PDF | PDF to Word, PDF converter, Word to PDF, document converter | [万能文档转换](https://toolly-ruddy.vercel.app/tools/pdf-convert) |
| 图片压缩、图片格式转换、JPG 转 WebP、PNG 转 JPG | image compressor, image converter, JPG to PNG, PNG to WebP | [图片压缩](https://toolly-ruddy.vercel.app/tools/image-compress) · [图片格式转换](https://toolly-ruddy.vercel.app/tools/image-convert) |
| JSON 格式化、JSON 转 CSV、YAML 转 JSON | JSON formatter, JSON to CSV, YAML to JSON, developer tools | [JSON 格式化](https://toolly-ruddy.vercel.app/tools/json-format) · [JSON CSV 互转](https://toolly-ruddy.vercel.app/tools/json-csv) |
| 二维码生成、人民币大写、字数统计、正则测试 | QR code generator, RMB uppercase, word counter, regex tester | [二维码生成](https://toolly-ruddy.vercel.app/tools/qr-code) · [人民币大写](https://toolly-ruddy.vercel.app/tools/rmb-uppercase) |

## 主要功能

- PDF、Word DOCX、Excel XLSX、PowerPoint PPTX、TXT、Markdown、HTML 和图片常用格式互转
- PDF 转 Word、Excel、PPT、TXT、HTML、逐页 PNG
- Word、Excel、PPT、TXT、Markdown、HTML、JPG、PNG、WebP 转 PDF
- 图片压缩、JPG / PNG / WebP 格式转换、二维码生成
- JSON 格式化、JSON CSV 互转、YAML JSON 互转
- UUID 批量生成、JWT 解码、正则测试、SHA 哈希生成
- 人民币金额大写、字数统计、文本对比、大小写转换
- SEO 标题、关键词、翻译、摘要与文案工具

## 技术栈

- Next.js 16、React 19、TypeScript、Tailwind CSS
- Vercel 部署与 Neon PostgreSQL 用户系统
- PDF.js、jsPDF、DOCX、Mammoth、PptxGenJS、JSZip
- 中英文可索引页面、结构化数据与自动 SEO 检查

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。

生产构建检查：

```bash
npm run check
npm run build
npm run start
```

## 搜索引擎与开源发现

- 网站输出 `robots.txt` 与自动更新的 `sitemap.xml`
- 67 个公开网址覆盖中文和英文首页、目录及 28 个双语工具页
- 每个工具拥有独立标题、描述、Canonical、hreflang、FAQ、BreadcrumbList 和 WebApplication 结构化数据
- GitHub README 与项目元数据覆盖 PDF converter、document converter、online tools、Next.js 等关键词
- 建议 GitHub Topics：`online-tools`、`pdf-converter`、`pdf-to-word`、`document-converter`、`image-compressor`、`json-formatter`、`developer-tools`、`nextjs`、`tailwindcss`
- `npm run seo:audit` 检查页面、站点地图与结构化数据，`npm run seo:submit-indexnow` 提交公开网址
- 正式地址：[https://toolly-ruddy.vercel.app](https://toolly-ruddy.vercel.app)

## 广告配置

网站在未配置真实广告账号时不会向用户显示占位广告。AdSense 审核通过后，在部署环境设置 `NEXT_PUBLIC_ADSENSE_PUBLISHER_ID` 与 `NEXT_PUBLIC_ADSENSE_DEFAULT_SLOT` 即可启用广告。

## 隐私说明

文档和图片转换默认在浏览器本地完成。JWT 工具仅解码内容，不验证签名，也不会上传令牌。扫描版 PDF 如果没有文本层，转换为 Word 或 Excel 前仍需要 OCR。

## License

ISC
