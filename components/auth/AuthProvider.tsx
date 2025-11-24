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
      // 这里可以添加真实的API_KEY验证逻辑
      // 暂时使用简单的验证规则
      if (key.startsWith('sk-')) {
        setApiKey(key);
        setIsAuthenticated(true);
        setStatus('SUCCESS');
        // 保存到localStorage
        localStorage.setItem('stylegen_api_key', key);
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