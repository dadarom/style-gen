// 设计Tokens - 提取自现有代码的颜色、字体、间距等设计变量

// 颜色变量 - Warm Neo-Brutalism 风格
export const colors = {
  // 背景和前景色
  background: '#ffffff',
  foreground: '#000000',
  'muted-foreground': '#666666',
  border: '#e5e5e5',
  
  // 主色调
  primary: '#ff5a5f',
  'primary-foreground': '#ffffff',
  
  // 卡片样式
  card: '#ffffff',
  'card-foreground': '#000000',
  
  // 深色模式颜色
  dark: {
    background: '#111111',
    foreground: '#ffffff',
    'muted-foreground': '#999999',
    border: '#333333',
    primary: '#ff5a5f',
    'primary-foreground': '#ffffff',
    card: '#222222',
    'card-foreground': '#ffffff',
  }
};

// 字体变量
export const fonts = {
  // 主要字体
  inter: 'Inter, sans-serif',
  mono: 'JetBrains Mono, monospace',
  
  // 字体粗细
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
  
  // 字体大小
  sizes: {
    xs: '10px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
    '5xl': '48px',
    '6xl': '60px',
    '7xl': '72px',
    '8xl': '90px',
  },
  
  // 行高
  leading: {
    tight: '0.9',
    normal: '1.5',
    relaxed: '1.75',
  },
  
  // 字母间距
  tracking: {
    normal: '0',
    wide: '0.05em',
    wider: '0.1em',
    widest: '0.25em',
  },
};

// 间距变量
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
  '5xl': '128px',
};

// 边框变量
export const borders = {
  width: {
    0: '0px',
    1: '1px',
    2: '2px',
    3: '3px',
    4: '4px',
  },
  radius: {
    none: '0px',
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
};

// 阴影变量
export const shadows = {
  sm: '4px 4px 0px 0px rgba(0, 0, 0, 0.2)',
  md: '6px 6px 0px 0px rgba(0, 0, 0, 0.2)',
  lg: '8px 8px 0px 0px rgba(0, 0, 0, 0.1)',
  xl: '12px 12px 0px 0px rgba(0, 0, 0, 0.1)',
};

// 过渡效果
export const transitions = {
  duration: {
    fast: '0.15s',
    normal: '0.25s',
    slow: '0.35s',
  },
  timing: {
    ease: 'ease',
    'ease-in': 'ease-in',
    'ease-out': 'ease-out',
    'ease-in-out': 'ease-in-out',
  },
};

// 工具类 - 基于tokens的CSS类名生成器
export const tokenUtils = {
  // 颜色类
  color: (color: string) => `text-${color}`,
  bgColor: (color: string) => `bg-${color}`,
  borderColor: (color: string) => `border-${color}`,
  
  // 字体类
  fontFamily: (font: string) => `font-${font}`,
  fontSize: (size: string) => `text-${size}`,
  fontWeight: (weight: string) => `font-${weight}`,
  
  // 间距类
  padding: (size: string) => `p-${size}`,
  margin: (size: string) => `m-${size}`,
  
  // 边框类
  borderWidth: (width: string) => `border-${width}`,
  borderRadius: (radius: string) => `rounded-${radius}`,
  
  // 阴影类
  shadow: (size: string) => `shadow-${size}`,
  
  // 过渡类
  transition: (duration: string, timing: string = 'ease') => `transition-all duration-${duration} ${timing}`,
};

// 导出完整的设计tokens
export default {
  colors,
  fonts,
  spacing,
  borders,
  shadows,
  transitions,
  utils: tokenUtils,
};