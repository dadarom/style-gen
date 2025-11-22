// Footer组件 - 页脚导航和品牌信息
'use client'
import React from 'react';

interface FooterLink {
  id: string;
  label: string;
  url: string;
  englishLabel: string;
}

interface FooterLinkGroup {
  id: string;
  title: string;
  englishTitle: string;
  links: FooterLink[];
}

export function Footer() {
  const footerLinkGroups: FooterLinkGroup[] = [
    {
      id: 'product',
      title: '产品',
      englishTitle: 'PRODUCT',
      links: [
        { id: 'features', label: '功能特性', url: '/features', englishLabel: 'FEATURES' },
        { id: 'pricing', label: '价格方案', url: '/pricing', englishLabel: 'PRICING' },
        { id: 'api', label: 'API接入', url: '/api', englishLabel: 'API' },
      ],
    },
    {
      id: 'resources',
      title: '资源',
      englishTitle: 'RESOURCES',
      links: [
        { id: 'docs', label: '开发文档', url: '/docs', englishLabel: 'DOCS' },
        { id: 'community', label: '社区论坛', url: '/community', englishLabel: 'COMMUNITY' },
        { id: 'help', label: '帮助中心', url: '/help', englishLabel: 'HELP' },
      ],
    },
    {
      id: 'legal',
      title: '法律',
      englishTitle: 'LEGAL',
      links: [
        { id: 'privacy', label: '隐私政策', url: '/privacy', englishLabel: 'PRIVACY' },
        { id: 'terms', label: '服务条款', url: '/terms', englishLabel: 'TERMS' },
      ],
    },
  ];

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="lg:col-span-1">
            <a href="/" className="block mb-6">
              <h2 className="font-black text-2xl uppercase tracking-tight">STYLEGEN.AI</h2>
            </a>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              赋能创作者的下一代风格迁移技术，让每一次灵感都触手可及。
            </p>
          </div>
          
          {/* 导航链接分组 */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerLinkGroups.map((group) => (
              <div key={group.id}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                  <span>|</span>
                  <span className="text-primary">{group.title} / {group.englishTitle}</span>
                </h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.id}>
                      <a
                        href={link.url}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {link.label} / {link.englishLabel}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* 底部版权信息 */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} STYLEGEN.AI. ALL RIGHTS RESERVED.
          </p>
          
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-xs font-mono">SYSTEM STATUS: NORMAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
