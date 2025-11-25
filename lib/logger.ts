// 日志管理器模块 - 支持Next.js环境
import { DEBUG_CONFIG } from './config';

// 日志级别枚举
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

// 日志条目接口
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: Record<string, any>;
  context?: string;
}

// 日志配置接口
interface LoggerConfig {
  maxLogEntries: number;
  storageKey: string;
  enabled: boolean;
  logLevel: LogLevel;
}

// 从DEBUG_CONFIG获取日志级别
const getDefaultLogLevel = (): LogLevel => {
  const debugLogLevel = DEBUG_CONFIG.LOG_LEVEL.toLowerCase();
  switch (debugLogLevel) {
    case 'debug':
      return LogLevel.DEBUG;
    case 'info':
      return LogLevel.INFO;
    case 'warn':
      return LogLevel.WARN;
    case 'error':
      return LogLevel.ERROR;
    default:
      return LogLevel.INFO;
  }
};

// 默认配置
const DEFAULT_CONFIG: LoggerConfig = {
  maxLogEntries: 1000,
  storageKey: 'ai_stylegen_logs',
  enabled: Boolean(DEBUG_CONFIG.IS_DEBUG_MODE) || true,
  logLevel: getDefaultLogLevel()
};

// 检查是否在浏览器环境
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

