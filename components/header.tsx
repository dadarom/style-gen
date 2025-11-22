import { Button, Link, Text, Container } from './atom';

// 临时使用硬编码的导航链接，直到数据导入问题解决
export function Header() {
  const navigationLinks = [
    { id: 'features', label: '功能', href: '/features' },
    { id: 'pricing', label: '价格', href: '/pricing' },
    { id: 'examples', label: '示例', href: '/examples' },
    { id: 'docs', label: '文档', href: '/docs' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b-2 border-border bg-background/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="h-8 w-8 bg-primary flex items-center justify-center border-2 border-transparent group-hover:border-foreground transition-colors">
            <Text className="font-black text-primary-foreground text-lg">S</Text>
          </div>
          <Text className="font-black text-xl tracking-tighter uppercase group-hover:text-primary transition-colors">
            StyleGen<span className="text-primary">.AI</span>
          </Text>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-bold font-mono uppercase tracking-wide">
          {navigationLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              weight="bold"
              font="mono"
              className="uppercase"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Text 
            className="hidden md:block bg-primary/10 px-2 py-1"
            font="mono"
            size="xs"
            weight="bold"
            color="primary"
            uppercase
          >
            SYSTEM_STATUS: ONLINE
          </Text>
          <Button variant="outline" size="sm" font="mono">
            登录
          </Button>
          <Button
            size="sm"
            variant="secondary"
            font="mono"
            uppercase
            tracking="wider"
          >
            获取 API Key
          </Button>
        </div>
      </Container>
    </header>
  );
}
