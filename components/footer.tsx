// Footer组件 - 页脚导航和品牌信息
'use client'
import React from 'react';
import Link from 'next/link';

export function Footer() {
  // 临时使用硬编码的数据
  const navigationLinks = [
    { id: 'home', url: '/', label: '首页' },
    { id: 'features', url: '/features', label: '功能' },
    { id: 'pricing', url: '/pricing', label: '价格' },
    { id: 'examples', url: '/examples', label: '示例' },
    { id: 'about', url: '/about', label: '关于我们' },
  ];

  const footerLinks = [
    {
      id: 'product',
      title: '产品',
      links: [
        { id: 'features', label: '功能', url: '/features' },
        { id: 'pricing', label: '价格', url: '/pricing' },
        { id: 'examples', label: '示例', url: '/examples' },
      ],
    },
    {
      id: 'company',
      title: '公司',
      links: [
        { id: 'about', label: '关于我们', url: '/about' },
        { id: 'contact', label: '联系方式', url: '/contact' },
        { id: 'blog', label: '博客', url: '/blog' },
      ],
    },
    {
      id: 'support',
      title: '支持',
      links: [
        { id: 'docs', label: '文档', url: '/docs' },
        { id: 'faq', label: '常见问题', url: '/faq' },
        { id: 'help', label: '帮助中心', url: '/help' },
      ],
    },
  ];

  const socialLinks = [
    { id: 'twitter', url: '#', icon: <span>🐦</span>, label: 'Twitter' },
    { id: 'github', url: '#', icon: <span>🐙</span>, label: 'GitHub' },
    { id: 'instagram', url: '#', icon: <span>📸</span>, label: 'Instagram' },
    { id: 'youtube', url: '#', icon: <span>🎬</span>, label: 'YouTube' },
  ];

  const singlePrice = 0.3;
  const pricingPlans = [
    { name: '基础套餐', price: 9.99 }
  ];

  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary flex items-center justify-center font-bold text-primary-foreground text-xl">
                S
              </div>
              <span className="font-black text-xl uppercase tracking-tighter">StyleGen</span>
            </Link>
            
            <p className="text-sm text-muted-foreground mb-6">
              AI风格生成器，为您的照片带来专业级艺术效果。
              简单易用，高质量输出。
            </p>
            
            {/* 社交媒体链接 */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border hover:border-primary hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          
          {/* 导航链接分组 */}
          {footerLinks.map((group) => (
            <div key={group.id}>
              <h3 className="font-bold font-mono text-xs uppercase mb-4 border-b border-border pb-2 inline-block">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.url}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* 底部信息 */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <div className="flex gap-6 mb-6 md:mb-0 overflow-x-auto pb-2 scrollbar-hide">
            {navigationLinks.map((link) => (
              <Link
                key={link.id}
                href={link.url}
                className="text-xs font-mono whitespace-nowrap hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          
          <div className="text-xs text-muted-foreground font-mono">
            &copy; {new Date().getFullYear()} StyleGen AI. All rights reserved.
          </div>
        </div>
        
        {/* 价格提示 */}
        <div className="mt-8 text-center text-xs font-mono text-muted-foreground border-t border-border pt-6">
          <p>单次生成价格: <span className="text-primary font-bold">¥{singlePrice}</span> | 套餐起价: <span className="text-primary font-bold">¥{pricingPlans[0].price}</span> ({pricingPlans[0].name})</p>
        </div>
      </div>
    </footer>
  );
}
