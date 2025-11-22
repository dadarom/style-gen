# AI风格化图片工具 (StyleGen AI)

一个基于Next.js和React的现代化AI图片风格转换工具，采用Neo-Brutalism设计风格，提供简洁直观的用户体验。

## 项目特点

- **Neo-Brutalism设计风格**：大胆的色彩对比和几何形状
- **模块化组件设计**：清晰的代码结构和可复用组件
- **数据与视图分离**：可配置化的数据结构，便于维护和扩展
- **响应式布局**：适配各种设备尺寸
- **现代化技术栈**：Next.js 16、React 19、TypeScript

## 技术栈

- **前端框架**：Next.js 16
- **UI库**：React 19、Radix UI
- **样式方案**：Tailwind CSS、自定义CSS变量
- **类型系统**：TypeScript
- **构建工具**：Next.js内置
- **测试框架**：（待集成）

## 项目结构

```
ai-stylegen/
├── app/                  # Next.js App Router
│   ├── components/       # 页面级组件
│   └── page.tsx          # 主页
├── components/           # 可复用组件
│   ├── Header.tsx        # 头部导航组件
│   ├── Hero.tsx          # 英雄区域组件
│   ├── Workflow.tsx      # 工作流组件
│   ├── Pricing.tsx       # 价格套餐组件
│   └── Footer.tsx        # 页脚组件
├── data/                 # 配置化数据
│   ├── styles.ts         # 风格选项配置
│   ├── workflow.ts       # 工作流程配置
│   ├── navigation.ts     # 导航链接配置
│   └── pricing.ts        # 价格套餐配置
├── public/               # 静态资源
├── .gitignore            # Git忽略文件
├── next.config.mjs       # Next.js配置
├── package.json          # 项目依赖
└── README.md             # 项目文档
```

## 组件说明

### Header 组件

位于页面顶部的导航组件，包含品牌标识、导航链接和操作按钮。

**配置依赖**：
- 数据来源：`data/navigation.ts` 中的 `NAVIGATION_LINKS`

**主要功能**：
- 响应式导航栏
- 移动端菜单支持
- 品牌标识显示
- 操作按钮（登录/注册）

### Hero 组件

位于首屏的英雄区域组件，展示产品核心价值和行动号召。

**配置依赖**：
- 数据来源：`data/pricing.ts` 中的 `SINGLE_PRICE` 和 `ESTIMATED_TIME`

**主要功能**：
- 产品标题和描述
- 主要行动按钮
- 核心特性卡片展示
- 预计处理时间和价格信息

### Workflow 组件

核心功能组件，实现图片上传、风格选择、生成和下载的完整流程。

**配置依赖**：
- 数据来源：`data/workflow.ts` 中的 `WORKFLOW_STEPS`
- 数据来源：`data/styles.ts` 中的 `STYLES` 和 `CATEGORIES`

**主要功能**：
- 步骤式引导流程
- 图片拖拽/选择上传
- 风格分类和选择
- 实时生成进度显示
- 结果预览和下载

### Pricing 组件

价格套餐展示组件，包含单次生成和不同数量的套餐选项。

**配置依赖**：
- 数据来源：`data/pricing.ts` 中的 `PRICING_PLANS` 和 `SINGLE_PRICE`

**主要功能**：
- 多种套餐选项展示
- 价格对比和优惠信息
- 购买行动按钮

### Footer 组件

页面底部组件，包含导航链接、社交媒体和版权信息。

**配置依赖**：
- 数据来源：`data/navigation.ts` 中的 `FOOTER_LINKS` 和 `SOCIAL_LINKS`
- 数据来源：`data/pricing.ts` 中的 `SINGLE_PRICE`

**主要功能**：
- 页脚导航
- 社交媒体链接
- 版权信息
- 客服联系方式

## 数据配置系统

项目采用集中式数据配置，所有可配置的数据都存放在 `data/` 目录下，便于统一管理和更新。

### styles.ts

定义了所有可用的风格选项，包括：
- 风格分类（艺术风格、摄影风格、电商专用等）
- 每个风格的详细信息（ID、名称、分类、图片路径）

### workflow.ts

定义了工作流程的各个步骤：
- 步骤顺序和逻辑
- 步骤标题和描述

### navigation.ts

定义了网站的所有导航元素：
- 顶部导航链接
- 页脚链接分组
- 社交媒体链接

### pricing.ts

定义了价格策略：
- 单次生成价格
- 各种套餐选项（数量、价格、节省金额）
- 预计处理时间

## 如何运行项目

### 前置要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 安装步骤

1. 克隆项目代码
```bash
git clone <repository-url>
cd ai-stylegen
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

4. 打开浏览器访问
```
http://localhost:3000
```

### 构建生产版本

```bash
npm run build
# 或
yarn build

# 启动生产服务器
npm start
# 或
yarn start
```

## 如何扩展项目

### 添加新的风格选项

1. 编辑 `data/styles.ts` 文件
2. 在 `STYLES` 数组中添加新的风格对象
3. 确保风格对象包含必要的属性：id、name、category、imagePath

### 添加新的导航链接

1. 编辑 `data/navigation.ts` 文件
2. 在相应的数组中添加新的链接对象

### 添加新的价格套餐

1. 编辑 `data/pricing.ts` 文件
2. 在 `PRICING_PLANS` 数组中添加新的套餐对象

### 创建新组件

1. 在 `components/` 目录下创建新的 TypeScript React 组件
2. 确保组件遵循项目的命名和风格规范
3. 在需要使用的地方导入并使用组件

## 设计规范

### 颜色系统

项目使用以下主要颜色：
- 主色调：科技蓝 (#1E40AF)
- 强调色：紫色 (#7C3AED)、粉色 (#EC4899)
- 背景色：深灰 (#111827)、浅灰 (#F3F4F6)
- 文本色：白色 (#FFFFFF)、黑色 (#111827)

### 排版系统

- 标题：Inter 字体，粗体，较大字号
- 正文：Inter 字体，常规，中等字号
- 按钮文本：Inter 字体，半粗体，中等字号

### 间距规范

- 大间距：32px (2rem)
- 中间距：16px (1rem)
- 小间距：8px (0.5rem)
- 紧凑间距：4px (0.25rem)

## 注意事项

- 项目使用 TypeScript，请确保所有代码都有正确的类型定义
- 组件命名使用 PascalCase，文件命名与组件名保持一致
- 数据配置文件使用小写字母加下划线的命名方式
- 样式优先使用 Tailwind CSS，特殊样式使用 CSS 变量
- 确保所有组件都具有响应式设计

## 许可证

MIT License

## 贡献指南

欢迎提交问题和改进建议！请遵循以下步骤：
1. Fork 项目仓库
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 联系方式

如有任何问题，请通过以下方式联系我们：
- 项目主页：[待添加]
- 技术支持：[待添加]
- GitHub：[待添加]

---

*本项目正在持续开发中，文档会定期更新。*