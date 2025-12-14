import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  withErrorHandling,
  createApiResponse,
  createErrorResponse,
  validateMethod,
} from '@/lib/middleware'
import { requireAuth } from '@/lib/auth'

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

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalInquiries,
      pendingInquiries,
      totalCapsules,
      availableCapsules,
      bookedCapsules,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'pending' } }),
      prisma.booking.count({ where: { status: 'confirmed' } }),
      prisma.partnerInquiry.count(),
      prisma.partnerInquiry.count({ where: { status: 'pending' } }),
      prisma.capsule.count(),
      prisma.capsule.count({ where: { status: 'available' } }),
      prisma.capsule.count({ where: { status: 'booked' } }),
    ])

    // Calculate revenue (confirmed bookings * duration * price)
    const confirmedBookingsData = await prisma.booking.findMany({
      where: { status: 'confirmed' },
      include: {
        capsule: {
          select: {
            pricePerNight: true,
          },
        },
      },
    })

    const revenue = confirmedBookingsData.reduce((sum, booking) => {
      const price = booking.capsule?.pricePerNight || 0
      return sum + price * booking.duration * booking.numberOfCapsules
    }, 0)

    return createApiResponse({
      bookings: {
        total: totalBookings,
        pending: pendingBookings,
        confirmed: confirmedBookings,
        cancelled: totalBookings - pendingBookings - confirmedBookings,
      },
      inquiries: {
        total: totalInquiries,
        pending: pendingInquiries,
      },
      capsules: {
        total: totalCapsules,
        available: availableCapsules,
        booked: bookedCapsules,
        maintenance: totalCapsules - availableCapsules - bookedCapsules,
      },
      revenue: {
        total: revenue,
        currency: 'USD',
      },
    })
  }, request)
}

