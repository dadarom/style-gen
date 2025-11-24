import { NextApiRequest, NextApiResponse } from 'next';

// 目标API URL
const TARGET_API_URL = process.env.NEXT_PUBLIC_TARGET_API_URL || 'https://api.stylegen.ai';

// 处理API代理请求
export default async function proxyHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // 获取请求路径（去除/api前缀）
    const path = req.url?.replace(/^\/api/, '') || '/';
    const url = `${TARGET_API_URL}${path}`;
    
    // 提取API_KEY
    const apiKey = req.headers.authorization?.replace('Bearer ', '');
    
    if (!apiKey) {
      return res.status(401).json({
        error: '缺少API_KEY',
        code: 'NO_API_KEY'
      });
    }
    
    // 构建代理请求选项
    const options: RequestInit = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        // 可以添加其他必要的头信息
      },
    };
    
    // 添加请求体（如果有）
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      options.body = JSON.stringify(req.body);
    }
    
    // 发送代理请求
    const response = await fetch(url, options);
    const data = await response.json();
    
    // 转发响应状态和数据
    res.status(response.status).json(data);
  } catch (error) {
    console.error('代理请求失败:', error);
    res.status(500).json({
      error: '代理服务错误',
      code: 'PROXY_ERROR'
    });
  }
}

// 配置代理
export const config = {
  api: {
    bodyParser: true,
    // 允许的请求大小
    sizeLimit: '10mb',
  },
};