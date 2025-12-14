import { Navbar } from '@/components/Navbar'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Hero } from '@/components/Hero'
import { Problem } from '@/components/Problem'
import { Solution } from '@/components/Solution'
import { Features } from '@/components/Features'
import { AIPrediction } from '@/components/AIPrediction'
import { Booking } from '@/components/Booking'
import { UseCases } from '@/components/UseCases'
import { Sustainability } from '@/components/Sustainability'
import { Partners } from '@/components/Partners'
import { CTA } from '@/components/CTA'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <ThemeToggle />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <AIPrediction />
      <Booking />
      <UseCases />
      <Sustainability />
      <Partners />
      <CTA />
      <Footer />
    </main>
  )
}

