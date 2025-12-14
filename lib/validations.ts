import { z } from 'zod'

export const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  eventName: z.string().min(3, 'Event name must be at least 3 characters'),
  eventDate: z.string().refine((date) => {
    const d = new Date(date)
    return d > new Date()
  }, 'Event date must be in the future'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  numberOfCapsules: z.number().min(1).max(100),
  duration: z.number().min(1).max(365),
  message: z.string().optional(),
})

export const partnerInquirySchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  contactName: z.string().min(2, 'Contact name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Invalid phone number'),
  partnerType: z.enum(['event', 'corporate', 'government', 'ngo']),
  message: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingSchema>
export type PartnerInquiryFormData = z.infer<typeof partnerInquirySchema>

