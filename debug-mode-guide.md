# AI风格生成器 Debug模式使用指南

本文档详细介绍如何在AI风格生成器项目中启用和使用本地debug模式功能。

## 1. Debug模式概述

Debug模式提供以下功能：
- 详细的日志记录和控制
- API请求的详细跟踪
- 性能监控
- 状态更新追踪
- 模拟API延迟（用于测试加载状态）

## 2. 启用Debug模式

Debug模式可以通过环境变量或直接修改配置文件来启用。

### 2.1 通过环境变量启用

在开发环境中，创建一个`.env.local`文件并添加以下内容：

```
# 启用debug模式
NEXT_PUBLIC_DEBUG=true

# 设置日志级别（可选）
NEXT_PUBLIC_DEBUG_LOG_LEVEL=debug
```

然后重启开发服务器：

```bash
npm run dev
```

### 2.2 临时启用Debug模式

如果不想修改环境变量，可以直接在控制台中执行以下命令来启用debug模式（仅对当前会话有效）：

```javascript
// 在浏览器控制台中执行
localStorage.setItem('__NEXT_PUBLIC_DEBUG', 'true');
// 然后刷新页面
```

## 3. Debug配置选项详解

所有debug相关配置都位于`lib/config.ts`中的`DEBUG_CONFIG`对象：

```typescript
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
```

### 配置选项说明

| 配置项 | 类型 | 默认值 | 说明 |
|-------|------|-------|------|
| IS_DEBUG_MODE | boolean | false | 是否启用debug模式 |
| LOG_LEVEL | string | 'info' | 日志级别：'debug', 'info', 'warn', 'error' |
| OPTIONS.VERBOSE_API_LOGS | boolean | true | 是否显示详细的API请求和响应数据 |
| OPTIONS.MOCK_API_DELAY | boolean | false | 是否模拟API延迟（用于测试加载状态） |
| OPTIONS.MOCK_DELAY_TIME | number | 1000 | 模拟延迟时间（毫秒） |
| OPTIONS.PERFORMANCE_MONITORING | boolean | false | 是否启用性能监控 |
| OPTIONS.TRACE_STATE_UPDATES | boolean | false | 是否记录所有组件状态更新 |

## 4. 使用日志系统

### 4.1 导入日志工具

```typescript
import { debug, info, warn, error, logApi } from '@/lib/logger';
```

### 4.2 记录不同级别的日志

```typescript
// 记录debug级别日志（仅在debug模式下显示）
debug('这是一个调试信息', { data: '附加数据' }, 'Workflow');

// 记录普通信息
info('操作成功完成', { result: 'success' });

// 记录警告信息
warn('潜在问题', { details: '参数值异常' });

// 记录错误信息
error('操作失败', { error: '错误详情' });
```

### 4.3 记录API请求

```typescript
logApi(
  '/api/generate',
  'POST',
  { prompt: '一个风景', style: '油画' },
  { id: 'gen-123', url: '...' },
  null, // 无错误
  2500 // 响应时间（毫秒）
);
```

## 5. 性能监控使用

### 5.1 启用性能监控

首先在配置中启用性能监控：

```typescript
// 在lib/config.ts中修改
DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING = true;
```

### 5.2 使用性能监控API

```typescript
import { performanceMonitor } from '@/lib/logger';

// 开始计时
performanceMonitor.startTime('image-generation');

// 执行耗时操作
async function generateImage() {
  try {
    // 生成图片的代码
    await imageGenerationAPI(...);
  } finally {
    // 结束计时并记录性能数据
    performanceMonitor.endTime('image-generation');
  }
}

// 清除所有性能标记
performanceMonitor.clearMarks();
```

## 6. 状态更新追踪

### 6.1 启用状态追踪

首先在配置中启用状态追踪：

```typescript
// 在lib/config.ts中修改
DEBUG_CONFIG.OPTIONS.TRACE_STATE_UPDATES = true;
```

### 6.2 使用状态追踪API

```typescript
import { stateTracer } from '@/lib/logger';

function updateState(newValue) {
  const oldValue = currentValue;
  currentValue = newValue;
  
  // 记录状态更新
  stateTracer.trace(
    'ImageGenerator', // 组件名称
    'currentStyle',   // 状态名称
    oldValue,         // 旧值
    newValue          // 新值
  );
}
```

## 7. 实际使用示例

### 在workflow组件中使用debug功能

```typescript
import { DEBUG_CONFIG } from '@/lib/config';
import { debug, performanceMonitor, stateTracer } from '@/lib/logger';

// 在组件中
function handleNextStep() {
  const oldStep = currentStep;
  setCurrentStep(oldStep + 1);
  
  // 追踪状态更新
  stateTracer.trace('Workflow', 'currentStep', oldStep, oldStep + 1);
  
  // 记录debug日志
  if (DEBUG_CONFIG.IS_DEBUG_MODE) {
    debug('工作流状态更新', { currentStep: oldStep + 1, context: 'navigation' });
  }
}

async function generateImage() {
  // 开始性能监控
  performanceMonitor.startTime('generateImage');
  
  try {
    // 生成图片代码
    const result = await api.generateImage({
      prompt: currentPrompt,
      style: selectedStyle
    });
    
    // 记录成功日志
    debug('图片生成成功', { id: result.id, style: selectedStyle });
    return result;
  } catch (err) {
    // 记录错误
    error('图片生成失败', { error: err.message });
    throw err;
  } finally {
    // 结束性能监控
    performanceMonitor.endTime('generateImage');
  }
}
```

## 8. 调试最佳实践

1. **开发环境使用**: 仅在开发环境中启用debug模式，生产环境中应始终关闭
2. **合理设置日志级别**: 根据需要调整LOG_LEVEL以过滤日志量
3. **敏感信息保护**: 日志系统会自动屏蔽常见的敏感信息（apiKey、token等）
4. **性能考虑**: 性能监控和详细日志会增加开销，调试完成后应关闭
5. **清理日志**: 使用`localStorage.removeItem('ai_stylegen_logs')`定期清理累积的日志

## 9. 查看日志

启用debug模式后，可以在以下位置查看日志：

1. **浏览器控制台**: 直接显示格式化的日志信息
2. **本地存储**: 日志会保存到localStorage中，键名为`ai_stylegen_logs`
3. **导出日志**: 使用Logger实例的`exportLogs()`方法导出完整日志

## 10. 常见问题排查

### 日志没有显示
- 确认debug模式已正确启用（`IS_DEBUG_MODE`为true）
- 检查日志级别设置是否过低
- 确认浏览器控制台没有被过滤

### 性能监控不工作
- 确认`PERFORMANCE_MONITORING`选项已启用
- 检查浏览器是否支持Performance API
- 确保`startTime`和`endTime`使用相同的标签名称

### 状态追踪无输出
- 确认`TRACE_STATE_UPDATES`选项已启用
- 检查是否在状态更新后正确调用了`stateTracer.trace()`

---

通过合理使用debug模式，可以大大提高开发和调试效率，快速定位和解决问题。