// 日志管理器类
export class Logger {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];
  private initialized = false;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    // 只有在浏览器环境才初始化
    if (isBrowser) {
      this.initialize();
    }
  }

  // 初始化日志管理器
  private initialize(): void {
    if (!this.config.enabled || this.initialized) return;
    
    try {
      // 只有在浏览器环境中才尝试使用localStorage
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        // 从本地存储加载历史日志
        const storedLogs = localStorage.getItem(this.config.storageKey);
        if (storedLogs) {
          const parsedLogs = JSON.parse(storedLogs);
          if (Array.isArray(parsedLogs)) {
            this.logs = parsedLogs.slice(-this.config.maxLogEntries); // 只保留最近的日志
          }
        }
      }
      
      this.initialized = true;
    } catch (error) {
      console.error('日志初始化失败:', error);
      // 初始化失败时不中断流程，使用空日志列表
      this.logs = [];
      this.initialized = true;
    }
  }

  // 保存日志到本地存储
  private saveLogs(): void {
    if (!this.config.enabled || !this.initialized) return;
    
    try {
      // 只有在浏览器环境中才尝试使用localStorage
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(this.config.storageKey, JSON.stringify(this.logs));
      }
    } catch (error) {
      console.error('保存日志失败:', error);
      // 保存失败时不中断流程
    }
  }

  // 记录日志的通用方法
  private log(level: LogLevel, message: string, data?: Record<string, any>, context?: string): void {
    if (!this.config.enabled || this.getLogLevelValue(level) < this.getLogLevelValue(this.config.logLevel)) {
      return;
    }

    // 屏蔽敏感信息
    const sanitizedData = this.sanitizeData(data || {});
    
    const logEntry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data: sanitizedData,
      context
    };
    
    this.logs.push(logEntry);
    
    // 限制日志数量
    if (this.logs.length > this.config.maxLogEntries) {
      this.logs = this.logs.slice(-this.config.maxLogEntries);
    }
    
    // 保存到本地存储
    this.saveLogs();
    
    // 在控制台显示日志
    this.displayInConsole(logEntry);
  }

  // 将日志级别转换为数值以便比较
  private getLogLevelValue(level: LogLevel): number {
    switch (level) {
      case LogLevel.DEBUG:
        return 0;
      case LogLevel.INFO:
        return 1;
      case LogLevel.WARN:
        return 2;
      case LogLevel.ERROR:
        return 3;
      default:
        return 1;
    }
  }

  // 屏蔽敏感信息
  private sanitizeData(data: Record<string, any>): Record<string, any> {
    const sensitiveKeys = ['apiKey', 'password', 'token', 'secret', 'key'];
    const sanitized: Record<string, any> = {};
    
    Object.keys(data).forEach(key => {
      const lowerKey = key.toLowerCase();
      if (sensitiveKeys.some(sensitiveKey => lowerKey.includes(sensitiveKey))) {
        sanitized[key] = '***REDACTED***';
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        sanitized[key] = this.sanitizeData(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    });
    
    return sanitized;
  }

  // 在控制台显示日志
  private displayInConsole(entry: LogEntry): void {
    const { level, message, data, timestamp, context } = entry;
    const prefix = context ? `[${context}]` : '';
    const timestampStr = new Date(timestamp).toLocaleString();
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(`[DEBUG] ${prefix} ${timestampStr}: ${message}`, data);
        break;
      case LogLevel.INFO:
        console.info(`[INFO] ${prefix} ${timestampStr}: ${message}`, data);
        break;
      case LogLevel.WARN:
        console.warn(`[WARN] ${prefix} ${timestampStr}: ${message}`, data);
        break;
      case LogLevel.ERROR:
        console.error(`[ERROR] ${prefix} ${timestampStr}: ${message}`, data);
        break;
    }
  }

  // 公开的日志方法
  public debug(message: string, data?: Record<string, any>, context?: string): void {
    this.log(LogLevel.DEBUG, message, data, context);
  }

  public info(message: string, data?: Record<string, any>, context?: string): void {
    this.log(LogLevel.INFO, message, data, context);
  }

  public warn(message: string, data?: Record<string, any>, context?: string): void {
    this.log(LogLevel.WARN, message, data, context);
  }

  public error(message: string, data?: Record<string, any>, context?: string): void {
    this.log(LogLevel.ERROR, message, data, context);
  }

  // 清空所有日志
  public clearLogs(): void {
    if (!this.config.enabled) return;
    
    this.logs = [];
    try {
      // 只有在浏览器环境中才尝试使用localStorage
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem(this.config.storageKey);
      }
    } catch (error) {
      console.error('清空日志失败:', error);
    }
  }

  // 设置日志级别
  public setLogLevel(level: LogLevel): void {
    this.config.logLevel = level;
    try {
      // 只有在浏览器环境中才尝试使用localStorage
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.setItem(`${this.config.storageKey}_level`, level.toString());
      }
    } catch (error) {
      console.error('保存日志级别失败:', error);
    }
  }

  // 获取当前日志级别
  public getLogLevel(): LogLevel {
    try {
      // 只有在浏览器环境中才尝试使用localStorage
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        const savedLevel = localStorage.getItem(`${this.config.storageKey}_level`);
        if (savedLevel && Object.values(LogLevel).includes(savedLevel as LogLevel)) {
          return savedLevel as LogLevel;
        }
      }
    } catch (error) {
      console.error('读取日志级别失败:', error);
    }
    return this.config.logLevel;
  }

  // 导出日志为JSON字符串
  public exportLogs(): string {
    try {
      return JSON.stringify(this.logs, null, 2);
    } catch (error) {
      console.error('导出日志失败:', error);
      return '[]';
    }
  }

  // 获取日志列表
  public getLogs(filter?: { level?: LogLevel, context?: string, startDate?: Date, endDate?: Date }): LogEntry[] {
    let filteredLogs = [...this.logs];
    
    if (filter) {
      if (filter.level) {
        filteredLogs = filteredLogs.filter(log => log.level === filter.level);
      }
      
      if (filter.context) {
        filteredLogs = filteredLogs.filter(log => log.context === filter.context);
      }
      
      if (filter.startDate) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.timestamp) >= filter.startDate!
        );
      }
      
      if (filter.endDate) {
        filteredLogs = filteredLogs.filter(log => 
          new Date(log.timestamp) <= filter.endDate!
        );
      }
    }
    
    return filteredLogs;
  }

  // 记录API请求日志
  public logApiRequest(
    endpoint: string,
    method: string,
    requestData: Record<string, any>,
    responseData?: any,
    error?: Error,
    duration?: number
  ): void {
    // 根据debug配置决定日志级别和详细程度
    const logLevel = DEBUG_CONFIG.OPTIONS.VERBOSE_API_LOGS ? LogLevel.DEBUG : LogLevel.INFO;
    
    // 构建日志数据
    const baseData = {
      endpoint,
      method,
      duration: `${duration || 0}ms`
    };
    
    // 如果启用详细日志，则包含完整的请求和响应数据
    const data = DEBUG_CONFIG.OPTIONS.VERBOSE_API_LOGS ? {
      ...baseData,
      requestData,
      responseData: error ? null : responseData,
      error: error?.message,
      errorStack: error?.stack,
      timestamp: new Date().toISOString()
    } : baseData;
    
    if (error) {
      this.error(`API请求失败: ${method} ${endpoint}`, data, 'api');
    } else {
      if (logLevel === LogLevel.DEBUG) {
        this.debug(`API请求成功: ${method} ${endpoint}`, data, 'api');
      } else {
        this.info(`API请求成功: ${method} ${endpoint}`, data, 'api');
      }
    }
  }
}

