import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mobile Dorms - Foldable Mobile Dormitory Capsules',
  description: 'Transform repurposed generator boxes into foldable, mobile dormitory capsules. AI-powered demand prediction and smart deployment for events, tourism, and emergencies.',
  keywords: 'mobile dormitories, foldable accommodation, temporary housing, event accommodation, disaster relief housing',
  openGraph: {
    title: 'Mobile Dorms - Foldable Mobile Dormitory Capsules',
    description: 'AI-powered foldable mobile dormitory capsules for smart accommodation deployment',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

