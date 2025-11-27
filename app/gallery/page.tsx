'use client'
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 模拟案例数据 - 配置化管理风格图和用户实际效果图
const GALLERY_ITEMS = [
  { 
    id: 1, 
    title: '油画', 
    styleImage: '/abstract-oil-painting.png', 
    userImage: '/cartoon-art.jpg', 
    category: '艺术风格' 
  },
  { 
    id: 2, 
    title: '水彩', 
    styleImage: '/watercolor.jpg', 
    userImage: '/manga-style.jpg', 
    category: '艺术风格' 
  },
  { 
    id: 3, 
    title: '素描', 
    styleImage: '/pencil-sketch.png', 
    userImage: '/cinematic-shot.jpg', 
    category: '艺术风格' 
  },
  { 
    id: 4, 
    title: '卡通', 
    styleImage: '/cartoon-art.jpg', 
    userImage: '/vintage-film.png', 
    category: '艺术风格' 
  },
  { 
    id: 5, 
    title: '漫画', 
    styleImage: '/manga-style.jpg', 
    userImage: '/cyberpunk-city.png', 
    category: '艺术风格' 
  },
  { 
    id: 6, 
    title: '复古胶片', 
    styleImage: '/vintage-film.png', 
    userImage: '/instagram-filter.jpg', 
    category: '摄影风格' 
  },
  { 
    id: 7, 
    title: '电影感', 
    styleImage: '/cinematic-shot.jpg', 
    userImage: '/product-photography-still-life.png', 
    category: '摄影风格' 
  },
  { 
    id: 8, 
    title: '赛博朋克', 
    styleImage: '/cyberpunk-city.png', 
    userImage: '/white-background-product.jpg', 
    category: '摄影风格' 
  },
  { 
    id: 9, 
    title: 'INS风', 
    styleImage: '/instagram-filter.jpg', 
    userImage: '/chinese-ink-painting.jpg', 
    category: '摄影风格' 
  },
  { 
    id: 10, 
    title: '商品精修', 
    styleImage: '/product-photography-still-life.png', 
    userImage: '/abstract-oil-painting.png', 
    category: '电商专用' 
  },
  { 
    id: 11, 
    title: '白底图', 
    styleImage: '/white-background-product.jpg', 
    userImage: '/watercolor.jpg', 
    category: '电商专用' 
  },
  { 
    id: 12, 
    title: '国风水墨', 
    styleImage: '/chinese-ink-painting.jpg', 
    userImage: '/pencil-sketch.png', 
    category: '创意风格' 
  },
];

// 图片对比组件 - 支持左右滑动对比
const ImageCompare = ({ styleImage, userImage, alt }: { styleImage: string; userImage: string; alt: string }) => {
  const [position, setPosition] = React.useState(50);
  const [isDragging, setIsDragging] = React.useState(false);
  const sliderRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percentage);
  };

  return (
    <div 
      ref={sliderRef}
      className="relative aspect-square overflow-hidden cursor-col-resize"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    >
      {/* 用户实际效果图 */}
      <img
        src={userImage}
        alt={`${alt} - 用户实际效果`}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      
      {/* 风格图 - 可滑动显示 */}
      <div 
        className="absolute top-0 left-0 h-full overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={styleImage}
          alt={`${alt} - 风格图`}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      {/* 滑动分隔线 */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-primary shadow-lg z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-primary rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-col-resize"></div>
      </div>
      
      {/* 提示文字 */}
      <div className="absolute top-4 left-4 bg-background/80 text-xs font-mono uppercase font-bold px-2 py-1 border border-border">
        原始图
      </div>
      <div className="absolute top-4 right-4 bg-background/80 text-xs font-mono uppercase font-bold px-2 py-1 border border-border">
        创意图
      </div>
    </div>
  );
};

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
                {/* 使用图片对比组件 */}
                <ImageCompare 
                  styleImage={item.styleImage} 
                  userImage={item.userImage} 
                  alt={item.title} 
                />
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
