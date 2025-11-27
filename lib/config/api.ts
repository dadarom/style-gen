// API基础URL配置
export const API_CONFIG = {
  // 火山方舟API配置
  VOLC_ENGINE_API_BASE_URL: 'https://ark.cn-beijing.volces.com/api/v3',
  VOLC_ENGINE_IMAGES_ENDPOINT: '/images/generations',
  
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
    TIMEOUT: 15000, // 15秒
    RETRY_TIMES: 3,
  },
  
  // 默认配置
  DEFAULT: {
    API_KEY: 'test-key-for-demo', // 演示模式
    PROGRESS_UPDATE_INTERVAL: 600, // 进度更新间隔(ms)
    POLLING_INTERVAL: 5000, // 轮询间隔(ms)
    MAX_PROGRESS: 95, // 最大模拟进度
  },
};
