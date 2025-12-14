import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { bookingSchema } from '@/lib/validations'
import {
  withErrorHandling,
  createApiResponse,
  createErrorResponse,
  validateMethod,
} from '@/lib/middleware'
import { requireAuth } from '@/lib/auth'
import { logger } from '@/lib/logger'

export async function POST(request: NextRequest) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['POST'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    const body = await req.json()
    const validatedData = bookingSchema.parse(body)

    const booking = await prisma.booking.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        eventName: validatedData.eventName,
        eventDate: new Date(validatedData.eventDate),
        location: validatedData.location,
        numberOfCapsules: validatedData.numberOfCapsules,
        duration: validatedData.duration,
        message: validatedData.message,
      },
    })

    logger.info('Booking created', { bookingId: booking.id, email: booking.email })

    return createApiResponse(booking, 'Booking created successfully', 201)
  }, request)
}

export async function GET(request: NextRequest) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['GET'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    // Check authentication for admin access
    const authResult = await requireAuth(req)
    const isAdmin = authResult.user?.role === 'admin'

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    if (status) where.status = status
    if (email && !isAdmin) {
      // Non-admins can only see their own bookings
      where.email = email
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: {
          capsule: {
            select: {
              id: true,
              name: true,
              location: true,
            },
          },
        },
      }),
      prisma.booking.count({ where }),
    ])

    return createApiResponse({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  }, request)
}

