# StyleGen.AI 设计系统文档

## 设计理念

StyleGen.AI 设计系统基于 **Warm Neo-Brutalism** 风格，特点是：
- 无圆角、粗体、高对比度
- 强烈的色彩对比，主色调为鲜艳的红色
- 大胆的排版，使用大写文本和等宽字体
- 清晰的边界和几何形状
- 交互上使用微妙的阴影和位移效果

## 设计Tokens

设计Tokens是设计系统的基础，定义了所有可复用的设计变量。

### 颜色系统

```typescript
// 主色调
export const colors = {
  background: '#ffffff',
  foreground: '#000000',
  primary: '#ff5a5f',
  // ... 其他颜色
};
```

### 字体系统

支持 Inter 和 Mono 两种字体，定义了不同的字号、字重和字间距。

### 间距系统

标准化的间距单位，从 xs 到 5xl，确保布局的一致性。

### 边框和阴影

定义了统一的边框宽度、圆角和阴影样式。

## 原子组件使用指南

### Button 按钮

```tsx
import { Button } from '@/components/atom';

// 默认按钮
<Button>提交</Button>

// 轮廓按钮
<Button variant="outline">取消</Button>

// 次要按钮
<Button variant="secondary">删除</Button>

// 不同尺寸
<Button size="sm">小号</Button>
<Button size="lg">大号</Button>

// 全宽按钮
<Button fullWidth>全宽按钮</Button>
```

### Heading 标题

```tsx
import { Heading } from '@/components/atom';

// 不同级别的标题
<Heading level="h1">主标题</Heading>
<Heading level="h2">副标题</Heading>
<Heading level="h3">小标题</Heading>

// 不同尺寸
<Heading level="h2" size="xl">大尺寸标题</Heading>
<Heading level="h2" size="sm">小尺寸标题</Heading>

// 大写标题
<Heading level="h2" uppercase>大写标题</Heading>
```

### Text 文本

```tsx
import { Text } from '@/components/atom';

// 基本使用
<Text>普通文本</Text>

// 段落形式
<Text as="p">这是一个段落文本</Text>

// 不同颜色
<Text color="primary">主色文本</Text>
<Text color="muted">次要文本</Text>

// 等宽字体
<Text font="mono">等宽字体文本</Text>

// 大写文本
<Text uppercase>大写文本</Text>
```

### Link 链接

```tsx
import { Link } from '@/components/atom';

// 基本链接
<Link href="/about">关于我们</Link>

// 加粗链接
<Link href="/contact" weight="bold">联系我们</Link>

// 无下划线
<Link href="/faq" underline={false}>常见问题</Link>
```

### Card 卡片

```tsx
import { Card, CardContent, CardTitle } from '@/components/atom';

<Card>
  <CardContent>
    <CardTitle>卡片标题</CardTitle>
    <p>卡片内容描述...</p>
  </CardContent>
</Card>

// 带阴影的卡片
<Card shadow={true}>
  <CardContent>
    <CardTitle>带阴影的卡片</CardTitle>
  </CardContent>
</Card>
```

### Container 容器

```tsx
import { Container } from '@/components/atom';

// 默认容器（最大宽度6xl）
<Container>
  <p>内容区域</p>
</Container>

// 小尺寸容器
<Container size="sm">
  <p>小尺寸内容区域</p>
</Container>
```

## 最佳实践

### 组件导入

始终从 `@/components/atom` 导入组件，确保使用最新版本：

```tsx
import { Button, Heading, Text } from '@/components/atom';
```

### 样式覆盖

避免直接修改组件的基础样式。如需要，可以通过传入 `className` 进行微调，但不要破坏组件的核心特性。

### 响应式设计

使用 Tailwind 的响应式前缀处理不同屏幕尺寸的样式：

```tsx
<Card className="md:p-8">
  {/* 在中等屏幕上使用更大的内边距 */}
</Card>
```

## 组件展示

您可以访问 `/playground` 路径查看所有组件的展示和用法示例。

## 设计规范更新记录

### v1.0.0
- 初始版本
- 实现了基础原子组件
- 定义了设计Tokens系统
- 创建了组件展示playground

## 贡献指南

如需扩展设计系统，请遵循以下原则：
1. 保持风格一致性
2. 优先使用现有的设计Tokens
3. 组件命名清晰，功能单一
4. 提供完整的文档和示例