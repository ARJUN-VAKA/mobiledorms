'use client'

import { motion, useInView } from 'framer-motion'
import { Users, Calendar, AlertTriangle, TrendingUp } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    requestAnimationFrame(animate)
  }, [isInView, value, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

export function Problem() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const problems = [
    {
      icon: Users,
      title: 'Accommodation Shortages',
      description: 'Millions face housing challenges during peak events and emergencies',
      stat: '2.5M',
      statLabel: 'People affected annually',
      color: 'text-red-500',
    },
    {
      icon: Calendar,
      title: 'Seasonal Demand Spikes',
      description: 'Tourism and events create unpredictable accommodation needs',
      stat: '85%',
      statLabel: 'Price surge during peak seasons',
      color: 'text-orange-500',
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Response',
      description: 'Disaster zones need rapid, scalable housing solutions',
      stat: '48hrs',
      statLabel: 'Average deployment time needed',
      color: 'text-yellow-500',
    },
    {
      icon: TrendingUp,
      title: 'Waste & Cost',
      description: 'Traditional construction creates waste and high costs',
      stat: '40%',
      statLabel: 'Construction waste reduction potential',
      color: 'text-green-500',
    },
  ]

  return (
    <section
      ref={ref}
      id="problem"
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            The Accommodation Challenge
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Temporary accommodation shortages affect millions during events,
            peak seasons, and emergencies. Traditional solutions are slow,
            expensive, and wasteful.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow"
            >
              <motion.div
                className={`w-12 h-12 ${problem.color} mb-4`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <problem.icon className="w-full h-full" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {problem.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {problem.description}
              </p>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className={`text-3xl font-bold ${problem.color} mb-1`}>
                  <AnimatedCounter value={parseFloat(problem.stat.replace(/[^\d.]/g, ''))} suffix={problem.stat.includes('%') ? '%' : problem.stat.includes('M') ? 'M' : problem.stat.includes('hrs') ? 'hrs' : ''} />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {problem.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

