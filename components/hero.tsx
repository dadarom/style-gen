import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-border bg-white mb-8 font-mono text-xs font-bold uppercase tracking-widest text-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
        <span className="w-2 h-2 bg-primary animate-pulse" />
        System Online v2.0
      </div>

      <div className="space-y-4 mb-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-balance uppercase leading-[0.9] text-foreground">
          BREAK THE <br />
          <span className="text-primary bg-clip-text">VISUAL BOUNDARIES</span>
        </h1>
        <p className="font-mono text-xs md:text-sm text-muted-foreground tracking-widest uppercase border-y border-border py-2 mx-auto max-w-2xl">
          AI-POWERED VISUAL REVOLUTION FOR CREATORS
        </p>
      </div>

      <p className="max-w-2xl text-muted-foreground text-lg md:text-xl font-medium text-balance mb-12 leading-relaxed">
        将普通照片转化为非凡的艺术作品。专为创作者和电商卖家打造的专业级风格迁移工具。
        <span className="block mt-4 font-mono text-xs text-primary font-bold opacity-80">
          [ FAST_RENDER ] [ 4K_OUTPUT ] [ SECURE_PROCESS ]
        </span>
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto mb-16">
        <Button
          size="lg"
          className="w-full h-14 px-8 rounded-none bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-primary/90 hover:-translate-y-1 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] border-2 border-transparent text-lg"
        >
          立即开始创作
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full h-14 px-8 rounded-none border-2 border-border font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-all text-lg bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
        >
          查看案例库
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-0 w-full max-w-2xl border-2 border-border bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="py-4 px-4 text-center border-r-2 border-border hover:bg-primary/5 transition-colors">
          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase mb-1">PROCESSING_TIME</div>
          <div className="text-xl md:text-2xl font-black text-primary">~60s</div>
        </div>
        <div className="py-4 px-4 text-center border-r-2 border-border hover:bg-primary/5 transition-colors">
          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase mb-1">COST_PER_GEN</div>
          <div className="text-xl md:text-2xl font-black text-primary">¥0.3</div>
        </div>
        <div className="py-4 px-4 text-center hover:bg-primary/5 transition-colors">
          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase mb-1">STYLE_MATRIX</div>
          <div className="text-xl md:text-2xl font-black text-primary">50+</div>
        </div>
      </div>
    </section>
  )
}
