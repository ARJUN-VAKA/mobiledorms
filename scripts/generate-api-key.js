// Simple script to generate a secure API key
const crypto = require('crypto')

// Generate a 64-character random hex string
const apiKey = crypto.randomBytes(32).toString('hex')

console.log('\n🔑 Generated Admin API Key:')
console.log('='.repeat(64))
console.log(apiKey)
console.log('='.repeat(64))
console.log('\nAdd this to your .env file:')
console.log(`ADMIN_API_KEY="${apiKey}"`)
console.log('\n⚠️  Keep this key secret and never commit it to version control!\n')

