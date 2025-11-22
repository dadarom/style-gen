"use client"
import { useState, useEffect } from 'react';
import { Button, Link, Text, Container } from './atom';

// 临时使用硬编码的导航链接，直到数据导入问题解决
export function Header() {
  // 更新导航链接为锚点链接
  const navigationLinks = [
    { id: 'hero', label: '首页', href: '#hero' },
    { id: 'workflow', label: '功能', href: '#workflow' },
    { id: 'pricing', label: '价格', href: '#pricing' },
    { id: 'docs', label: '文档', href: '/docs' },
  ];

  // 当前激活的导航项ID
  const [activeSection, setActiveSection] = useState('hero');

  // 处理滚动事件，更新当前激活的导航项
  const handleScroll = () => {
    const scrollPosition = window.scrollY + 100; // 添加偏移量

    // 获取所有可滚动的部分
    const sections = navigationLinks
      .filter(link => link.href.startsWith('#'))
      .map(link => link.id);

    // 查找当前在视口中的部分
    for (const sectionId of sections.reverse()) {
      const section = document.getElementById(sectionId);
      if (section && section.offsetTop <= scrollPosition) {
        setActiveSection(sectionId);
        break;
      }
    }
  };

  // 处理导航链接点击，实现平滑滚动
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // 如果是锚点链接
    if (href.startsWith('#')) {
      e.preventDefault(); // 阻止默认行为
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // 平滑滚动到目标元素
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        
        // 更新当前激活的部分
        setActiveSection(targetId);
      }
    }
  };

  // 添加滚动事件监听
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    // 初始化时检查当前位置
    handleScroll();
    // 清理函数
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              className={`uppercase transition-colors ${activeSection === link.id ? 'text-primary' : 'hover:text-primary'}`}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Text 
            className="hidden bg-primary/10 px-2 py-1"
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
