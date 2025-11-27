'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 模拟案例数据
const GALLERY_ITEMS = [
  { id: 1, title: '油画', image: '/abstract-oil-painting.png', category: '艺术风格' },
  { id: 2, title: '水彩', image: '/watercolor.jpg', category: '艺术风格' },
  { id: 3, title: '素描', image: '/pencil-sketch.png', category: '艺术风格' },
  { id: 4, title: '卡通', image: '/cartoon-art.jpg', category: '艺术风格' },
  { id: 5, title: '漫画', image: '/manga-style.jpg', category: '艺术风格' },
  { id: 6, title: '复古胶片', image: '/vintage-film.png', category: '摄影风格' },
  { id: 7, title: '电影感', image: '/cinematic-shot.jpg', category: '摄影风格' },
  { id: 8, title: '赛博朋克', image: '/cyberpunk-city.png', category: '摄影风格' },
  { id: 9, title: 'INS风', image: '/instagram-filter.jpg', category: '摄影风格' },
  { id: 10, title: '商品精修', image: '/product-photography-still-life.png', category: '电商专用' },
  { id: 11, title: '白底图', image: '/white-background-product.jpg', category: '电商专用' },
  { id: 12, title: '国风水墨', image: '/chinese-ink-painting.jpg', category: '创意风格' },
];

export default function GalleryPage() {
  const router = useRouter();

  // 平滑滚动到首页的AI风格生成器部分
  const scrollToGenerator = () => {
    // 先跳转到首页
    router.push('/');
    // 然后平滑滚动到generator部分
    setTimeout(() => {
      const element = document.getElementById('generator');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-background border-b border-border py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* 返回主页按钮 */}
          <Button
            variant="outline"
            onClick={() => router.push('/')}
            className="rounded-none border-2 border-border font-mono uppercase tracking-wider hover:text-primary transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回主页
          </Button>

          {/* 立即开始创作按钮 */}
          <Button
            onClick={scrollToGenerator}
            className="rounded-none bg-primary text-primary-foreground font-mono uppercase tracking-wider hover:bg-primary/90 transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]"
          >
            立即开始创作
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        {/* 标题部分 */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6">
            <span className="text-primary">案例</span> 展示
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            探索我们的AI风格生成器创造的精彩作品，灵感无限，风格多样
          </p>
        </section>

        {/* 图片墙 */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {GALLERY_ITEMS.map((item) => (
              <div
                key={item.id}
                className="border-2 border-border overflow-hidden hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="bg-background p-4 border-t border-border">
                  <h3 className="font-bold font-mono uppercase text-sm mb-1">{item.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 行动号召 */}
        <section className="text-center">
          <Button
            size="lg"
            onClick={scrollToGenerator}
            className="rounded-none bg-primary text-primary-foreground font-mono uppercase tracking-wider hover:bg-primary/90 transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)]"
          >
            立即开始创作
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground text-sm font-mono">
          <p>AI StyleGen © {new Date().getFullYear()} | 探索无限创意可能性</p>
        </div>
      </footer>
    </div>
  );
}
