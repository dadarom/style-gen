import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 bg-primary flex items-center justify-center border-2 border-transparent group-hover:border-foreground transition-colors">
            <span className="font-black text-primary-foreground text-lg">S</span>
          </div>
          <span className="font-black text-xl tracking-tighter uppercase group-hover:text-primary transition-colors">
            StyleGen<span className="text-primary">.AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold font-mono uppercase tracking-wide">
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4"
          >
            风格库
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4"
          >
            价格方案
          </Link>
          <Link
            href="#"
            className="hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4"
          >
            文档中心
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block text-[10px] font-mono font-bold bg-primary/10 px-2 py-1 text-primary uppercase">
            SYSTEM_STATUS: ONLINE
          </div>
          <Button variant="outline" size="sm" className="font-mono text-xs h-8 bg-transparent">
            登录
          </Button>
          <Button
            size="sm"
            className="rounded-none bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-wider border-2 border-transparent transition-all hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
          >
            获取 API Key
          </Button>
        </div>
      </div>
    </header>
  )
}
