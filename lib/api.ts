// 导入配置
import { API_CONFIG, ERROR_CODES, ERROR_MESSAGES, SUCCESS_MESSAGES } from './config';
// 导入日志模块
import logger, { logApi } from './logger';

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

// 使用logger模块提供的API日志记录函数（不再需要本地logApiRequest函数）

// 风格转换函数 - 同步调用模式
export async function transformStyle(
  imageUrl: string,
  styleType: string,
  params: Record<string, any> = {}
) {
  try {
    // 从localStorage获取API密钥
    let apiKey = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
    
    // 使用默认API密钥作为后备（开发/演示模式）
    if (!apiKey) {
      apiKey = API_CONFIG.DEFAULT.API_KEY;
      console.log('使用默认API密钥（演示模式）');
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
    
    // 记录请求开始
    const startTime = Date.now();
    
    // 演示模式：对于测试密钥或默认密钥，直接返回模拟成功响应
    const isDemoMode = apiKey === 'test-key-for-demo' || apiKey === API_CONFIG.DEFAULT.API_KEY;
    
    if (isDemoMode) {
      console.log('运行在演示模式，返回模拟图片转换结果');
      
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 生成随机的演示图片URL（使用public文件夹中的示例图片）
      const demoImages = [
        '/artistic-result.jpg',
        '/cartoon-art.jpg',
        '/abstract-oil-painting.png'
      ];
      const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
      
      // 记录成功日志
      const endTime = Date.now();
      const responseData = {
        data: [{ url: randomImage }]
      };
      logApi('transformStyle', VOLC_ENGINE_IMAGES_ENDPOINT, requestBody, responseData);
      
      return {
        success: true,
        generatedImage: randomImage,
        responseTime: endTime - startTime,
        message: SUCCESS_MESSAGES.DEMO_MODE_SUCCESS,
        isDemo: true
      };
    }
    
    // 生产模式：直接调用火山方舟API（同步调用）
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
      const apiError = new ApiError(
        errorData.code || ERROR_CODES.API_ERROR,
        errorData.message || ERROR_MESSAGES.API_ERROR
      );
      // 记录错误日志
      logApi('transformStyle', VOLC_ENGINE_IMAGES_ENDPOINT, requestBody, null, apiError);
      throw apiError;
    }
    
    // 处理响应
    const responseData = await response.json();
    
    // 验证响应结构
    if (!responseData.data || !Array.isArray(responseData.data) || responseData.data.length === 0 || !responseData.data[0].url) {
      const error = new ApiError(ERROR_CODES.INVALID_RESPONSE, ERROR_MESSAGES.INVALID_RESPONSE);
      logApi('transformStyle', VOLC_ENGINE_IMAGES_ENDPOINT, requestBody, responseData, error);
      throw error;
    }
    
    // 记录成功日志
    const endTime = Date.now();
    logApi('transformStyle', VOLC_ENGINE_IMAGES_ENDPOINT, requestBody, responseData);
    
    // 直接返回生成的图片URL和请求耗时
    return {
      success: true,
      generatedImage: responseData.data[0].url,
      responseTime: endTime - startTime,
      message: SUCCESS_MESSAGES.IMAGE_TRANSFORM_SUCCESS
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES.NETWORK_ERROR);
  }
}

// 查询任务状态函数
export async function getTaskStatus(taskId: string) {
  try {
    // 从localStorage获取API密钥
    const apiKey = localStorage.getItem(API_CONFIG.STORAGE_KEYS.API_KEY);
    
    if (!apiKey) {
      throw new ApiError(ERROR_CODES.UNAUTHORIZED, ERROR_MESSAGES.UNAUTHORIZED);
    }
    
    // 调用火山方舟API查询任务状态
    // 注意：这里需要根据火山方舟API的实际接口格式进行调整
    // 以下是一个基本的实现，实际使用时需要根据API文档调整
    const response = await fetch(`${VOLC_ENGINE_API_BASE_URL}/tasks/${taskId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.code || ERROR_CODES.API_ERROR,
        errorData.message || ERROR_MESSAGES.API_ERROR
      );
    }
    
    const responseData = await response.json();
    
    // 格式化返回的任务状态
    return {
      taskId,
      status: responseData.status || 'PROCESSING', // 可能的值：PROCESSING, COMPLETED, FAILED
      progress: responseData.progress || 0, // 0-1之间的进度值
      generatedImage: responseData.result?.url || null,
      errorMessage: responseData.error?.message || null
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
  verifyApiKey
  // 移除getTaskStatus，因为不再需要轮询
  // 其他API方法可以在这里添加
};