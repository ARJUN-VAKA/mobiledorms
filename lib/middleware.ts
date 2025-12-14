import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from './rateLimit'
import { logger } from './logger'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export function createApiResponse<T>(
  data?: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      data,
      message,
    },
    { status }
  )
}

export function createErrorResponse(
  error: string,
  status: number = 500
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  )
}

export async function withErrorHandling(
  handler: (req: NextRequest) => Promise<NextResponse>,
  req: NextRequest
): Promise<NextResponse> {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(req)
    if (!rateLimitResult.success) {
      return createErrorResponse('Too many requests', 429)
    }

    // Execute handler
    return await handler(req)
  } catch (error: any) {
    logger.error('API Error:', {
      error: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
    })

    if (error.name === 'ZodError') {
      return createErrorResponse(
        `Validation error: ${error.errors.map((e: any) => e.message).join(', ')}`,
        400
      )
    }

    if (error.name === 'PrismaClientKnownRequestError') {
      if (error.code === 'P2002') {
        return createErrorResponse('Duplicate entry', 409)
      }
      if (error.code === 'P2025') {
        return createErrorResponse('Record not found', 404)
      }
    }

    return createErrorResponse(
      error.message || 'Internal server error',
      500
    )
  }
}

export function validateMethod(
  req: NextRequest,
  allowedMethods: string[]
): boolean {
  return allowedMethods.includes(req.method)
}

