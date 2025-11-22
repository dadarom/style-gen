export function Footer() {
  return (
    <footer className="border-t-2 border-border mt-auto bg-background relative z-10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="font-black text-2xl uppercase tracking-tighter">
              StyleGen<span className="text-primary">.AI</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs font-medium leading-relaxed border-l-2 border-primary pl-4">
              赋能创作者的下一代风格迁移技术，让每一次灵感都触手可及。
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-primary"></span>产品 / PRODUCT
            </h3>
            <ul className="space-y-3 text-sm font-medium text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  功能特性 / FEATURES
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  价格方案 / PRICING
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  API 接入 / API
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-primary"></span>资源 / RESOURCES
            </h3>
            <ul className="space-y-3 text-sm font-medium text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  开发文档 / DOCS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  社区论坛 / COMMUNITY
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  帮助中心 / HELP
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="font-mono text-sm font-bold text-primary uppercase tracking-widest flex items-center gap-2">
              <span className="w-1 h-4 bg-primary"></span>法律 / LEGAL
            </h3>
            <ul className="space-y-3 text-sm font-medium text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  隐私政策 / PRIVACY
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground hover:translate-x-1 transition-all inline-block">
                  服务条款 / TERMS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-muted-foreground font-mono font-bold uppercase tracking-widest gap-4">
          <div>© 2025 STYLEGEN AI. ALL RIGHTS RESERVED.</div>
          <div className="flex items-center gap-2 bg-secondary px-3 py-1">
            <span className="w-2 h-2 bg-green-500 animate-pulse"></span>
            SYSTEM STATUS: NORMAL
          </div>
        </div>
      </div>
    </footer>
  )
}
