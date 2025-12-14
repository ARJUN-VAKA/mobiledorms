import { NextRequest } from 'next/server'
import { prisma } from './prisma'
import * as bcrypt from 'bcryptjs'

export interface AuthUser {
  id: string
  email: string
  name: string | null
  role: string
}

export async function verifyAuth(
  req: NextRequest
): Promise<{ user: AuthUser | null; error?: string }> {
  try {
    // Get auth token from header
    const authHeader = req.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { user: null, error: 'No authorization token provided' }
    }

    const token = authHeader.substring(7)

    // In a real app, you'd verify JWT token here
    // For now, we'll use a simple API key approach or session-based auth
    // This is a placeholder - implement proper JWT verification
    
    // For admin routes, you might want to check session or API key
    const apiKey = req.headers.get('x-api-key')
    
    if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
      // Find admin user
      const admin = await prisma.user.findFirst({
        where: { role: 'admin' },
      })

      if (admin) {
        return {
          user: {
            id: admin.id,
            email: admin.email,
            name: admin.name,
            role: admin.role,
          },
        }
      }
    }

    return { user: null, error: 'Invalid authentication' }
  } catch (error) {
    return { user: null, error: 'Authentication failed' }
  }
}

export async function requireAuth(
  req: NextRequest,
  requiredRole?: 'admin' | 'user'
): Promise<{ user: AuthUser; error?: never } | { user: null; error: string }> {
  const authResult = await verifyAuth(req)

  if (!authResult.user) {
    return { user: null, error: authResult.error || 'Unauthorized' }
  }

  if (requiredRole === 'admin' && authResult.user.role !== 'admin') {
    return { user: null, error: 'Admin access required' }
  }

  return { user: authResult.user }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