// 创建单例日志实例
const logger = new Logger();

// 导出日志工具函数
export const logApi = (endpoint: string, method: string, requestData: Record<string, any>, responseData?: any, error?: Error, duration?: number): void => {
  logger.logApiRequest(endpoint, method, requestData, responseData, error, duration);
};

export const debug = (message: string, data?: Record<string, any>, context?: string): void => {
  logger.debug(message, data, context);
};

export const info = (message: string, data?: Record<string, any>, context?: string): void => {
  logger.info(message, data, context);
};

export const warn = (message: string, data?: Record<string, any>, context?: string): void => {
  logger.warn(message, data, context);
};

export const error = (message: string, data?: Record<string, any>, context?: string): void => {
  logger.error(message, data, context);
};

// 导出日志管理器实例
export default logger;

// 性能监控工具 - 仅在debug模式下启用
export const performanceMonitor = {
  // 开始计时
  startTime: (label: string): void => {
    if (DEBUG_CONFIG.IS_DEBUG_MODE && DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING) {
      if (typeof window !== 'undefined' && window.performance) {
        window.performance.mark(`start_${label}`);
      }
    }
  },
  
  // 结束计时并记录
  endTime: (label: string): void => {
    if (DEBUG_CONFIG.IS_DEBUG_MODE && DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING) {
      if (typeof window !== 'undefined' && window.performance) {
        try {
          window.performance.mark(`end_${label}`);
          window.performance.measure(label, `start_${label}`, `end_${label}`);
          
          const measures = window.performance.getEntriesByName(label);
          if (measures && measures.length > 0) {
            const duration = measures[measures.length - 1].duration;
            logger.debug(`性能监控: ${label} - ${duration.toFixed(2)}ms`, { duration }, 'performance');
          }
        } catch (error) {
          logger.error('性能监控失败', { label, error: error instanceof Error ? error.message : 'Unknown error' }, 'performance');
        }
      }
    }
  },
  
  // 清除所有性能标记
  clearMarks: (): void => {
    if (DEBUG_CONFIG.IS_DEBUG_MODE && DEBUG_CONFIG.OPTIONS.PERFORMANCE_MONITORING) {
      if (typeof window !== 'undefined' && window.performance) {
        window.performance.clearMarks();
        window.performance.clearMeasures();
      }
    }
  }
};

// 状态追踪工具 - 仅在debug模式下启用
export const stateTracer = {
  // 记录状态更新
  trace: (component: string, stateName: string, oldValue: any, newValue: any): void => {
    if (DEBUG_CONFIG.IS_DEBUG_MODE && DEBUG_CONFIG.OPTIONS.TRACE_STATE_UPDATES) {
      const data = {
        component,
        stateName,
        oldValue: JSON.stringify(oldValue),
        newValue: JSON.stringify(newValue),
        timestamp: new Date().toISOString()
      };
      logger.debug(`状态更新: ${component}.${stateName}`, data, 'state');
    }
  }
};