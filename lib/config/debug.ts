// 调试模式配置
export const DEBUG_CONFIG = {
  // 是否启用调试模式
  IS_DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG || false,
  
  // 调试日志级别
  LOG_LEVEL: process.env.NEXT_PUBLIC_DEBUG_LOG_LEVEL || 'info',
  
  // 调试选项
  OPTIONS: {
    // 是否显示详细API请求日志
    VERBOSE_API_LOGS: true,
    // 是否模拟API延迟
    MOCK_API_DELAY: false,
    // 模拟延迟时间(ms)
    MOCK_DELAY_TIME: 1000,
    // 是否启用性能监控
    PERFORMANCE_MONITORING: false,
    // 是否在控制台打印所有状态更新
    TRACE_STATE_UPDATES: false,
  },
};
