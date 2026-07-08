import { ToolMeta } from './toolConfig';

export type SiteLocale = 'zh-CN' | 'en';

type EnglishToolCopy = {
  title: string;
  description: string;
  badge: string;
  category: string;
  placeholder: string;
  example: string;
  keywords: string[];
};

const englishToolCopy: Record<string, EnglishToolCopy> = {
  'pdf-convert': { title: 'Universal Document Converter', description: 'Convert between PDF, Word, Excel, PowerPoint, TXT, Markdown, HTML and common image formats. Files are processed locally first; PDFs can use compatible conversion if the browser cannot parse them.', badge: 'File Tool', category: 'File Tools', placeholder: 'Choose a source file and an output format, then download the converted file or copy its preview.', example: 'Convert a DOCX proposal to PDF, or extract a PDF into Word, Excel, PowerPoint, TXT, HTML or page images.', keywords: ['document converter', 'PDF converter', 'Word to PDF', 'PDF to Word'] },
  'json-format': { title: 'JSON Formatter', description: 'Format, validate and inspect JSON text for development, API debugging and content workflows.', badge: 'Developer Tool', category: 'Developer Tools', placeholder: 'Paste JSON text to format it and detect syntax errors.', example: 'Turn a compact API response into readable, indented JSON before reviewing or sharing it.', keywords: ['JSON formatter', 'JSON validator', 'pretty print JSON'] },
  'word-count': { title: 'Word and Character Counter', description: 'Count characters, words, paragraphs and estimated reading time for Chinese or English text.', badge: 'Content Tool', category: 'Content Tools', placeholder: 'Enter an article, post or document to calculate its text statistics.', example: 'Check whether a product description fits a character limit and estimate how long it takes to read.', keywords: ['word counter', 'character counter', 'reading time calculator'] },
  'image-compress': { title: 'Image Compressor', description: 'Compress JPG, PNG and other common images locally, then download a smaller WebP file.', badge: 'Image Tool', category: 'Image Tools', placeholder: 'Choose an image to compress it locally without uploading the original.', example: 'Reduce a product image before publishing it on a website or sending it through a chat app.', keywords: ['image compressor', 'compress JPG', 'compress PNG', 'WebP converter'] },
  base64: { title: 'Base64 Encoder and Decoder', description: 'Encode Unicode text to Base64 or decode Base64 data back to readable text.', badge: 'Encoding Tool', category: 'Developer Tools', placeholder: 'Enter text or Base64 data and choose encode or decode.', example: 'Encode a configuration value for transport, or inspect a Base64 string received from an API.', keywords: ['Base64 encoder', 'Base64 decoder', 'online Base64'] },
  timestamp: { title: 'Unix Timestamp Converter', description: 'Convert Unix timestamps to readable dates and convert date strings back to timestamps.', badge: 'Time Tool', category: 'Developer Tools', placeholder: 'Enter a Unix timestamp or a date string to convert it.', example: 'Translate 1704067200 into an ISO date while investigating an application log.', keywords: ['Unix timestamp converter', 'epoch converter', 'date to timestamp'] },
  'url-encode': { title: 'URL Encoder and Decoder', description: 'Encode or decode URL parameters for safe query strings and web debugging.', badge: 'Developer Tool', category: 'Developer Tools', placeholder: 'Enter text or an encoded URL parameter and choose the required direction.', example: 'Encode Chinese search terms before adding them to a URL query parameter.', keywords: ['URL encoder', 'URL decoder', 'percent encoding'] },
  'password-generator': { title: 'Secure Password Generator', description: 'Generate random passwords with configurable length and optional symbols in your browser.', badge: 'Security Tool', category: 'Utilities', placeholder: 'Choose a password length and whether symbols should be included.', example: 'Create a 20-character password with upper-case letters, numbers and symbols for a new account.', keywords: ['password generator', 'random password', 'strong password'] },
  'color-convert': { title: 'HEX and RGB Color Converter', description: 'Convert color values between HEX and RGB formats for design and front-end development.', badge: 'Design Tool', category: 'Design Tools', placeholder: 'Enter a HEX or RGB color value to convert it.', example: 'Convert #0f172a to rgb(15, 23, 42) when moving colors between design and CSS tools.', keywords: ['HEX to RGB', 'RGB to HEX', 'color converter'] },
  'markdown-html': { title: 'Markdown to HTML Converter', description: 'Convert Markdown content into HTML for websites, documentation and publishing workflows.', badge: 'Content Tool', category: 'Content Tools', placeholder: 'Paste Markdown to create copyable and downloadable HTML.', example: 'Turn headings, emphasis and inline code from a README into an HTML article draft.', keywords: ['Markdown to HTML', 'Markdown converter', 'HTML generator'] },
  'keyword-extract': { title: 'Keyword Extractor', description: 'Find frequent and meaningful words in text to support article research and content optimization.', badge: 'SEO Tool', category: 'Content Tools', placeholder: 'Enter content to extract frequent terms and their occurrence counts.', example: 'Review the main topics in a landing-page draft before refining its title and description.', keywords: ['keyword extractor', 'keyword density', 'SEO text analysis'] },
  'seo-title-generator': { title: 'SEO Title Generator', description: 'Create a concise search-friendly title from an article or page summary.', badge: 'SEO Tool', category: 'Content Tools', placeholder: 'Enter a page summary or article opening to generate a title suggestion.', example: 'Generate a focused title from a long product introduction before publishing the page.', keywords: ['SEO title generator', 'meta title', 'headline generator'] },
  'text-translate': { title: 'Text Translation Assistant', description: 'Translate text between Chinese and English for international content and communication.', badge: 'Translation Tool', category: 'Content Tools', placeholder: 'Enter text and select Chinese or English as the target language.', example: 'Translate a short product description for a bilingual storefront.', keywords: ['Chinese English translator', 'text translator', 'online translation'] },
  'copywriting-polish': { title: 'Copywriting Polisher', description: 'Clean repeated punctuation, unnecessary spacing and common verbose expressions in Chinese copy.', badge: 'Writing Tool', category: 'Content Tools', placeholder: 'Enter marketing or product copy to receive a cleaner revision.', example: 'Polish a promotional paragraph before posting it on a product or campaign page.', keywords: ['copywriting tool', 'text polish', 'Chinese writing assistant'] },
  'content-summarizer': { title: 'Text Summarizer', description: 'Extract a concise summary from a longer passage for notes, content review and publishing.', badge: 'Content Tool', category: 'Content Tools', placeholder: 'Paste a longer article or page to create a short summary.', example: 'Create a two-sentence overview from a lengthy project update.', keywords: ['text summarizer', 'article summary', 'content summary'] },
  'text-diff': { title: 'Text Difference Checker', description: 'Compare two text versions line by line to locate edits in copy, documents or code.', badge: 'Comparison Tool', category: 'Content Tools', placeholder: 'Enter version A and version B to see line-by-line differences.', example: 'Compare an original announcement with its revised version before approval.', keywords: ['text diff', 'compare text', 'difference checker'] },
  'text-case': { title: 'Text Case Converter', description: 'Convert text to upper case, lower case or title-style capitalization.', badge: 'Content Tool', category: 'Content Tools', placeholder: 'Enter text and select the required capitalization style.', example: 'Normalize a list of English headings before importing them into a website.', keywords: ['case converter', 'uppercase converter', 'lowercase converter'] },
  'lorem-ipsum': { title: 'Lorem Ipsum Generator', description: 'Generate placeholder paragraphs for page design, prototypes and content layout testing.', badge: 'Placeholder Tool', category: 'Content Tools', placeholder: 'Choose the number of paragraphs to generate.', example: 'Create five paragraphs of placeholder copy while testing a responsive article layout.', keywords: ['Lorem Ipsum generator', 'placeholder text', 'dummy text'] },
  'html-compress': { title: 'HTML Minifier', description: 'Remove unnecessary whitespace between HTML tags to create a smaller source file.', badge: 'Front-end Tool', category: 'Developer Tools', placeholder: 'Paste HTML source to create a compact downloadable version.', example: 'Minify a static email or landing-page snippet before deployment.', keywords: ['HTML minifier', 'compress HTML', 'HTML optimizer'] },
  'qr-code': { title: 'QR Code Generator', description: 'Create a scannable QR code from text or a URL and download it as a PNG image.', badge: 'Mobile Tool', category: 'Webmaster Tools', placeholder: 'Enter text or a URL, then generate and download a QR code.', example: 'Create a QR code that opens a product page from a printed card.', keywords: ['QR code generator', 'URL QR code', 'download QR PNG'] },
  'json-csv': { title: 'JSON and CSV Converter', description: 'Convert JSON arrays to CSV tables or CSV data back to JSON for imports and API work.', badge: 'Data Tool', category: 'Developer Tools', placeholder: 'Enter JSON or CSV, choose a direction and download the converted result.', example: 'Convert an API result into CSV for spreadsheet analysis, then turn edited rows back into JSON.', keywords: ['JSON to CSV', 'CSV to JSON', 'data converter'] },
  'yaml-json': { title: 'YAML and JSON Converter', description: 'Convert YAML configuration to JSON or JSON to YAML while validating the source syntax.', badge: 'Configuration Tool', category: 'Developer Tools', placeholder: 'Paste YAML or JSON, select a direction and generate normalized output.', example: 'Convert a deployment configuration into JSON for an API that does not accept YAML.', keywords: ['YAML to JSON', 'JSON to YAML', 'YAML converter'] },
  'uuid-generator': { title: 'Bulk UUID v4 Generator', description: 'Generate one to one hundred UUID v4 identifiers with the browser cryptographic random source.', badge: 'Developer Tool', category: 'Developer Tools', placeholder: 'Choose a quantity to generate UUID v4 values in one batch.', example: 'Create twenty unique identifiers for local test records without sending data to a server.', keywords: ['UUID generator', 'UUID v4', 'GUID generator'] },
  'jwt-decoder': { title: 'JWT Decoder', description: 'Decode JWT headers, payloads, expiry information and signature parts locally without uploading tokens.', badge: 'Security Tool', category: 'Developer Tools', placeholder: 'Paste a JWT to inspect its structure; decoding does not verify the signature.', example: 'Inspect development-token claims and expiry time while debugging authentication.', keywords: ['JWT decoder', 'decode JWT', 'JWT payload'] },
  'regex-tester': { title: 'Regular Expression Tester', description: 'Test regular expressions and inspect matches, indexes and capture groups against sample text.', badge: 'Developer Tool', category: 'Developer Tools', placeholder: 'Enter an expression such as /tool(ly)?/gi and the text to test.', example: 'Validate an email-matching pattern against sample data before using it in code.', keywords: ['regex tester', 'regular expression tester', 'regex online'] },
  'hash-generator': { title: 'SHA Hash Generator', description: 'Generate SHA-256 or SHA-512 hexadecimal digests locally for text verification and development.', badge: 'Security Tool', category: 'Developer Tools', placeholder: 'Enter text and select SHA-256 or SHA-512.', example: 'Create a SHA-256 checksum for a configuration string and compare it with an expected value.', keywords: ['SHA-256 generator', 'SHA-512 hash', 'hash generator'] },
  'rmb-uppercase': { title: 'Chinese RMB Uppercase Converter', description: 'Convert a numeric amount into formal uppercase Chinese RMB wording for invoices and contracts.', badge: 'Chinese Office Tool', category: 'Office Tools', placeholder: 'Enter an amount such as 123456.78 to generate formal Chinese RMB text.', example: 'Convert 1234.56 into the uppercase amount required on a Chinese reimbursement form.', keywords: ['RMB uppercase converter', 'Chinese amount uppercase', '人民币大写'] },
  'image-convert': { title: 'Image Format Converter', description: 'Convert images between JPG, PNG and WebP formats locally and download the result.', badge: 'Image Tool', category: 'Image Tools', placeholder: 'Choose a JPG, PNG or WebP file and select the required output format.', example: 'Convert a transparent PNG to WebP for the web, or a WebP image to JPG for compatibility.', keywords: ['image converter', 'JPG to PNG', 'PNG to WebP', 'WebP to JPG'] },
};

