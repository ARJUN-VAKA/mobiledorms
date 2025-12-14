import { NextRequest } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}
const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100 // 100 requests per window

function getClientId(req: NextRequest): string {
  // Try to get IP from various headers
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'
  return ip
}

export async function rateLimit(
  req: NextRequest
): Promise<{ success: boolean; remaining?: number }> {
  const clientId = getClientId(req)
  const now = Date.now()

  // Clean up old entries
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })

  // Get or create client entry
  if (!store[clientId]) {
    store[clientId] = {
      count: 0,
      resetTime: now + RATE_LIMIT_WINDOW,
    }
  }

  const client = store[clientId]

  // Reset if window expired
  if (client.resetTime < now) {
    client.count = 0
    client.resetTime = now + RATE_LIMIT_WINDOW
  }

  // Check limit
  if (client.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      success: false,
      remaining: 0,
    }
  }

  // Increment count
  client.count++

  return {
    success: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - client.count,
  }
}

