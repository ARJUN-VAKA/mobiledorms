'use client'

import { motion, useInView } from 'framer-motion'
import { Shield, Wind, Sun, Lock, Zap, Users } from 'lucide-react'
import { useRef } from 'react'

export function Features() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Shield,
      title: 'Foldable Steel Structure',
      description: 'Durable, weather-resistant steel frame with intelligent hinged panels for easy folding and deployment',
      color: 'from-gray-600 to-gray-800',
    },
    {
      icon: Users,
      title: 'Capsule Beds & Lockers',
      description: 'Comfortable sleeping pods with personal storage lockers, ensuring privacy and security',
      color: 'from-blue-500 to-blue-700',
    },
    {
      icon: Wind,
      title: 'Smart Ventilation & Lighting',
      description: 'Automated climate control and energy-efficient LED lighting for optimal comfort',
      color: 'from-cyan-500 to-cyan-700',
    },
    {
      icon: Lock,
      title: 'Fire & Safety Compliance',
      description: 'Full compliance with fire safety standards, emergency exits, and security systems',
      color: 'from-red-500 to-red-700',
    },
    {
      icon: Sun,
      title: 'Solar & Power Systems',
      description: 'Optional solar panels and efficient power management for off-grid capabilities',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Zap,
      title: 'Smart Integration',
      description: 'IoT sensors, app-based access control, and real-time monitoring capabilities',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  return (
    <section
      ref={ref}
      id="features"
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
            Product Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every detail designed for comfort, safety, and sustainability.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

