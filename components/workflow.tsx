"use client"
// Workflow组件 - 生成图片的工作流程
import React, { useState, useRef, useEffect } from 'react';
import { WORKFLOW_STEPS } from '../data/workflow';
import { STYLES, CATEGORIES } from '../data/styles';
import { Button } from '@/components/ui/button';
import { api, ApiError } from '../lib/api';
import { API_CONFIG } from '../lib/config';
import { DEBUG_CONFIG } from '../lib/config';
import { debug, performanceMonitor, stateTracer } from '../lib/logger';

// 构建正确的图片路径，支持本地和GitHub Pages环境
const getImagePath = (path: string): string => {
  // 确保路径以/开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 检查是否为生产环境（GitHub Pages）
  const isProduction = process.env.NODE_ENV === 'production';
  
  // 生产环境下添加basePath
  if (isProduction) {
    return `/style-gen${normalizedPath}`;
  }
  
  return normalizedPath;
}

export function Workflow() {
  // 状态管理
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // 添加进度状态
  const [error, setError] = useState<string | null>(null); // 添加错误状态
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const generationStartTimeRef = useRef<number | null>(null); // 记录生成开始时间，用于计算已用时间
  const stepContentRef = useRef<HTMLDivElement>(null); // 步骤内容的引用，用于滚动定位
  
  // 计算已用时间
  const getElapsedTime = () => {
    if (!generationStartTimeRef.current) return 0;
    return Math.floor((Date.now() - generationStartTimeRef.current) / 1000);
  };

  // 组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // 过滤风格
  const filteredStyles = selectedCategory === '全部'
    ? STYLES
    : STYLES.filter(style => style.category === selectedCategory);

  // 处理图片上传
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理拖放
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // 生成图片 - 同步调用模式
  const generateImage = async () => {
    if (!uploadedImage || !selectedStyle) return;
    
    // 记录状态更新
    stateTracer.trace('Workflow', 'loading', false, true);
    
    // 开始性能监控
    performanceMonitor.startTime('generateImage');
    
    if (DEBUG_CONFIG.IS_DEBUG_MODE) {
      debug('开始图片生成流程', { uploadedImage: !!uploadedImage, selectedStyle }, 'workflow');
    }
    
    setLoading(true);
    setProgress(0);
    setError(null);
    setGeneratedImage(null); // 清除之前的生成结果
    
    // 清除现有的进度更新定时器
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    
    // 开始计时
    generationStartTimeRef.current = Date.now();
    
    // 模拟进度更新（每600ms更新一次，保持UI等待效果）
    progressIntervalRef.current = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 600);
    
    try {
      console.log('开始风格转换任务...');
      
      // 直接调用transformStyle函数进行同步风格转换
      // 根据官方文档，预计完成时间在5秒以内
      const response = await api.transformStyle(uploadedImage, selectedStyle);
      
      console.log(`图片生成完成，响应时间: ${response.responseTime}ms`);
      
      // 设置生成的图片
      if (response.success && response.generatedImage) {
        setGeneratedImage(response.generatedImage);
      } else {
        throw new Error(response.message || '未获取到生成的图片');
      }
    } catch (err) {
      console.error('图片生成失败:', err);
      if (err instanceof ApiError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || '生成图片时发生错误，请稍后重试');
      } else {
        setError('生成图片时发生错误，请稍后重试');
      }
    } finally {
      // 结束性能监控并记录
      performanceMonitor.endTime('generateImage');
      
      // 记录状态更新
      stateTracer.trace('Workflow', 'loading', true, false);
      stateTracer.trace('Workflow', 'progress', progress, 100);
      
      // 清除所有定时器
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      if (DEBUG_CONFIG.IS_DEBUG_MODE) {
        debug('图片生成流程完成', { 
          success: !error, 
          generatedImageExists: !!generatedImage,
          progress: 100 
        }, 'workflow');
      }
      
      setProgress(100);
      setLoading(false);
      setStep(4);
    }
  };

  // 步骤内容渲染
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase">上传您的图片</h3>
            <div 
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-background/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />
              {uploadedImage ? (
                <img 
                  src={uploadedImage} 
                  alt="上传的图片" 
                  className="max-h-64 mx-auto object-contain border border-border"
                />
              ) : (
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </div>
                  <p className="text-sm font-mono uppercase tracking-wide">拖拽文件到此处或点击上传</p>
                  <p className="text-xs text-muted-foreground">支持 JPG, PNG, WEBP 格式</p>
                </div>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase">选择风格</h3>
            
            <div className="flex overflow-x-auto pb-2 gap-2 border-b border-border mb-6">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  className={`px-4 py-2 whitespace-nowrap font-mono text-sm uppercase transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredStyles.map(style => (
                <div
                  key={style.id}
                  className={`aspect-square border-2 ${selectedStyle === style.id ? 'border-primary bg-primary/10' : 'border-border'} cursor-pointer overflow-hidden hover:opacity-90 transition-all hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)] hover:-translate-y-1 hover:border-primary`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <div className="w-full h-full relative">
                    <img 
                      src={getImagePath(style.img)} 
                      alt={style.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm p-2">
                      <p className="text-xs font-bold font-mono uppercase hover:text-primary transition-colors">{style.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase">正在生成...</h3>
            
            <div className="bg-background border-2 border-border p-8 text-center">
              {loading ? (
                <div className="space-y-6">
                  <div className="w-32 h-32 mx-auto relative">
                    <svg className="animate-spin -ml-1 mr-3 h-32 w-32 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div className="w-full bg-background border-2 border-border h-2 mb-2">
                    <div 
                      className="bg-primary h-full transition-all duration-500 ease-out" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wide">
                    {generationStartTimeRef.current && (
                      <>
                        已用时: {getElapsedTime()}秒 / 预计用时: 60秒
                      </>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">正在进行风格迁移，请稍候...</p>
                  {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-4 border border-red-200">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <p className="text-muted-foreground">点击开始生成按钮开始处理</p>
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold uppercase">
              {error ? '生成失败' : '生成完成'}
            </h3>
            
            {error ? (
              <div className="bg-red-50 border-2 border-red-200 p-6 rounded-md">
                <p className="text-red-500 font-mono mb-4">错误信息: {error}</p>
                <p className="text-sm text-muted-foreground mb-4">请检查您的API密钥是否正确，或稍后再试。</p>
                <Button
                  data-slot="button"
                  onClick={() => {
                    setError(null);
                    setGeneratedImage(null);
                    setProgress(0);
                    setStep(3);
                    generateImage();
                  }}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-9 px-4 py-2 has-[>svg]:px-3 rounded-none bg-primary text-primary-foreground font-mono uppercase tracking-wider hover:bg-primary/90"
                >
                  重试
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border-2 border-border overflow-hidden">
                  <div className="bg-background/80 p-2 border-b border-border">
                    <p className="text-xs font-mono font-bold uppercase">原始图片</p>
                  </div>
                  {uploadedImage && (
                    <img 
                      src={uploadedImage} 
                      alt="原始图片" 
                      className="w-full aspect-square object-contain bg-background"
                    />
                  )}
                </div>
                
                <div className="border-2 border-border overflow-hidden">
                  <div className="bg-background/80 p-2 border-b border-border">
                    <p className="text-xs font-mono font-bold uppercase">生成图片</p>
                  </div>
                  {generatedImage ? (
                    <img 
                      src={generatedImage} 
                      alt="生成的图片" 
                      className="w-full aspect-square object-contain bg-background"
                    />
                  ) : (
                    <div className="w-full aspect-square bg-background/50 flex items-center justify-center">
                      <p className="text-muted-foreground">生成的图片将显示在这里</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // 处理下一步
  const handleNext = () => {
    if (step === 1 && uploadedImage) {
      // 记录状态更新
      stateTracer.trace('Workflow', 'step', step, 2);
      setStep(2);
    } else if (step === 2 && selectedStyle) {
      // 记录状态更新
      stateTracer.trace('Workflow', 'step', step, 3);
      setStep(3);
      generateImage();
      // 等待状态更新后滚动到加载区域
      setTimeout(() => {
        if (stepContentRef.current) {
          stepContentRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    } else if (step === 3 && generatedImage) {
      // 记录状态更新
      stateTracer.trace('Workflow', 'step', step, 4);
      setStep(4);
    }
  };

  // 处理上一步
  const handlePrevious = () => {
    if (step > 1) {
      // 记录状态更新
      stateTracer.trace('Workflow', 'step', step, step - 1);
      setStep(step - 1);
    }
  };

  // 下载图片功能
  const handleDownloadImage = async () => {
    if (!generatedImage) return;
    
    try {
      // 为下载的图片生成文件名
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const styleName = selectedStyle || 'unknown-style';
      const filename = `ai-stylegen-${styleName}-${timestamp}.jpg`;
      
      // 如果是本地路径或演示模式的图片，直接下载
      if (generatedImage.startsWith('/')) {
        const downloadLink = document.createElement('a');
        downloadLink.href = generatedImage;
        downloadLink.download = filename;
        downloadLink.click();
        return;
      }
      
      // 对于远程URL，使用带超时控制的fetch请求
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15秒超时
      
      try {
        // 添加CORS支持和超时控制
        const response = await fetch(generatedImage, {
          signal: controller.signal,
          credentials: 'include', // 包含凭证以支持跨域
          headers: {
            'Accept': 'image/*'
          }
        });
        
        clearTimeout(timeoutId); // 清除超时定时器
        
        if (!response.ok) {
          throw new Error(`下载图片失败: HTTP状态码 ${response.status} - ${response.statusText}`);
        }
        
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        
        const downloadLink = document.createElement('a');
        downloadLink.href = objectUrl;
        downloadLink.download = filename;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        
        // 清理资源
        try {
          document.body.removeChild(downloadLink);
        } catch (e) {
          // 忽略DOM操作错误
        }
        
        // 延迟清理以确保下载完成
        setTimeout(() => {
          try {
            URL.revokeObjectURL(objectUrl);
          } catch (e) {
            // 忽略资源清理错误
          }
        }, 1000);
        
        console.log(`图片已下载: ${filename}`);
      } catch (fetchError: any) {
        clearTimeout(timeoutId); // 清理超时定时器
        
        // 处理超时错误
        if (fetchError.name === 'AbortError') {
          throw new Error('下载图片超时，请稍后重试');
        }
        
        // 网络错误时尝试直接下载
        if (fetchError.message.includes('Failed to fetch')) {
          console.warn('网络错误，尝试直接下载...');
          const directLink = document.createElement('a');
          directLink.href = generatedImage;
          directLink.download = filename;
          directLink.click();
          return;
        }
        
        // 重新抛出其他错误
        throw fetchError;
      }
    } catch (err: any) {
      console.error('下载图片失败:', err);
      // 显示用户友好的错误提示
      window.alert(`下载失败: ${err.message || '未知错误'}。请检查网络连接或稍后重试。`);
    }
  };
  
  // 重置生成
  const handleReset = () => {
    setStep(1);
    setUploadedImage(null);
    setSelectedCategory('全部');
    setSelectedStyle(null);
    setGeneratedImage(null);
    setProgress(0);
    setError(null);
    generationStartTimeRef.current = null;
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  return (
    <section id="generator" className="py-16 px-4 bg-background/50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center mt-10">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-6">
            <span className="text-primary">AI</span> 风格生成器
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            简单几步，将您的照片转换为专业级艺术作品。支持多种风格选择，高质量输出。
          </p>
        </div>

        {/* 步骤指示器 */}
        <div className="mb-10">
          <div className="flex justify-between items-center relative">
            {WORKFLOW_STEPS.map((workflowStep) => (
              <React.Fragment key={workflowStep.id}>
                <div 
                  className={`flex flex-col items-center relative z-10 ${step >= workflowStep.id ? 'text-primary' : 'text-muted-foreground'} hover:shadow-sm transition-all`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 font-bold font-mono ${step >= workflowStep.id ? 'bg-primary text-primary-foreground' : 'bg-background border border-border'} transition-all hover:scale-105`}>
                    {workflowStep.id}
                  </div>
                  <p className="text-xs md:text-sm font-mono uppercase font-bold">
                    {workflowStep.title}
                  </p>
                </div>
                
                {workflowStep.id < WORKFLOW_STEPS.length && (
                  <div className={`h-1 flex-grow mx-2 ${step > workflowStep.id ? 'bg-primary' : 'bg-border'}`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 步骤内容 */}
        <div 
          ref={stepContentRef}
          className="bg-background border-2 border-border p-6 md:p-8 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]"
        >
          {renderStepContent()}
        </div>

        {/* 控制按钮 */}
        <div className="flex justify-between">
          {step > 1 && (
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={step === 1}
              className="rounded-none border-2 border-border font-mono uppercase hover:text-primary transition-colors"
            >
              上一步
            </Button>
          )}
          
          <div className="flex gap-4">
            {step === 4 && (
              <Button
                variant="outline"
                onClick={handleReset}
                className="rounded-none border-2 border-border font-mono uppercase hover:text-primary transition-colors"
              >
                重新生成
              </Button>
            )}
            
            {step < 4 ? (
              <Button
                onClick={handleNext}
                disabled={
                  (step === 1 && !uploadedImage) ||
                  (step === 2 && !selectedStyle) ||
                  loading
                }
                className="rounded-none bg-primary text-primary-foreground font-mono uppercase tracking-wider hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                {step === 3 ? '开始生成' : '下一步'}
              </Button>
            ) : generatedImage && (
              <Button
                onClick={handleDownloadImage}
                className="rounded-none bg-primary text-primary-foreground font-mono uppercase tracking-wider hover:bg-primary/90 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
              >
                下载图片
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
