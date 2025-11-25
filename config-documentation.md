# AI风格生成器 - 配置管理文档

## 概述

本文档详细说明AI风格生成器项目中的配置管理系统，该系统将所有API相关的配置集中在一个地方进行管理，便于维护和修改。

## 配置文件结构

项目的配置文件位于 `lib/config.ts`，主要包含以下几部分配置：

### 1. API_CONFIG

这是核心配置对象，包含所有与API相关的设置：

| 配置项 | 类型 | 说明 | 默认值 |
|-------|------|------|-------|
| `NEW_API_BASE_URL` | string | NewAPI基础URL | `https://api.newapi.pro/v1/chat/completions` |
| `NEWAPI_BASE_URL` | string | 另一个NewAPI基础URL | `https://api.newapi.pro/v1` |
| `API_BASE_URL` | string | 本地API基础URL | `/api` |
| `STORAGE_KEYS.API_KEY` | string | 存储API密钥的localStorage键名 | `stylegen_api_key` |
| `MODELS.VOLC_ENGINE_MODEL` | string | 火山引擎模型名称 | `seedream4.0` |
| `MODELS.VOLC_ENGINE_FULL_MODEL` | string | 火山引擎完整模型名称 | `volcengine/seed-dream-4.0` |
| `REQUEST.TIMEOUT` | number | 请求超时时间（毫秒） | `60000` |
| `REQUEST.RETRY_TIMES` | number | 请求重试次数 | `3` |
| `DEFAULT.API_KEY` | string | 默认演示API密钥，从环境变量NEXT_PUBLIC_DEFAULT_API_KEY读取，默认为'test-key-for-demo' | `process.env.NEXT_PUBLIC_DEFAULT_API_KEY || 'test-key-for-demo'` |
| `DEFAULT.PROGRESS_UPDATE_INTERVAL` | number | 进度更新间隔（毫秒） | `600` |
| `DEFAULT.POLLING_INTERVAL` | number | 轮询间隔（毫秒） | `5000` |
| `DEFAULT.MAX_PROGRESS` | number | 最大模拟进度（%） | `95` |

### 2. ERROR_CODES

错误码常量，用于统一管理系统中的错误类型：

| 错误码 | 说明 |
|-------|------|
| `API_ERROR` | API调用失败 |
| `NETWORK_ERROR` | 网络请求失败 |
| `TIMEOUT` | 请求超时 |
| `UNAUTHORIZED` | 未授权 |
| `INVALID_RESPONSE` | 响应格式无效 |
| `STREAM_ERROR` | 流式响应错误 |
| `NEWAPI_ERROR` | NewAPI请求失败 |
| `NEWAPI_REQUEST_FAILED` | NewAPI请求失败 |

### 3. ERROR_MESSAGES

错误消息配置，与错误码一一对应：

| 错误码 | 错误消息 |
|-------|----------|
| `API_ERROR` | `API调用失败` |
| `NETWORK_ERROR` | `网络请求失败` |
| `TIMEOUT` | `请求超时，请稍后重试` |
| `UNAUTHORIZED` | `未授权，请提供有效的API密钥` |
| `INVALID_RESPONSE` | `响应格式无效` |
| `STREAM_ERROR` | `无法获取响应流` |
| `NEWAPI_ERROR` | `NewAPI请求失败` |
| `NEWAPI_REQUEST_FAILED` | `NewAPI请求失败` |

### 4. SUCCESS_MESSAGES

成功消息配置：

| 消息键 | 消息内容 |
|-------|----------|
| `IMAGE_TRANSFORM_SUCCESS` | `图片风格转换成功` |
| `DEMO_MODE_SUCCESS` | `演示模式：图片风格转换成功（使用模拟数据）` |

## 如何修改配置

### 修改API URL

如果需要更改API服务的地址，只需修改`API_CONFIG`中的对应URL：

```typescript
// 在 lib/config.ts 中修改
API_CONFIG.NEW_API_BASE_URL = 'https://new-api-endpoint.example.com/v1';
```

### 修改超时和轮询时间

要调整请求超时时间或轮询间隔：

```typescript
// 在 lib/config.ts 中修改
API_CONFIG.REQUEST.TIMEOUT = 90000; // 改为90秒
API_CONFIG.DEFAULT.POLLING_INTERVAL = 3000; // 改为3秒
```

### 修改错误消息

要自定义错误提示消息：

```typescript
// 在 lib/config.ts 中修改
ERROR_MESSAGES[ERROR_CODES.TIMEOUT] = '操作超时，请检查网络连接后重试';
```

## 使用配置的组件

配置已经在以下关键组件中使用：

1. **lib/api.ts**：使用配置进行API调用、错误处理和响应格式化
2. **components/workflow.tsx**：使用配置设置超时时间和轮询间隔

## 最佳实践

1. **不要硬编码配置**：所有配置都应通过配置文件管理，避免在代码中硬编码
2. **统一错误处理**：使用ERROR_CODES和ERROR_MESSAGES进行一致的错误处理
3. **文档化配置**：修改配置后及时更新文档
4. **敏感信息保护**：避免在配置中存储实际的API密钥，使用环境变量或用户输入

## 常见问题

### Q: 如何添加新的配置项？

A: 在lib/config.ts文件中的相应配置对象中添加新的键值对，然后在需要使用的地方导入并引用。

### Q: 如何修改存储API密钥的方式？

A: 只需修改`API_CONFIG.STORAGE_KEYS.API_KEY`的值，并确保所有相关组件都使用这个配置。

### Q: 配置修改后需要重新构建项目吗？

A: 是的，修改配置文件后需要重新构建项目才能使更改生效。
