// AI风格生成器配置管理

// API基础URL配置
export const API_CONFIG = {
  // 火山方舟API配置
  VOLC_ENGINE_API_BASE_URL: 'https://ark.cn-beijing.volces.com/api/v3',
  VOLC_ENGINE_IMAGES_ENDPOINT: '/images/generations',
  
  // NewAPI相关配置
  NEW_API_BASE_URL: 'https://api.newapi.pro/v1/chat/completions',
  NEWAPI_BASE_URL: 'https://api.newapi.pro/v1',
  
  // 本地API配置
  API_BASE_URL: '/api',
  
  // 存储键名配置
  STORAGE_KEYS: {
    API_KEY: 'stylegen_api_key',
  },
  
  // 模型配置
  MODELS: {
    VOLC_ENGINE_MODEL: 'seedream4.0',
    VOLC_ENGINE_FULL_MODEL: 'volcengine/seed-dream-4.0',
    VOLC_ENGINE_IMAGE_MODEL: 'doubao-seedream-4-0-250828', // 火山方舟图文生图模型ID
  },
  
  // 请求配置
  REQUEST: {
    TIMEOUT: 60000, // 60秒
    RETRY_TIMES: 3,
  },
  
  // 默认配置
  DEFAULT: {
    API_KEY: process.env.NEXT_PUBLIC_DEFAULT_API_KEY || 'test-key-for-demo', // 从环境变量读取，默认值作为后备
    PROGRESS_UPDATE_INTERVAL: 600, // 进度更新间隔(ms)
    POLLING_INTERVAL: 5000, // 轮询间隔(ms)
    MAX_PROGRESS: 95, // 最大模拟进度
  },
};

// 错误码配置
export const ERROR_CODES = {
  API_ERROR: 'API_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
  UNAUTHORIZED: 'UNAUTHORIZED',
  INVALID_RESPONSE: 'INVALID_RESPONSE',
  STREAM_ERROR: 'STREAM_ERROR',
  NEWAPI_ERROR: 'NEWAPI_ERROR',
  NEWAPI_REQUEST_FAILED: 'NEWAPI_REQUEST_FAILED',
};

// 错误消息配置
export const ERROR_MESSAGES = {
  [ERROR_CODES.API_ERROR]: 'API调用失败',
  [ERROR_CODES.NETWORK_ERROR]: '网络请求失败',
  [ERROR_CODES.TIMEOUT]: '请求超时，请稍后重试',
  [ERROR_CODES.UNAUTHORIZED]: '未授权，请提供有效的API密钥',
  [ERROR_CODES.INVALID_RESPONSE]: '响应格式无效',
  [ERROR_CODES.STREAM_ERROR]: '无法获取响应流',
  [ERROR_CODES.NEWAPI_ERROR]: 'NewAPI请求失败',
  [ERROR_CODES.NEWAPI_REQUEST_FAILED]: 'NewAPI请求失败',
};

// 成功消息配置
export const SUCCESS_MESSAGES = {
  IMAGE_TRANSFORM_SUCCESS: '图片风格转换成功',
  DEMO_MODE_SUCCESS: '演示模式：图片风格转换成功（使用模拟数据）',
};
