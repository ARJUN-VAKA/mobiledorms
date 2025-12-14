const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@mobiledorms.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@mobiledorms.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  })

  console.log('Created admin user:', admin.email)

  // Create sample capsules (MongoDB uses auto-generated ObjectIds)
  const existingCapsules = await prisma.capsule.findMany({
    where: {
      name: { in: ['Capsule Unit A', 'Capsule Unit B', 'Capsule Unit C'] },
    },
  })

  const capsuleNames = existingCapsules.map((c) => c.name)

  const capsulesToCreate = [
    {
      name: 'Capsule Unit A',
      location: 'Austin, TX',
      capacity: 8,
      status: 'available',
      pricePerNight: 45,
      features: JSON.stringify(['WiFi', 'AC', 'Lockers']),
    },
    {
      name: 'Capsule Unit B',
      location: 'Los Angeles, CA',
      capacity: 8,
      status: 'available',
      pricePerNight: 50,
      features: JSON.stringify(['WiFi', 'AC', 'Lockers', 'Solar']),
    },
    {
      name: 'Capsule Unit C',
      location: 'Miami, FL',
      capacity: 8,
      status: 'available',
      pricePerNight: 55,
      features: JSON.stringify(['WiFi', 'AC', 'Lockers']),
    },
  ].filter((capsule) => !capsuleNames.includes(capsule.name))

  if (capsulesToCreate.length > 0) {
    const capsules = await prisma.capsule.createMany({
      data: capsulesToCreate,
    })
    console.log('Created capsules:', capsules.count)
  } else {
    console.log('Capsules already exist')
  }

  console.log('Created capsules:', capsules.length)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

