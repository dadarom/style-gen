// 导入配置
import { API_CONFIG, ERROR_CODES, ERROR_MESSAGES, SUCCESS_MESSAGES } from './config';

// API配置常量引用
const { VOLC_ENGINE_API_BASE_URL, VOLC_ENGINE_IMAGES_ENDPOINT, API_BASE_URL, MODELS } = API_CONFIG;

// API 错误类
export class ApiError extends Error {
  constructor(public code: string, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// 通用请求函数
async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const apiKey = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
  
  if (!apiKey) {
    throw new ApiError(ERROR_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
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
    throw new ApiError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES.NETWORK_ERROR);
  }
}

// API_KEY 验证函数
export async function verifyApiKey(apiKey: string): Promise<boolean> {
  try {
    // 临时存储API_KEY用于验证
    localStorage.setItem(API_CONFIG.STORAGE_KEYS.API_KEY, apiKey);
    
    // 实际项目中应该调用验证端点
    // const response = await fetchApi('/verify', {
    //   method: 'POST',
    //   body: JSON.stringify({ apiKey }),
    // });
    // return response.valid;
    
    // 模拟验证过程
    return apiKey.startsWith('sk-');
  } catch (error) {
    localStorage.removeItem(API_CONFIG.STORAGE_KEYS.API_KEY);
    return false;
  }
}

// 风格转换函数 - 直接调用火山方舟API
export async function transformStyle(
  imageUrl: string,
  styleType: string,
  params: Record<string, any> = {},
  onProgress?: (progress: number) => void
) {
  try {
    // 从localStorage获取API密钥
    const apiKey = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
    
    if (!apiKey) {
      throw new ApiError(ERROR_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
    }
    
    // 准备请求数据，严格遵循火山方舟OpenAI接口模式
    const requestBody = {
      model: MODELS.VOLC_ENGINE_IMAGE_MODEL,
      prompt: `将图片转换为${styleType}风格的艺术作品，保持原始图片的主体内容不变，只转换艺术风格。`,
      image: imageUrl,
      size: '2K',
      response_format: 'url',
      extra_body: {
        watermark: true
      }
    };
    
    // 直接调用火山方舟API
    const response = await fetch(`${VOLC_ENGINE_API_BASE_URL}${VOLC_ENGINE_IMAGES_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.code || ERROR_CODES.API_ERROR,
        errorData.message || ERROR_MESSAGES.API_ERROR
      );
    }
    
    // 处理响应
    const responseData = await response.json();
    
    // 验证响应结构
    if (!responseData.data || !Array.isArray(responseData.data) || responseData.data.length === 0 || !responseData.data[0].url) {
      throw new ApiError(ERROR_CODES.INVALID_RESPONSE, ERROR_MESSAGES.INVALID_RESPONSE);
    }
    
    // 更新进度
    if (onProgress) {
      onProgress(1.0);
    }
    
    // 返回结果
    return {
      success: true,
      generatedImage: responseData.data[0].url,
      message: SUCCESS_MESSAGES.IMAGE_TRANSFORM_SUCCESS
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES.NETWORK_ERROR);
  }
}

// 获取可用风格列表
export async function getAvailableStyles() {
  return fetchApi('/styles');
}

// 通过火山方舟API调用生成图片
async function callVolcEngineApiForImageGeneration(imageBase64: string, styleId: string, apiKey: string) {
  try {
    // 构建请求体，使用火山方舟OpenAI接口模式
    const requestBody = {
      model: MODELS.VOLC_ENGINE_IMAGE_MODEL,
      prompt: `将图片转换为${styleId}风格的艺术作品`,
      image: imageBase64,
      size: '2K',
      response_format: 'url',
      extra_body: {
        watermark: true
      }
    };

    const response = await fetch(`${VOLC_ENGINE_API_BASE_URL}${VOLC_ENGINE_IMAGES_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.code || ERROR_CODES.API_ERROR,
        errorData.message || ERROR_MESSAGES.API_ERROR
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES.NETWORK_ERROR);
  }
}

// 生成风格化图片函数
export async function generateStyledImage(imageBase64: string, styleId: string): Promise<string> {
  try {
    // 从localStorage获取API密钥，直接使用火山方舟API
    const apiKey = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
    
    if (!apiKey) {
      throw new ApiError(ERROR_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
    }

    // 调用火山方舟API进行图片生成
    const result = await callVolcEngineApiForImageGeneration(imageBase64, styleId, apiKey);

    // 从结果中提取生成的图片URL
    if (result.data && Array.isArray(result.data) && result.data.length > 0 && result.data[0].url) {
      return result.data[0].url;
    } else {
      throw new ApiError(ERROR_CODES.INVALID_RESPONSE, ERROR_MESSAGES.INVALID_RESPONSE);
    }
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(ERROR_CODES.API_ERROR, ERROR_MESSAGES.API_ERROR);
  }
}

// API工具对象导出
export const api = {
  generateStyledImage,
  transformStyle,
  // 其他API方法可以在这里添加
};