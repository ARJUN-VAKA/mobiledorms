type LogLevel = 'error' | 'warn' | 'info' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  [key: string]: any
}

class Logger {
  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...meta,
    }

    return JSON.stringify(entry)
  }

  error(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.error(this.formatMessage('error', message, meta))
    }
    // In production, you'd send this to a logging service
  }

  warn(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(this.formatMessage('warn', message, meta))
    }
  }

  info(message: string, meta?: any): void {
    if (process.env.NODE_ENV !== 'production') {
      console.info(this.formatMessage('info', message, meta))
    }
  }

  debug(message: string, meta?: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message, meta))
    }
  }
}

export const logger = new Logger()

