'use client'

import { motion, useInView } from 'framer-motion'
import { Recycle, Box, Truck, Zap, Home, ArrowRight } from 'lucide-react'
import { useRef } from 'react'

export function Solution() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const steps = [
    {
      icon: Recycle,
      title: 'Repurposed Generator Box',
      description: 'Transform old generator boxes into sustainable housing units',
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Box,
      title: 'Foldable Hinged Design',
      description: 'Smart engineering allows compact folding for efficient storage',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Truck,
      title: 'Easy Transport',
      description: 'Lightweight and stackable for cost-effective logistics',
      color: 'from-orange-500 to-red-600',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description: 'Set up in hours, not weeks. Ready for immediate use',
      color: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Home,
      title: 'Comfortable Living',
      description: 'Full amenities including beds, lockers, ventilation, and power',
      color: 'from-purple-500 to-pink-600',
    },
  ]

  return (
    <section
      ref={ref}
      id="solution"
      className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Our Solution
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A complete transformation from waste to wonder. Five simple steps to
            smart, sustainable accommodation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400 transform -translate-y-1/2 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 relative z-10">
                  <motion.div
                    className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 mx-auto`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <step.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visual Flow Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <motion.div
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              📦
            </motion.div>
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-8 h-8 text-primary-600" />
            </motion.div>
            <motion.div
              className="text-4xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🏠
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