const chineseExamples: Record<string, string> = {
  'pdf-convert': '例如把 DOCX 合同转成 PDF，或将带文字层的 PDF 提取为 Word、Excel、PPT、TXT、HTML 与逐页图片。',
  'json-format': '例如将接口返回的单行 JSON 美化为缩进清晰的结构，再检查括号或引号错误。',
  'word-count': '例如检查产品文案是否符合字符限制，同时估算文章阅读时间。',
  'image-compress': '例如在发布商品图片或通过聊天软件发送前，先缩小图片体积。',
  base64: '例如编码配置值以便传输，或解码接口返回的 Base64 字符串。',
  timestamp: '例如排查程序日志时，把 1704067200 转换为可读日期。',
  'url-encode': '例如将中文搜索词编码后安全加入网址查询参数。',
  'password-generator': '例如为新账号生成包含大小写、数字和符号的 20 位随机密码。',
  'color-convert': '例如在设计稿与 CSS 之间把 #0f172a 转换为 rgb(15, 23, 42)。',
  'markdown-html': '例如将 README 的标题、加粗和行内代码转换成 HTML 文章草稿。',
  'keyword-extract': '例如在发布落地页前检查草稿主题词，再优化标题与描述。',
  'seo-title-generator': '例如从较长的产品介绍中生成一个重点明确的页面标题。',
  'text-translate': '例如为双语商店翻译一段简短的商品介绍。',
  'copywriting-polish': '例如在活动页面发布前清理宣传文案中的重复标点与冗余表达。',
  'content-summarizer': '例如从较长的项目进度中提取两句简明概述。',
  'text-diff': '例如在审批前比较公告原稿与修改稿的逐行变化。',
  'text-case': '例如批量统一准备导入网站的英文标题大小写格式。',
  'lorem-ipsum': '例如测试响应式文章布局时生成五段占位文本。',
  'html-compress': '例如部署前压缩静态邮件模板或落地页代码片段。',
  'qr-code': '例如为印刷卡片生成一个打开商品页面的网址二维码。',
  'json-csv': '例如把接口数据转成 CSV 做表格分析，再把编辑后的记录转回 JSON。',
  'yaml-json': '例如将部署配置转成只接受 JSON 的接口所需格式。',
  'uuid-generator': '例如一次生成 20 个本地测试记录主键。',
  'jwt-decoder': '例如调试登录时检查开发令牌的声明内容与过期时间。',
  'regex-tester': '例如先用样本数据测试邮箱匹配表达式，再写入程序。',
  'hash-generator': '例如为配置字符串生成 SHA-256 摘要并与预期值核对。',
  'rmb-uppercase': '例如把 1234.56 转换成报销单要求的规范人民币大写。',
  'image-convert': '例如将透明 PNG 转为 WebP 用于网页，或将 WebP 转为兼容性更好的 JPG。',
};

