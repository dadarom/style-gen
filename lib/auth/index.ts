// 认证相关逻辑封装
import { API_CONFIG } from '../config';

// API密钥存储键名
const API_KEY_STORAGE_KEY = API_CONFIG.STORAGE_KEYS.API_KEY;

// API密钥验证结果类型
export type ApiKeyStatus = 'WAITING' | 'VERIFYING' | 'SUCCESS' | 'ERROR';

// API密钥验证函数
export const verifyApiKey = async (key: string): Promise<boolean> => {
  try {
    // 检查是否以sk-或sk:开头
    if (key.startsWith('sk-') || key.startsWith('sk:')) {
      // 处理前缀：如果以sk:开头，则去除前缀
      const processedKey = key.startsWith('sk:') ? key.slice(3) : key;
      
      // 保存到localStorage（存储去除前缀后的密钥）
      localStorage.setItem(API_KEY_STORAGE_KEY, processedKey);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('验证API_KEY失败:', error);
    return false;
  }
};

// 获取存储的API密钥
export const getStoredApiKey = (): string | null => {
  return localStorage.getItem(API_KEY_STORAGE_KEY);
};

// 保存API密钥到存储
export const saveApiKey = (key: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

// 从存储中移除API密钥
export const removeApiKey = (): void => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
};

// 检查API密钥是否有效
export const isApiKeyValid = (key: string): boolean => {
  return key.startsWith('sk-') || key.startsWith('sk:');
};

// 处理API密钥前缀
export const processApiKeyPrefix = (key: string): string => {
  return key.startsWith('sk:') ? key.slice(3) : key;
};
