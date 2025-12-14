import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { partnerInquirySchema } from '@/lib/validations'
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
    const validatedData = partnerInquirySchema.parse(body)

    const inquiry = await prisma.partnerInquiry.create({
      data: {
        organizationName: validatedData.organizationName,
        contactName: validatedData.contactName,
        email: validatedData.email,
        phone: validatedData.phone,
        partnerType: validatedData.partnerType,
        message: validatedData.message,
      },
    })

    logger.info('Partner inquiry created', {
      inquiryId: inquiry.id,
      organization: inquiry.organizationName,
    })

    return createApiResponse(inquiry, 'Partner inquiry submitted successfully', 201)
  }, request)
}

export async function GET(request: NextRequest) {
  return withErrorHandling(async (req) => {
    if (!validateMethod(req, ['GET'])) {
      return createErrorResponse('Method not allowed', 405)
    }

    // Require admin access
    const authResult = await requireAuth(req, 'admin')
    if (!authResult.user) {
      return createErrorResponse(authResult.error || 'Unauthorized', 401)
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const partnerType = searchParams.get('partnerType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const skip = (page - 1) * limit

    const where: any = {}
    if (status) where.status = status
    if (partnerType) where.partnerType = partnerType

    const [inquiries, total] = await Promise.all([
      prisma.partnerInquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.partnerInquiry.count({ where }),
    ])

    return createApiResponse({
      inquiries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    })
  }, request)
}

