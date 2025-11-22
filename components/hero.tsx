import { Button, Heading, Text } from './atom';
import { SINGLE_PRICE, ESTIMATED_TIME } from '../data/pricing'

export function Hero() {
  return (
    <section className="relative pt-32 pb-16 px-4 flex flex-col items-center text-center max-w-5xl mx-auto">
      {/* <Text 
        as="div"
        className="inline-flex items-center gap-2 px-3 py-1 border-2 border-border bg-white mb-8"
        font="mono"
        size="xs"
        weight="bold"
        color="primary"
        uppercase
        tracking="wider"
        style={{ boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.2)' }}
      >
        <span className="w-2 h-2 bg-primary animate-pulse" />
        System Online v2.0
      </Text> */}

      <div className="space-y-4 mb-10">
        <Heading level="h1" size="3xl" weight="black" uppercase tracking="tighter" className="text-balance leading-[0.9]">
          BREAK THE <br />
          <span className="text-primary">VISUAL BOUNDARIES</span>
        </Heading>
        <Text 
          as="p"
          className="border-y border-border py-2 mx-auto max-w-2xl"
          font="mono"
          size="xs"
          color="muted"
          uppercase
          tracking="wider"
        >
          AI-POWERED VISUAL REVOLUTION FOR CREATORS
        </Text>
      </div>

      <Text 
        as="p"
        className="max-w-2xl text-balance mb-12 leading-relaxed"
        size="lg"
        weight="medium"
        color="muted"
      >
        将普通照片转化为非凡的艺术作品。专为创作者和电商卖家打造的专业级风格迁移工具。
        <span className="block mt-4 font-mono text-xs text-primary font-bold opacity-80">
          [ FAST_RENDER ] [ 4K_OUTPUT ] [ SECURE_PROCESS ]
        </span>
      </Text>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-md mx-auto mb-16">
        <Button
          size="lg"
          className="w-full"
          uppercase
          tracking="wider"
          style={{ boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.2)' }}
        >
          立即开始创作
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          uppercase
          tracking="wider"
        >
          查看案例库
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-0 w-full max-w-2xl border-2 border-border bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="py-4 px-4 text-center border-r-2 border-border hover:bg-primary/5 transition-colors">
          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase mb-1">PROCESSING_TIME</div>
          <div className="text-xl md:text-2xl font-black text-primary">~{ESTIMATED_TIME}s</div>
        </div>
        <div className="py-4 px-4 text-center border-r-2 border-border hover:bg-primary/5 transition-colors">
          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase mb-1">COST_PER_GEN</div>
          <div className="text-xl md:text-2xl font-black text-primary">¥{SINGLE_PRICE}</div>
        </div>
        <div className="py-4 px-4 text-center hover:bg-primary/5 transition-colors">
          <div className="text-[10px] text-muted-foreground font-mono font-bold uppercase mb-1">STYLE_MATRIX</div>
          <div className="text-xl md:text-2xl font-black text-primary">50+</div>
        </div>
      </div>
    </section>
  )
}
