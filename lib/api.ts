// API 基础配置
const API_BASE_URL = '/api';

// API 错误类
export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 通用请求函数
async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const apiKey = localStorage.getItem('stylegen_api_key');
  
  if (!apiKey) {
    throw new ApiError('NO_API_KEY', '请先验证API Key');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.code || 'UNKNOWN_ERROR',
        errorData.message || `请求失败: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError('NETWORK_ERROR', '网络请求失败');
  }
}

// API Key 验证函数
export async function verifyApiKey(apiKey: string): Promise<boolean> {
  try {
    // 临时存储API Key用于验证
    localStorage.setItem('stylegen_api_key', apiKey);
    
    // 实际项目中应该调用验证端点
    // const response = await fetchApi('/verify', {
    //   method: 'POST',
    //   body: JSON.stringify({ apiKey }),
    // });
    // return response.valid;
    
    // 模拟验证过程
    return apiKey.startsWith('sk-');
  } catch (error) {
    localStorage.removeItem('stylegen_api_key');
    return false;
  }
}

// 风格转换函数
export async function transformStyle(
  imageUrl: string,
  styleType: string,
  params: Record<string, any> = {}
) {
  return fetchApi('/transform', {
    method: 'POST',
    body: JSON.stringify({
      imageUrl,
      styleType,
      ...params,
    }),
  });
}

// 获取可用风格列表
export async function getAvailableStyles() {
  return fetchApi('/styles');
}

// 导出API工具对象
export const api = {
  verifyApiKey,
  transformStyle,
  getAvailableStyles,
};