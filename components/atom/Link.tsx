import React from 'react';
import NextLink from 'next/link';
import { cn } from './utils';

export interface LinkProps extends React.ComponentProps<typeof NextLink> {
  underline?: boolean;
  hoverColor?: 'primary' | 'foreground';
  weight?: 'normal' | 'medium' | 'bold';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  font?: 'default' | 'mono';
  className?: string;
}

/**
 * 链接组件 - 统一的链接样式系统
 */
export const Link: React.FC<LinkProps> = ({
  children,
  underline = true,
  hoverColor = 'primary',
  weight = 'normal',
  size = 'md',
  font = 'default',
  className,
  ...props
}) => {
  // 基础样式
  const baseClasses = 'transition-colors';
  
  // 下划线样式
  const underlineClasses = underline 
    ? 'hover:underline decoration-2 underline-offset-4' 
    : '';
  
  // 悬停颜色
  const hoverColorClasses = hoverColor === 'primary' 
    ? 'hover:text-primary' 
    : 'hover:text-foreground';
  
  // 字重样式
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    bold: 'font-bold',
  };
  
  // 尺寸样式
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  // 字体样式
  const fontClasses = font === 'mono' ? 'font-mono' : 'font-sans';
  
  // 组合类名
  const linkClasses = cn(
    baseClasses,
    underlineClasses,
    hoverColorClasses,
    weightClasses[weight],
    sizeClasses[size],
    fontClasses,
    className
  );
  
  return (
    <NextLink className={linkClasses} {...props}>
      {children}
    </NextLink>
  );
};

Link.displayName = 'Link';