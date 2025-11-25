'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { X } from 'lucide-react';
import { Button } from '../atom/Button';
import { Text } from '../atom/Text';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Link } from '../atom/Link';

export default function AuthForm() {
  const [apiKey, setApiKey] = useState('');
  const { verifyApiKey, status, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  
  // 重置表单当模态框打开时
  useEffect(() => {
    if (isLoginModalOpen) {
      setApiKey('');
    }
  }, [isLoginModalOpen]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 统一验证逻辑：检查是否以sk-或sk:开头
      if (apiKey.trim() && (apiKey.trim().startsWith('sk-') || apiKey.trim().startsWith('sk:'))) {
        const success = await verifyApiKey(apiKey);
        
        if (success) {
          // 验证成功后自动关闭登录框
          setIsLoginModalOpen(false);
        }
      }
    } catch (error) {
      console.error('验证失败:', error);
    }
  };
  
  const handleCancel = () => {
    // 取消按钮点击后关闭模态框
    setIsLoginModalOpen(false);
  };
  
  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
      <DialogContent className="max-w-md mx-auto rounded-lg shadow-xl overflow-hidden p-0" showCloseButton={false}>
        <div className="relative">
          <button 
            onClick={handleCancel} 
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10"
          >
            <X size={20} />
          </button>
        
          <div className="p-6">
            <DialogTitle className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              StyleGen<span className="text-orange-500">.AI</span>
            </DialogTitle>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  请输入您的 StyleGen API_KEY，以解锁<span className="text-orange-500">智能</span>风格转换引擎
                </Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                  placeholder="API_KEY..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="submit"
                  disabled={status === 'VERIFYING' || !apiKey.trim() || !(apiKey.trim().startsWith('sk-') || apiKey.trim().startsWith('sk:'))}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70"
                >
                  验证 / VERIFY
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white hover:bg-white dark:bg-gray-800 dark:hover:bg-gray-800 hover:text-orange-500 dark:hover:text-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  取消 / CANCEL
                </Button>
              </div>

              <div className="flex justify-between items-center mt-2 mb-4">
                {apiKey.trim() && !(apiKey.trim().startsWith('sk-') || apiKey.trim().startsWith('sk:')) && (
                  <Text className="text-sm text-red-500 dark:text-red-400">
                    API_KEY格式错误
                  </Text>
                )}
                <Link
                  href="#"
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium ml-auto"
                >
                  获取 API_KEY →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}