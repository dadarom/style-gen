'use client';
import React, { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useRouter } from 'next/navigation';

export default function AuthForm() {
  const [apiKey, setApiKey] = useState('');
  const [formVisible, setFormVisible] = useState(true);
  const { verifyApiKey, status } = useAuth();
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 修改验证逻辑：sk开头的任意字符串
      if (apiKey.trim() && apiKey.trim().startsWith('sk')) {
        const success = await verifyApiKey(apiKey);
        
        if (success) {
        // 验证成功后跳转到首页
        router.push('/');
      }
      }
    } catch (error) {
      console.error('验证失败:', error);
    }
  };
  
  const handleCancel = () => {
    // 取消按钮点击后返回主页，保持未登录状态
    router.push('/');
  };
  
  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="rounded-md -space-y-px">
        <div>
        <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
          请输入您的 StyleGen API_Key 以解锁<span className="text-orange-500">智能</span>风格转换引擎
        </label>
          <input
            id="apiKey"
            name="apiKey"
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
            placeholder="API_KEY..."
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          type="submit"
          disabled={status === 'VERIFYING' || !apiKey.trim() || !apiKey.trim().startsWith('sk')}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70"
        >
          验证 / VERIFY
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          取消 / CANCEL
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
        {apiKey.trim() && !apiKey.trim().startsWith('sk') && (
          <div className="text-sm text-gray-500">
            API_KEY错误
          </div>
        )}
        <a
          href="#"
          className="text-sm text-orange-500 hover:text-orange-600 font-medium"
        >
          获取 API_KEY →
        </a>
      </div>
    </form>
  );
}