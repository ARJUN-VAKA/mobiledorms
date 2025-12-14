'use client'

import { motion, useInView } from 'framer-motion'
import { Brain, TrendingUp, MapPin, Calendar, BarChart3 } from 'lucide-react'
import { useRef } from 'react'

export function AIPrediction() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const benefits = [
    {
      icon: Calendar,
      title: 'Event-Based Prediction',
      description: 'Analyze upcoming festivals, concerts, and events to predict demand spikes',
      stat: '92%',
      statLabel: 'Accuracy in demand forecasting',
    },
    {
      icon: TrendingUp,
      title: 'Seasonal Trends',
      description: 'Learn from historical patterns to optimize deployment timing',
      stat: '40%',
      statLabel: 'Cost reduction through optimization',
    },
    {
      icon: MapPin,
      title: 'Smart Deployment',
      description: 'AI recommends optimal locations and quantities for maximum efficiency',
      stat: '3x',
      statLabel: 'Faster deployment decisions',
    },
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Monitor occupancy, pricing, and demand in real-time',
      stat: '24/7',
      statLabel: 'Continuous monitoring',
    },
  ]

  return (
    <section
      ref={ref}
      id="ai-prediction"
      className="py-24 bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900 px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Brain className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            <span className="text-primary-600 dark:text-primary-400 font-semibold">
              AI-Powered Intelligence
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Demand Prediction Engine
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Machine learning algorithms analyze events, seasonality, and
            historical data to predict accommodation demand, enabling smart
            deployment and cost optimization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  {benefit.description}
                </p>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                    {benefit.stat}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {benefit.statLabel}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Data Visualization Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              Demand Forecast
            </h3>
            <div className="space-y-4">
              {/* Mock Chart Bars */}
              {[
                { label: 'Jan', value: 40, color: 'bg-primary-400' },
                { label: 'Feb', value: 35, color: 'bg-primary-400' },
                { label: 'Mar', value: 50, color: 'bg-primary-500' },
                { label: 'Apr', value: 65, color: 'bg-primary-600' },
                { label: 'May', value: 80, color: 'bg-primary-600' },
                { label: 'Jun', value: 95, color: 'bg-primary-700' },
                { label: 'Jul', value: 100, color: 'bg-primary-700' },
                { label: 'Aug', value: 90, color: 'bg-primary-600' },
              ].map((bar, index) => (
                <div key={bar.label} className="flex items-center gap-4">
                  <div className="w-8 text-sm text-gray-600 dark:text-gray-400">
                    {bar.label}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                    <motion.div
                      className={`h-full ${bar.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${bar.value}%` } : {}}
                      transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                    />
                  </div>
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                    {bar.value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">
                  Peak Season Prediction
                </span>
                <span className="font-semibold text-primary-600 dark:text-primary-400">
                  July - August
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-8 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">92%</div>
              <div className="text-primary-100">Forecast Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">40%</div>
              <div className="text-primary-100">Cost Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3x</div>
              <div className="text-primary-100">Faster Decisions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

