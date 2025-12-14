'use client'

import { motion, useInView } from 'framer-motion'
import { Recycle, Leaf, TrendingDown, Globe } from 'lucide-react'
import { useRef } from 'react'

export function Sustainability() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const impacts = [
    {
      icon: Recycle,
      title: 'Repurposed Materials',
      description: 'Transform old generator boxes into functional housing, reducing waste',
      stat: '100%',
      statLabel: 'Repurposed from existing materials',
      color: 'text-green-500',
    },
    {
      icon: TrendingDown,
      title: 'Reduced Construction Waste',
      description: 'No new construction means zero construction waste and emissions',
      stat: '85%',
      statLabel: 'Less waste vs traditional construction',
      color: 'text-blue-500',
    },
    {
      icon: Leaf,
      title: 'Lower Carbon Footprint',
      description: 'Reusable, transportable design significantly reduces environmental impact',
      stat: '60%',
      statLabel: 'Carbon footprint reduction',
      color: 'text-emerald-500',
    },
    {
      icon: Globe,
      title: 'Circular Economy',
      description: 'Promoting sustainable practices through reuse and recycling',
      stat: '∞',
      statLabel: 'Reusable lifespan',
      color: 'text-purple-500',
    },
  ]

  return (
    <section
      ref={ref}
      id="sustainability"
      className="py-24 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-600 dark:text-green-400 font-semibold">
              Sustainability Impact
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Building a Sustainable Future
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every capsule represents a commitment to environmental responsibility
            through repurposing, reuse, and reduced waste.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <motion.div
              key={impact.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 border border-green-200 dark:border-gray-700"
            >
              <motion.div
                className={`w-12 h-12 ${impact.color} mb-4`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <impact.icon className="w-full h-full" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {impact.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {impact.description}
              </p>
              <div className="border-t border-green-200 dark:border-gray-700 pt-4">
                <div className={`text-3xl font-bold ${impact.color} mb-1`}>
                  {impact.stat}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {impact.statLabel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visual Impact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Our Environmental Promise</h3>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            By repurposing existing materials and creating reusable solutions, we&apos;re
            not just providing accommodation—we&apos;re building a more sustainable future
            for temporary housing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-5xl font-bold mb-2">100%</div>
              <div className="text-green-100">Repurposed Materials</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-green-100">Waste Reduction</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">60%</div>
              <div className="text-green-100">Lower Carbon Footprint</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

