# Toolly 微信小程序

这是 Toolly 的原生微信小程序版本。首版只包含可在设备端离线运行的工具，不包含广告、会员、登录、占位文件转换或外部 API。

## 本地预览

1. 安装并打开微信开发者工具。
2. 选择“导入项目”。
3. 项目目录选择本文件夹 `wechat-mini-program`。
4. 未取得正式 AppID 时可先使用测试号；准备上传时，将 `project.config.json` 中的 `appid` 替换为正式小程序 AppID。

## 首版工具

- JSON 格式化
- 字数统计
- Base64 编解码
- 时间戳转换
- URL 编解码
- 密码生成
- HEX / RGB 颜色转换
- Markdown 转 HTML
- 关键词提取
- 文本差异比较
- 英文大小写转换
- Lorem Ipsum 生成
- HTML 压缩

所有处理均在本机完成，不上传用户输入。
