import React from 'react';
import { cn } from './utils';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  className?: string;
}

/**
 * 容器组件 - 统一的页面布局容器
 */
export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  className,
  ...props
}) => {
  // 尺寸样式
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
  };
  
  // 基础样式
  const baseClasses = 'mx-auto px-4 sm:px-6 lg:px-8';
  
  // 组合类名
  const containerClasses = cn(
    baseClasses,
    sizeClasses[size],
    className
  );
  
  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

Container.displayName = 'Container';