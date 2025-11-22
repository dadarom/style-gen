import React from 'react';
import { cn } from './utils';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
export type TextTracking = 'normal' | 'wide' | 'wider' | 'widest';
export type TextColor = 'foreground' | 'muted' | 'primary' | 'secondary';
export type TextFont = 'inter' | 'mono';

export interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  font?: TextFont;
  uppercase?: boolean;
  tracking?: TextTracking;
  className?: string;
}

/**
 * 文本组件 - 统一的文本样式系统
 */
export const Text: React.FC<TextProps> = ({
  children,
  as = 'span',
  size = 'md',
  weight = 'normal',
  color = 'foreground',
  font = 'inter',
  uppercase = false,
  tracking = 'normal',
  className,
  ...props
}) => {
  // 尺寸样式
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };
  
  // 字重样式
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  // 颜色样式
  const colorClasses = {
    foreground: 'text-foreground',
    muted: 'text-muted-foreground',
    primary: 'text-primary',
    secondary: 'text-secondary',
  };
  
  // 字体样式
  const fontClasses = {
    inter: 'font-sans',
    mono: 'font-mono',
  };
  
  // 跟踪样式
  const trackingClasses = {
    normal: 'tracking-normal',
    wide: 'tracking-wide',
    wider: 'tracking-wider',
    widest: 'tracking-widest',
  };
  
  // 组合类名
  const textClasses = cn(
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    fontClasses[font],
    trackingClasses[tracking],
    uppercase && 'uppercase',
    className
  );
  
  // 创建元素
  const Element = as || 'span';
  
  return (
    <Element className={textClasses} {...props}>
      {children}
    </Element>
  );
};

Text.displayName = 'Text';