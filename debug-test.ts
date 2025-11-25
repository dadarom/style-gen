// Debug模式功能测试文件
// 这个文件展示了如何使用AI风格生成器中的debug模式功能

// 导入必要的模块
import { DEBUG_CONFIG } from './lib/config';
import { debug, info, warn, error, logApi, performanceMonitor, stateTracer } from './lib/logger';

/**
 * 测试Debug模式功能
 * 使用方法：在开发环境中执行 `node -r ts-node/register debug-test.ts`
 */
async function testDebugFeatures() {
  console.log('=== 开始测试Debug模式功能 ===');
  
  // 1. 显示当前Debug配置
  console.log('\n当前Debug配置:');
  console.log(`- 是否启用debug模式: ${DEBUG_CONFIG.IS_DEBUG_MODE}`);
  console.log(`- 日志级别: ${DEBUG_CONFIG.LOG_LEVEL}`);
  console.log(`- 详细API日志: ${DEBUG_CONFIG.OPTIONS.VERBOSE_API_LOGS}`);
  console.log(`- 性能监控: ${DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING}`);
  console.log(`- 状态更新追踪: ${DEBUG_CONFIG.OPTIONS.TRACE_STATE_UPDATES}`);
  
  // 2. 测试不同级别的日志记录
  console.log('\n=== 测试日志记录功能 ===');
  debug('这是一条调试信息', { testData: 'debug-data' }, 'TestContext');
  info('这是一条普通信息', { status: 'ok' });
  warn('这是一条警告信息', { warning: 'potential-issue' });
  error('这是一条错误信息', { errorCode: 'ERR_001' });
  
  // 3. 测试API请求日志
  console.log('\n=== 测试API日志功能 ===');
  logApi(
    '/api/generate',
    'POST',
    { prompt: '一个美丽的风景', style: '油画' },
    { id: 'gen-123', status: 'success' },
    undefined,
    1500
  );
  
  // 测试错误API请求日志
  logApi(
    '/api/generate',
    'POST',
    { prompt: '无效提示', style: '' },
    null,
    new Error('无效的风格参数'),
    500
  );
  
  // 4. 测试性能监控功能
  // 注意：这个测试在Node.js环境中可能不会显示性能监控结果，因为performance API主要在浏览器环境中可用
  console.log('\n=== 测试性能监控功能 ===');
  
  // 临时启用性能监控进行测试
  const originalPerformanceSetting = DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING;
  DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING = true;
  
  try {
    performanceMonitor.startTime('test-operation');
    
    // 模拟一个耗时操作
    await new Promise(resolve => setTimeout(resolve, 100));
    
    performanceMonitor.endTime('test-operation');
  } finally {
    // 恢复原始设置
    DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING = originalPerformanceSetting;
  }
  
  // 5. 测试状态更新追踪
  console.log('\n=== 测试状态更新追踪功能 ===');
  
  // 临时启用状态更新追踪进行测试
  const originalStateTraceSetting = DEBUG_CONFIG.OPTIONS.TRACE_STATE_UPDATES;
  DEBUG_CONFIG.OPTIONS.TRACE_STATE_UPDATES = true;
  
  try {
    const oldValue = { step: 1, status: 'idle' };
    const newValue = { step: 2, status: 'processing' };
    
    stateTracer.trace('WorkflowTest', 'currentState', oldValue, newValue);
  } finally {
    // 恢复原始设置
    DEBUG_CONFIG.OPTIONS.TRACE_STATE_UPDATES = originalStateTraceSetting;
  }
  
  console.log('\n=== Debug功能测试完成 ===');
  console.log('提示: 在实际开发环境中，使用以下步骤启用debug模式:');
  console.log('1. 创建.env.local文件并设置 NEXT_PUBLIC_DEBUG=true');
  console.log('2. 重启开发服务器: npm run dev');
  console.log('3. 在浏览器控制台中查看详细日志');
}

// 执行测试
if (require.main === module) {
  testDebugFeatures().catch(err => {
    console.error('测试执行失败:', err);
    process.exit(1);
  });
}

// 导出函数以便在其他地方使用
export { testDebugFeatures };