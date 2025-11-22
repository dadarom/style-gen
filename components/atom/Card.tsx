import React from 'react';
import { cn } from './utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: boolean;
  borderWidth?: '1' | '2';
  shadow?: boolean;
  shadowSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * 卡片组件 - 内容块容器
 */
export const Card: React.FC<CardProps> = ({
  children,
  border = true,
  borderWidth = '2',
  shadow = false,
  shadowSize = 'md',
  className,
  ...props
}) => {
  // 基础样式
  const baseClasses = 'bg-card text-card-foreground';
  
  // 边框样式
  const borderClasses = border 
    ? `border-${borderWidth} border-border` 
    : 'border-0';
  
  // 阴影样式
  const shadowClasses = shadow 
    ? `shadow-${shadowSize === 'sm' ? 'sm' : shadowSize === 'md' ? 'md' : 'lg'}` 
    : '';
  
  // 组合类名
  const cardClasses = cn(
    baseClasses,
    borderClasses,
    shadowClasses,
    className
  );
  
  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

Card.displayName = 'Card';

/**
 * 卡片内容组件
 */
export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('p-6', className)} {...props}>
      {children}
    </div>
  );
};

CardContent.displayName = 'CardContent';

/**
 * 卡片标题组件
 */
export const CardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('text-lg font-bold mb-2', className)} {...props}>
      {children}
    </div>
  );
};

CardTitle.displayName = 'CardTitle';