# 截图占位与生成说明

推荐截图（示例尺寸）：

- iPhone 6.7" / Play Store: 1242x2688 px（竖屏）
- iPhone 5.5" / Play Store 小图：1242x2208 px
- Android 多尺寸：1080x1920 px、720x1280 px

快速生成占位图（需要 ImageMagick）：

```bash
mkdir -p metadata/app-store/screenshots
convert -size 1242x2688 xc:'#2b6cb0' -gravity Center -pointsize 80 -fill white -annotate +0+0 'Toolly — Screenshot' metadata/app-store/screenshots/placeholder_1242x2688.png
```

上传到各商店控制台前，替换为真实界面截图并遵循各商店的截图规范（语言、本地化）。
