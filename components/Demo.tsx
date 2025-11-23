// Demo组件 - 功能演示展示
import React from 'react';
import { Container, Heading, Text } from './atom';

export function Demo() {
  return (
    <Container className="py-20">
      <section className="flex flex-col items-center text-center mb-16">
        <div className="space-y-4 mb-10 mt-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6 mt-8">
            功能 <span className="text-primary">演示</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            观看我们的AI风格迁移技术如何将普通照片转化为艺术作品。以下演示展示了不同风格的转换效果和实时处理能力。
          </p>
        </div>
      </section>
      
      {/* 视频演示区域 */}
      <section className="mb-20">
        <div className="border-2 border-border bg-black aspect-video rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto">
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-background">
            <Text 
              as="p"
              font="mono"
              size="sm"
              weight="bold"
              color="muted"
              className="px-6 py-3 border border-border bg-background/50 rounded"
            >
              [ 演示视频将在这里播放 ]
              <span className="block text-xs mt-2 opacity-70">视频加载中，请稍候...</span>
            </Text>
          </div>
        </div>
        <Text 
          as="p"
          className="text-center mt-6"
          font="mono"
          size="xs"
          color="muted"
        >
          演示：AI风格迁移技术 - 从普通照片到艺术作品的实时转换过程
        </Text>
      </section>
      
      {/* 特性亮点 */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div className="border border-border p-6 rounded-lg hover:border-primary transition-colors">
          <Text 
            as="div"
            font="mono"
            size="xs"
            weight="bold"
            color="primary"
            uppercase
            tracking="wider"
            className="mb-3"
          >
            实时预览
          </Text>
          <Text size="sm" color="muted" className="mb-4">
            在应用风格前实时查看效果，调整参数以获得最佳结果。
          </Text>
          <div className="h-40 bg-border/20 rounded flex items-center justify-center">
            <Text font="mono" size="xs" color="muted">预览图占位</Text>
          </div>
        </div>
        
        <div className="border border-border p-6 rounded-lg hover:border-primary transition-colors">
          <Text 
            as="div"
            font="mono"
            size="xs"
            weight="bold"
            color="primary"
            uppercase
            tracking="wider"
            className="mb-3"
          >
            多种风格
          </Text>
          <Text size="sm" color="muted" className="mb-4">
            50+种预设艺术风格，从油画到漫画，满足各种创作需求。
          </Text>
          <div className="h-40 bg-border/20 rounded flex items-center justify-center">
            <Text font="mono" size="xs" color="muted">风格展示占位</Text>
          </div>
        </div>
        
        <div className="border border-border p-6 rounded-lg hover:border-primary transition-colors">
          <Text 
            as="div"
            font="mono"
            size="xs"
            weight="bold"
            color="primary"
            uppercase
            tracking="wider"
            className="mb-3"
          >
            批量处理
          </Text>
          <Text size="sm" color="muted" className="mb-4">
            一次处理多张图片，提高工作效率，适合电商产品图片优化。
          </Text>
          <div className="h-40 bg-border/20 rounded flex items-center justify-center">
            <Text font="mono" size="xs" color="muted">批量处理占位</Text>
          </div>
        </div>
      </section>
    </Container>
  );
}