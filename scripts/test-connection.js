// Simple helper to validate DATABASE_URL has a database name and attempt a Prisma connection.
// Usage: node scripts/test-connection.js

require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const raw = process.env.DATABASE_URL

if (!raw) {
  console.error('ERROR: DATABASE_URL not found in environment. Fill .env or set DATABASE_URL.')
  process.exit(1)
}

// Remove surrounding quotes if any (dotenv normally strips them, but be safe)
const url = raw.replace(/^"|"$/g, '')

// Quick check: ensure path after host contains a non-empty database name (before ?)
const pathOnly = url.split('?')[0]
const lastSlash = pathOnly.lastIndexOf('/')
const dbName = lastSlash >= 0 ? pathOnly.slice(lastSlash + 1) : ''

if (!dbName) {
  console.error('ERROR: DATABASE_URL is missing a database name in the path segment. Example:')
  console.error('  mongodb+srv://user:pass@cluster.mongodb.net/mobiledorms?retryWrites=true&w=majority')
  process.exit(2)
}

console.log('Detected database name:', dbName)

const prisma = new PrismaClient()

;(async () => {
  try {
    console.log('Attempting to connect with Prisma...')
    await prisma.$connect()
    console.log('Prisma connected successfully')

    // Try a simple read to confirm permissions (if the model exists)
    try {
      const count = await prisma.user.count()
      console.log('Sample check: users count =', count)
    } catch (e) {
      // Some databases may not have users collection or permission; this is non-fatal
      console.log('Sample query failed (this may be normal if collection is empty or permission denied):', e.message)
    }

    await prisma.$disconnect()
    process.exit(0)
  } catch (err) {
    console.error('Connection failed:', err.message || err)
    try {
      await prisma.$disconnect()
    } catch (_) {
      // ignore
    }
    process.exit(3)
  }
})()
