'use client'

import { motion, useInView } from 'framer-motion'
import { Smartphone, MapPin, QrCode, DollarSign, Clock } from 'lucide-react'
import { useRef } from 'react'
import { BookingForm } from './BookingForm'

export function Booking() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const features = [
    {
      icon: MapPin,
      title: 'Location-Based Booking',
      description: 'Find and book capsules near your event or location',
      color: 'text-blue-500',
    },
    {
      icon: Clock,
      title: 'Real-Time Availability',
      description: 'See live availability and instant booking confirmation',
      color: 'text-green-500',
    },
    {
      icon: QrCode,
      title: 'QR-Based Check-In',
      description: 'Seamless check-in process with QR code scanning',
      color: 'text-purple-500',
    },
    {
      icon: DollarSign,
      title: 'Dynamic Pricing',
      description: 'Smart pricing based on demand, season, and location',
      color: 'text-orange-500',
    },
  ]

  return (
    <section
      ref={ref}
      id="booking"
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
            Booking Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A seamless app experience for finding, booking, and managing your
            accommodation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left: App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-gray-900 rounded-3xl p-4 shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                {/* Mock Phone Header */}
                <div className="bg-primary-600 text-white p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Mobile Dorms</h3>
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-sm opacity-90 mb-2">Search Location</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">Festival Grounds, Austin</span>
                    </div>
                  </div>
                </div>

                {/* Mock Content */}
                <div className="p-6 space-y-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + item * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🏠</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            Capsule #{item}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Available • $45/night
                          </div>
                        </div>
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                          <QrCode className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
              >
                <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
          <BookingForm />
        </motion.div>
      </div>
    </section>
  )
}

