// 原子组件工具函数和tokens引用
import * as designTokens from './designTokens';

// 导出设计tokens
export const tokens = designTokens;

/**
 * 合并类名的辅助函数
 */
export const cn = (...classes: (string | false | null | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

/**
 * 生成CSS变量的辅助函数
 */
export const getCSSVar = (varName: string): string => {
  return `var(--${varName})`;
};

/**
 * 计算响应式断点
 */
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * 获取响应式类名
 */
export const responsive = {
  sm: (className: string) => `sm:${className}`,
  md: (className: string) => `md:${className}`,
  lg: (className: string) => `lg:${className}`,
  xl: (className: string) => `xl:${className}`,
  '2xl': (className: string) => `2xl:${className}`,
};