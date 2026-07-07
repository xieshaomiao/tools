# Toolly 在线工具箱

[访问正式网站](https://toolly-ruddy.vercel.app) · [全部在线工具](https://toolly-ruddy.vercel.app/tools) · [网站地图](https://toolly-ruddy.vercel.app/sitemap.xml)

Toolly 是面向中国和全球用户的免费在线工具箱，基于 Next.js 构建。网站提供常用文档格式互转、图片处理、文本处理、编码转换、中文办公与开发者工具。处理结果可以复制或下载；文档、图片和多数文本工具优先在浏览器本地运行。

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
- Capacitor Android / iOS 项目与微信小程序代码

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
- 每个工具拥有独立标题、描述、Canonical URL 和 WebApplication 结构化数据
- GitHub README 与项目元数据覆盖 PDF converter、document converter、online tools、Next.js 等关键词
- 正式地址：[https://toolly-ruddy.vercel.app](https://toolly-ruddy.vercel.app)

## 隐私说明

文档和图片转换默认在浏览器本地完成。JWT 工具仅解码内容，不验证签名，也不会上传令牌。扫描版 PDF 如果没有文本层，转换为 Word 或 Excel 前仍需要 OCR。

## License

ISC
