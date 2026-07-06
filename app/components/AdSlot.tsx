export default function AdSlot() {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600 shadow-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">广告位占位</p>
      <div className="space-y-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-4 text-slate-700">
          <p className="font-semibold text-slate-900">推荐广告位</p>
          <p className="mt-2 text-sm leading-6">
            在此位置可展示 Google AdSense、联盟广告或本地推广内容，保持页面简洁并提高点击率。
          </p>
          {/* AdSense container - replace data-ad-client and data-ad-slot after registering */}
          <div className="mt-4">
            <ins className="adsbygoogle"
              style={{ display: 'block' }}
              data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
              data-ad-slot="1234567890"
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
            <script>
              {(function () {
                try {
                  // @ts-ignore
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                } catch (e) {
                  // ignore
                }
              })()}
            </script>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-600">
          真实部署时，请替换为广告脚本或广告组件，并确保广告与页面内容协调。部署前请先申请 AdSense 帐号并获取 `ca-pub-...`。
        </p>
      </div>
    </div>
  );
}
