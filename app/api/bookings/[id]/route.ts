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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['GET'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    const { id } = params
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        capsule: true,
      },
    })

    if (!booking) {
      return createErrorResponse('Booking not found', 404)
    }

    // Check if user has access (admin or owner)
    const authResult = await requireAuth(req)
    if (!authResult.user) {
      return createErrorResponse('Unauthorized', 401)
    }

    if (authResult.user.role !== 'admin' && booking.email !== authResult.user.email) {
      return createErrorResponse('Forbidden', 403)
    }

    return createApiResponse(booking)
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

    // Only allow updating status and capsuleId
    const updateData: any = {}
    if (body.status) updateData.status = body.status
    if (body.capsuleId) updateData.capsuleId = body.capsuleId

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
    })

    logger.info('Booking updated', { bookingId: id, updates: updateData })

    return createApiResponse(booking, 'Booking updated successfully')
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

    await prisma.booking.delete({
      where: { id },
    })

    logger.info('Booking deleted', { bookingId: id })

    return createApiResponse(null, 'Booking deleted successfully')
  }, request)
}