export type LocalizedTool = ToolMeta & {
  locale: SiteLocale;
  localHref: string;
  keywords: string[];
  example: string;
};

export function getLocalizedTool(tool: ToolMeta, locale: SiteLocale): LocalizedTool {
  if (locale === 'zh-CN') {
    return {
      ...tool,
      locale,
      localHref: tool.href,
      keywords: [tool.title, tool.badge, tool.category, '免费在线工具', '在线转换', 'Toolly'],
      example: chineseExamples[tool.toolKey],
    };
  }

  const copy = englishToolCopy[tool.toolKey];
  return {
    ...tool,
    ...copy,
    locale,
    href: tool.href,
    localHref: `/en${tool.href}`,
  };
}

export function toolSteps(tool: LocalizedTool) {
  if (tool.locale === 'en') {
    if (tool.mode === 'file') return ['Choose a supported file from your device.', 'Select the required output or processing option.', 'Run the tool, review the result and download the generated file.'];
    if (tool.mode === 'generate') return ['Choose the available generation options.', 'Run the generator in your browser.', 'Copy the result or download it when a file is available.'];
    if (tool.mode === 'dual') return ['Enter the expression or first text value.', 'Enter the comparison or test content.', 'Run the tool and review the detailed output.'];
    return ['Paste or type the source content.', 'Choose an operation when the page offers multiple directions.', 'Run the tool, then copy or download the result.'];
  }

  if (tool.mode === 'file') return ['从设备中选择页面支持的文件。', '选择目标格式或需要执行的处理方式。', '开始处理，检查结果后下载生成的文件。'];
  if (tool.mode === 'generate') return ['设置页面提供的生成参数。', '在浏览器中执行生成操作。', '复制结果；如果生成了文件，也可以直接下载。'];
  if (tool.mode === 'dual') return ['输入表达式或第一份文本。', '输入用于比较或测试的第二份内容。', '执行工具并检查详细结果。'];
  return ['粘贴或输入需要处理的原始内容。', '如果页面提供多种方向，请选择需要的操作。', '执行工具，然后复制或下载真实结果。'];
}

