'use client';
import React from 'react';
import { Button as RadixButton } from '@/components/ui/button';
// 导入cn工具函数（如果需要）
// import { cn } from './utils';

export type ButtonVariant = 'default' | 'outline' | 'ghost' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  uppercase?: boolean;
  tracking?: 'normal' | 'wide' | 'wider';
  font?: 'default' | 'mono';
}

/**
 * 按钮组件 - 遵循Warm Neo-Brutalism设计风格
 * 特点：无边角、粗体、大写文本、悬停效果
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'default',
  size = 'md',
  fullWidth = false,
  uppercase = false,
  tracking = 'normal',
  font = 'default',
  className,
  ...props
}) => {
  // 变体样式
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90 border-2 border-transparent',
    outline: 'bg-transparent border-2 border-border hover:bg-foreground hover:text-background',
    ghost: 'bg-transparent border-transparent hover:bg-primary/10 text-primary',
    secondary: 'bg-foreground text-background hover:bg-foreground/90 border-2 border-transparent',
  };
  
  // 尺寸样式
  const sizeClasses = {
    sm: 'h-8 text-xs px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-14 text-lg px-8',
  };
  
  // 跟踪样式
  const trackingClasses = {
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
  };
  
  // 字体样式
  const fontClasses = font === 'mono' ? 'font-mono' : 'font-sans';
  
  // 组合类名
  const buttonClasses = [
    'font-bold',
    fontClasses,
    uppercase && 'uppercase',
    trackingClasses[tracking],
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && 'w-full',
    // 通用样式
    'rounded-none',
    'transition-all',
    'hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]',
    'hover:-translate-y-1',
    className,
  ].filter(Boolean).join(' ');
  
  return (
    <RadixButton 
      className={buttonClasses}
      {...props}
    >
      {children}
    </RadixButton>
  );
};

Button.displayName = 'Button';