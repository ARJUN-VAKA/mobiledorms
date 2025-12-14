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

    // Require admin access
    const authResult = await requireAuth(req, 'admin')
    if (!authResult.user) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401)
    }

    const { id } = params
    const inquiry = await prisma.partnerInquiry.findUnique({
      where: { id },
    })

    if (!inquiry) {
      return createErrorResponse('Partner inquiry not found', 404)
    }

    return createApiResponse(inquiry)
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

    // Only allow updating status
    const updateData: any = {}
    if (body.status) updateData.status = body.status

    const inquiry = await prisma.partnerInquiry.update({
      where: { id },
      data: updateData,
    })

    logger.info('Partner inquiry updated', { inquiryId: id, updates: updateData })

    return createApiResponse(inquiry, 'Partner inquiry updated successfully')
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

    await prisma.partnerInquiry.delete({
      where: { id },
    })

    logger.info('Partner inquiry deleted', { inquiryId: id })

    return createApiResponse(null, 'Partner inquiry deleted successfully')
  }, request)
}

