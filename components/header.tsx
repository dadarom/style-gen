'use client';
import { useState, useEffect } from 'react';
import { Button, Link, Text, Container } from './atom';
import { useAuth } from './auth/AuthProvider';
import AuthForm from './auth/AuthForm';

// 临时使用硬编码的导航链接，直到数据导入问题解决
export function Header() {
  const { isAuthenticated, logout, setIsLoginModalOpen } = useAuth();
  
  // 更新导航链接为锚点链接，包含演示和关于我们
  const navigationLinks = [
    { id: 'hero', label: '首页', href: '#hero' },
    { id: 'workflow', label: '功能', href: '#workflow' },
    { id: 'pricing', label: '价格', href: '#pricing' },
    { id: 'demo', label: '演示', href: '#demo' },
    { id: 'about', label: '关于我们', href: '#about' },
  ];

  // 当前激活的导航项ID，初始值设为hero
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
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    // 对于非锚点链接，让NextLink正常处理导航，不要阻止默认行为
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
    } else {
      // 对于非锚点链接，直接更新激活状态，让NextLink处理导航
      setActiveSection(id);
    }
  };

  // 在客户端渲染完成后，检查当前页面并设置正确的激活状态
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 初始执行滚动检测，确定当前激活的部分
      handleScroll();
      
      // 添加滚动事件监听
      window.addEventListener('scroll', handleScroll);
      
      // 监听popstate事件，当用户使用浏览器前进/后退按钮时更新激活状态
      const handlePathChange = () => {
        handleScroll();
      };

      window.addEventListener('popstate', handlePathChange);
      
      // 清理函数
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('popstate', handlePathChange);
      };
    }
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
              onClick={(e) => handleLinkClick(e, link.href, link.id)}
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
          {isAuthenticated ? (
            <Button 
              variant="outline" 
              size="sm" 
              font="mono"
              onClick={() => logout()}
            >
              登出
            </Button>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              font="mono"
              onClick={() => setIsLoginModalOpen(true)}
            >
              登录
            </Button>
          )}
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
