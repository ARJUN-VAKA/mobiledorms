'use client'

import { motion, useInView } from 'framer-motion'
import { Building2, Users, Shield, Calendar } from 'lucide-react'
import { useRef } from 'react'
import { PartnerForm } from './PartnerForm'

export function Partners() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const partnerTypes = [
    {
      icon: Calendar,
      title: 'Event Organizers',
      description: 'Partner with us to provide accommodation solutions for your festivals, concerts, and large-scale events',
      benefits: ['Scalable Solutions', 'Quick Deployment', 'Cost-Effective'],
      color: 'from-purple-500 to-pink-600',
    },
    {
      icon: Building2,
      title: 'Corporates',
      description: 'Temporary housing for construction projects, remote work sites, and corporate events',
      benefits: ['Project-Based Solutions', 'Flexible Terms', 'Professional Service'],
      color: 'from-blue-500 to-cyan-600',
    },
    {
      icon: Shield,
      title: 'Government & Smart Cities',
      description: 'Support smart city initiatives, emergency preparedness, and public infrastructure projects',
      benefits: ['Emergency Response', 'Public-Private Partnership', 'Scalable Infrastructure'],
      color: 'from-green-500 to-emerald-600',
    },
    {
      icon: Users,
      title: 'NGOs & Humanitarian',
      description: 'Collaborate on disaster relief, refugee housing, and humanitarian missions',
      benefits: ['Rapid Deployment', 'Cost-Effective', 'Sustainable Solutions'],
      color: 'from-orange-500 to-red-600',
    },
  ]

  return (
    <section
      ref={ref}
      id="partners"
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
            Partners & Collaborations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Join us in revolutionizing temporary accommodation. We work with
            organizations across industries to deliver smart, sustainable solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {partnerTypes.map((partner, index) => (
            <motion.div
              key={partner.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <motion.div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center mb-6`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <partner.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">
                {partner.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {partner.description}
              </p>
              
              <div className="space-y-2">
                <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Key Benefits:
                </div>
                {partner.benefits.map((benefit, idx) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 + idx * 0.05 }}
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${partner.color}`} />
                    {benefit}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partner Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <PartnerForm />
        </motion.div>
      </div>
    </section>
  )
}

