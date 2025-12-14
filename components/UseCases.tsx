'use client'

import { motion, useInView } from 'framer-motion'
import { Music, HardHat, Plane, Heart } from 'lucide-react'
import { useRef } from 'react'

export function UseCases() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const useCases = [
    {
      icon: Music,
      title: 'Festivals & Concerts',
      description: 'Provide comfortable accommodation for event attendees, reducing local hotel pressure and costs',
      color: 'from-pink-500 to-rose-600',
      examples: ['Music Festivals', 'Sports Events', 'Cultural Gatherings'],
    },
    {
      icon: HardHat,
      title: 'Construction & Industry',
      description: 'Temporary housing for construction workers and industrial projects in remote locations',
      color: 'from-orange-500 to-amber-600',
      examples: ['Construction Sites', 'Mining Projects', 'Infrastructure Development'],
    },
    {
      icon: Plane,
      title: 'Tourism Hotspots',
      description: 'Scale accommodation during peak tourist seasons without permanent infrastructure investment',
      color: 'from-blue-500 to-cyan-600',
      examples: ['Beach Resorts', 'Mountain Destinations', 'Cultural Sites'],
    },
    {
      icon: Heart,
      title: 'Disaster Relief & NGOs',
      description: 'Rapid deployment for emergency housing in disaster zones and humanitarian missions',
      color: 'from-red-500 to-pink-600',
      examples: ['Natural Disasters', 'Refugee Camps', 'Emergency Response'],
    },
  ]

  return (
    <section
      ref={ref}
      id="use-cases"
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
            Use Cases
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Versatile accommodation solutions for diverse needs across industries
            and scenarios.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${useCase.color} opacity-10 rounded-full blur-3xl`} />
              
              <div className="relative z-10">
                <motion.div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${useCase.color} flex items-center justify-center mb-6`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <useCase.icon className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {useCase.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {useCase.description}
                </p>
                
                <div className="space-y-2">
                  {useCase.examples.map((example, idx) => (
                    <motion.div
                      key={example}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.1 + idx * 0.05 }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${useCase.color}`} />
                      {example}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

