import React from 'react';
import { cn } from './utils';

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type HeadingWeight = 'normal' | 'medium' | 'semibold' | 'bold' | 'black';
export type HeadingTracking = 'normal' | 'tight' | 'tighter';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
  uppercase?: boolean;
  tracking?: HeadingTracking;
  className?: string;
}

/**
 * 标题组件 - 统一的标题样式系统
 */
export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 'h2',
  size = 'lg',
  weight = 'bold',
  uppercase = false,
  tracking = 'normal',
  className,
  ...props
}) => {
  // 尺寸样式
  const sizeClasses = {
    xs: 'text-xl',
    sm: 'text-2xl',
    md: 'text-3xl',
    lg: 'text-4xl',
    xl: 'text-5xl',
    '2xl': 'text-6xl',
    '3xl': 'text-8xl',
  };
  
  // 字重样式
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
    black: 'font-black',
  };
  
  // 跟踪样式
  const trackingClasses = {
    normal: 'tracking-normal',
    tight: 'tracking-tight',
    tighter: 'tracking-tighter',
  };
  
  // 组合类名
  const headingClasses = cn(
    sizeClasses[size],
    weightClasses[weight],
    trackingClasses[tracking],
    uppercase && 'uppercase',
    className
  );
  
  // 根据level动态创建元素
  const Element = level as React.ElementType;
  
  return (
    <Element className={headingClasses} {...props}>
      {children}
    </Element>
  );
};

Heading.displayName = 'Heading';