export function toolFaq(tool: LocalizedTool) {
  if (tool.locale === 'en') {
    return [
      { question: `Is ${tool.title} free to use?`, answer: tool.premium ? 'The page can be opened for free, while this advanced operation requires a Toolly membership.' : 'Yes. This Toolly utility can be used without a paid download or desktop installation.' },
      { question: 'Is my content uploaded?', answer: tool.mode === 'file' || ['jwt-decoder', 'hash-generator', 'base64'].includes(tool.toolKey) ? 'Processing is performed in the current browser whenever the page states local processing. Keep the page open until the result is ready.' : 'Most processing runs directly in the browser. Translation-related features may contact an online translation service to create the requested result.' },
      { question: `What can I do with ${tool.title}?`, answer: `${tool.description} ${tool.example}` },
    ];
  }

  return [
    { question: `${tool.title}可以免费使用吗？`, answer: tool.premium ? '页面可以免费访问，但该高级处理功能需要登录 Toolly 会员后使用。' : '可以。这个 Toolly 工具无需购买软件下载或安装桌面程序。' },
    { question: '我的内容会上传服务器吗？', answer: tool.mode === 'file' || ['jwt-decoder', 'hash-generator', 'base64'].includes(tool.toolKey) ? '页面标注“本地处理”的操作会在当前浏览器中完成。处理结束前请保持页面开启。' : '多数处理直接在浏览器中运行；翻译类功能为了获得结果，可能会调用在线翻译服务。' },
    { question: `${tool.title}适合哪些场景？`, answer: `${tool.description}${tool.example}` },
  ];
}
