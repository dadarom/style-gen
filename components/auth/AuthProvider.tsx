'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  verifyApiKey as verifyApiKeyUtil, 
  getStoredApiKey, 
  removeApiKey,
  ApiKeyStatus
} from '../../lib/auth';

interface AuthContextType {
  apiKey: string | null;
  isAuthenticated: boolean;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;
  status: ApiKeyStatus;
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
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [status, setStatus] = useState<ApiKeyStatus>('WAITING');

  // 从localStorage加载API_KEY
  useEffect(() => {
    const savedApiKey = getStoredApiKey();
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsAuthenticated(true);
    }
  }, []);

  const verifyApiKey = async (key: string): Promise<boolean> => {
    setStatus('VERIFYING');
    
    try {
      const success = await verifyApiKeyUtil(key);
      
      if (success) {
        const processedKey = key.startsWith('sk:') ? key.slice(3) : key;
        setApiKey(processedKey);
        setIsAuthenticated(true);
        setStatus('SUCCESS');
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
    removeApiKey();
  };

  const value: AuthContextType = {
    apiKey,
    isAuthenticated,
    isLoginModalOpen,
    setIsLoginModalOpen,
    isApiKeyModalOpen,
    setIsApiKeyModalOpen,
    status,
    verifyApiKey,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}