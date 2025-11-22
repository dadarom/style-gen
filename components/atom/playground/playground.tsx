'use client';
import React from 'react';
import {
  Button,
  Heading,
  Text,
  Card,
  CardContent,
  CardTitle,
  Container,
  Link,
} from '../index';

/**
 * 组件Playground - 展示所有原子组件
 */
export const Playground: React.FC = () => {
  return (
    <div className="py-12 px-4 bg-background">
      <Container>
        <Heading level="h1" size="2xl" weight="black" className="mb-12 text-center">
          原子组件展示<br />
          <span className="text-primary">Design System</span>
        </Heading>
        
        {/* Button组件展示 */}
        <Section title="Button 按钮组件">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ComponentCard title="默认按钮">
              <Button>默认按钮</Button>
            </ComponentCard>
            <ComponentCard title="轮廓按钮">
              <Button variant="outline">轮廓按钮</Button>
            </ComponentCard>
            <ComponentCard title="幽灵按钮">
              <Button variant="ghost">幽灵按钮</Button>
            </ComponentCard>
            <ComponentCard title="次要按钮">
              <Button variant="secondary">次要按钮</Button>
            </ComponentCard>
            <ComponentCard title="小号按钮">
              <Button size="sm">小号按钮</Button>
            </ComponentCard>
            <ComponentCard title="中号按钮">
              <Button size="md">中号按钮</Button>
            </ComponentCard>
            <ComponentCard title="大号按钮">
              <Button size="lg">大号按钮</Button>
            </ComponentCard>
            <ComponentCard title="全宽按钮">
              <Button fullWidth>全宽按钮</Button>
            </ComponentCard>
          </div>
        </Section>
        
        {/* Heading组件展示 */}
        <Section title="Heading 标题组件">
          <div className="grid grid-cols-1 gap-4">
            <ComponentCard title="H1标题">
              <Heading level="h1" size="3xl" weight="black">H1 标题</Heading>
            </ComponentCard>
            <ComponentCard title="H2标题">
              <Heading level="h2" size="2xl" weight="bold">H2 标题</Heading>
            </ComponentCard>
            <ComponentCard title="H3标题">
              <Heading level="h3" size="xl" weight="semibold">H3 标题</Heading>
            </ComponentCard>
            <ComponentCard title="H4标题">
              <Heading level="h4" size="lg" weight="medium">H4 标题</Heading>
            </ComponentCard>
            <ComponentCard title="大写标题">
              <Heading level="h2" size="lg" weight="bold" uppercase>大写标题</Heading>
            </ComponentCard>
          </div>
        </Section>
        
        {/* Text组件展示 */}
        <Section title="Text 文本组件">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComponentCard title="普通文本">
              <Text>普通文本内容</Text>
            </ComponentCard>
            <ComponentCard title="Mono字体">
              <Text font="mono">Mono字体文本</Text>
            </ComponentCard>
            <ComponentCard title="小号文本">
              <Text size="sm">小号文本内容</Text>
            </ComponentCard>
            <ComponentCard title="大号文本">
              <Text size="lg">大号文本内容</Text>
            </ComponentCard>
            <ComponentCard title="主色文本">
              <Text color="primary">主色文本内容</Text>
            </ComponentCard>
            <ComponentCard title="次要文本">
              <Text color="muted">次要文本内容</Text>
            </ComponentCard>
            <ComponentCard title="加粗文本">
              <Text weight="bold">加粗文本内容</Text>
            </ComponentCard>
            <ComponentCard title="大写文本">
              <Text uppercase>大写文本内容</Text>
            </ComponentCard>
          </div>
        </Section>
        
        {/* Link组件展示 */}
        <Section title="Link 链接组件">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ComponentCard title="默认链接">
              <Link href="#">默认链接</Link>
            </ComponentCard>
            <ComponentCard title="无下划线链接">
              <Link href="#" underline={false}>无下划线链接</Link>
            </ComponentCard>
            <ComponentCard title="加粗链接">
              <Link href="#" weight="bold">加粗链接</Link>
            </ComponentCard>
            <ComponentCard title="主色链接">
              <Link href="#" hoverColor="primary">主色链接</Link>
            </ComponentCard>
          </div>
        </Section>
        
        {/* Card组件展示 */}
        <Section title="Card 卡片组件">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ComponentCard title="默认卡片">
              <Card className="h-full">
                <CardContent>
                  <CardTitle>默认卡片</CardTitle>
                  <Text className="mt-2">这是一个默认的卡片组件示例</Text>
                </CardContent>
              </Card>
            </ComponentCard>
            <ComponentCard title="带边框卡片">
              <Card border={true} borderWidth="2" className="h-full">
                <CardContent>
                  <CardTitle>带边框卡片</CardTitle>
                  <Text className="mt-2">这是一个带边框的卡片组件示例</Text>
                </CardContent>
              </Card>
            </ComponentCard>
            <ComponentCard title="带阴影卡片">
              <Card shadow={true} className="h-full">
                <CardContent>
                  <CardTitle>带阴影卡片</CardTitle>
                  <Text className="mt-2">这是一个带阴影的卡片组件示例</Text>
                </CardContent>
              </Card>
            </ComponentCard>
          </div>
        </Section>
      </Container>
    </div>
  );
};

// 部分组件
interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="mb-16">
      <Heading level="h2" size="lg" className="mb-6 pb-2 border-b border-border">
        {title}
      </Heading>
      <div className="pl-2">{children}</div>
    </div>
  );
};

// 组件卡片
interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({ title, children }) => {
  return (
    <Card className="p-4">
      <Text size="sm" weight="medium" className="mb-3 font-mono">{title}</Text>
      <div className="flex items-center justify-center py-4 min-h-[60px]">
        {children}
      </div>
    </Card>
  );
};