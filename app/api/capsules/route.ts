import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  withErrorHandling,
  createApiResponse,
  createErrorResponse,
  validateMethod,
} from '@/lib/middleware'
import { requireAuth } from '@/lib/auth'
import { logger } from '@/lib/logger'
import { z } from 'zod'

const capsuleSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  capacity: z.number().min(1).max(100),
  status: z.enum(['available', 'booked', 'maintenance']),
  pricePerNight: z.number().min(0),
  features: z.string().optional(),
})

export async function POST(request: NextRequest) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['POST'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    // Require admin access
    const authResult = await requireAuth(req, 'admin')
    if (!authResult.user) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401)
    }

    const body = await req.json()
    const validatedData = capsuleSchema.parse(body)

    const capsule = await prisma.capsule.create({
      data: {
        name: validatedData.name,
        location: validatedData.location,
        capacity: validatedData.capacity,
        status: validatedData.status,
        pricePerNight: validatedData.pricePerNight,
        features: validatedData.features,
      },
    })

    logger.info('Capsule created', { capsuleId: capsule.id, name: capsule.name })

    return createApiResponse(capsule, 'Capsule created successfully', 201)
  }, request)
}

export async function GET(request: NextRequest) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['GET'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const location = searchParams.get('location')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (location) {
      // MongoDB search - case-sensitive by default
      // For case-insensitive, you'd need to use raw queries or handle in application
      where.location = {
        contains: location,
      }
    }

    const [capsules, total] = await Promise.all([
      prisma.capsule.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          bookings: {
            where: {
              status: 'confirmed',
            },
            select: {
              id: true,
              eventDate: true,
              duration: true,
            },
          },
        },
      }),
      prisma.capsule.count({ where }),
    ])

    return createApiResponse({
      capsules,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  }, request)
}

