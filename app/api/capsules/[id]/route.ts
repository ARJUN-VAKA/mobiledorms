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

const updateCapsuleSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  capacity: z.number().min(1).max(100).optional(),
  status: z.enum(['available', 'booked', 'maintenance']).optional(),
  pricePerNight: z.number().min(0).optional(),
  features: z.string().optional(),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['GET'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    const { id } = params
    const capsule = await prisma.capsule.findUnique({
      where: { id },
      include: {
        bookings: {
          orderBy: { eventDate: 'asc' },
        },
      },
    })

    if (!capsule) {
      return createErrorResponse('Capsule not found', 404)
    }

    return createApiResponse(capsule)
  }, request)
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['PATCH', 'PUT'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    // Require admin for updates
    const authResult = await requireAuth(req, 'admin')
    if (!authResult.user) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401)
    }

    const { id } = params
    const body = await req.json()
    const validatedData = updateCapsuleSchema.parse(body)

    const capsule = await prisma.capsule.update({
      where: { id },
      data: validatedData,
    })

    logger.info('Capsule updated', { capsuleId: id, updates: validatedData })

    return createApiResponse(capsule, 'Capsule updated successfully')
  }, request)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['DELETE'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    // Require admin for deletion
    const authResult = await requireAuth(req, 'admin')
    if (!authResult.user) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401)
    }

    const { id } = params

    // Check if capsule has active bookings
    const activeBookings = await prisma.booking.count({
      where: {
        capsuleId: id,
        status: { in: ['pending', 'confirmed'] },
      },
    })

    if (activeBookings > 0) {
      return createErrorResponse(
        'Cannot delete capsule with active bookings',
        400
      )
    }

    await prisma.capsule.delete({
      where: { id },
    })

    logger.info('Capsule deleted', { capsuleId: id })

    return createApiResponse(null, 'Capsule deleted successfully')
  }, request)
}

