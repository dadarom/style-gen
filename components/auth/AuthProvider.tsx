'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  apiKey: string | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  status: 'WAITING' | 'VERIFYING' | 'SUCCESS' | 'ERROR';
  verifyApiKey: (key: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [status, setStatus] = useState<'WAITING' | 'VERIFYING' | 'SUCCESS' | 'ERROR'>('WAITING');

  // 从localStorage加载API_KEY
  useEffect(() => {
    const savedApiKey = localStorage.getItem('stylegen_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsAuthenticated(true);
    }
  }, []);

  const verifyApiKey = async (key: string): Promise<boolean> => {
    setStatus('VERIFYING');
    
    try {
      // 检查是否以sk-或sk:开头
      if (key.startsWith('sk-') || key.startsWith('sk:')) {
        // 处理前缀：如果以sk:开头，则去除前缀
        const processedKey = key.startsWith('sk:') ? key.slice(3) : key;
        
        setApiKey(processedKey);
        setIsAuthenticated(true);
        setStatus('SUCCESS');
        // 保存到localStorage（存储去除前缀后的密钥）
        localStorage.setItem('stylegen_api_key', processedKey);
        return true;
      } else {
        setStatus('ERROR');
        return false;
      }
    } catch (error) {
      console.error('验证API_KEY失败:', error);
      setStatus('ERROR');
      return false;
    }
  };

  const logout = () => {
    setApiKey(null);
    setIsAuthenticated(false);
    setStatus('WAITING');
    localStorage.removeItem('stylegen_api_key');
  };

  const value: AuthContextType = {
    apiKey,
    isAuthenticated,
    isLoginModalOpen,
    setIsLoginModalOpen,
    status,
    verifyApiKey,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}