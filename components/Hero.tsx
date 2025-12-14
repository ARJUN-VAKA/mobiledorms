'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-200 dark:bg-primary-900 rounded-full blur-3xl opacity-30"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-300 dark:bg-primary-800 rounded-full blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        style={{ opacity, y }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 md:pt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 dark:from-white dark:via-primary-400 dark:to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Foldable Mobile
            <br />
            Dormitory Capsules
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transform repurposed generator boxes into smart, deployable
            accommodation. AI-powered demand prediction meets sustainable
            innovation.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.a
              href="#cta"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg text-lg font-semibold flex items-center gap-2 hover:bg-primary-700 transition-colors"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              Book a Capsule
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#partners"
              className="px-8 py-4 bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 rounded-lg text-lg font-semibold border-2 border-primary-600 dark:border-primary-400 flex items-center gap-2 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Partner With Us
              <Play className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Animated Capsule Illustration */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <CapsuleAnimation />
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

function CapsuleAnimation() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStage((prev) => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-4xl mx-auto h-64">
      {/* Folded State */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: stage === 0 ? 1 : 0,
          scale: stage === 0 ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-gray-800 dark:bg-gray-700 rounded-lg p-8 shadow-2xl">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">📦</div>
            <div className="text-lg font-semibold">Folded & Compact</div>
            <div className="text-sm text-gray-400">Ready for Transport</div>
          </div>
        </div>
      </motion.div>

      {/* Transport State */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: stage === 1 ? 1 : 0,
          x: stage === 1 ? 0 : -50,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-primary-600 rounded-lg p-8 shadow-2xl">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">🚚</div>
            <div className="text-lg font-semibold">Easy Transport</div>
            <div className="text-sm text-primary-200">Efficient Deployment</div>
          </div>
        </div>
      </motion.div>

      {/* Deployed State */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{
          opacity: stage === 2 ? 1 : 0,
          scale: stage === 2 ? 1 : 0.8,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-green-600 rounded-lg p-8 shadow-2xl">
          <div className="text-white text-center">
            <div className="text-4xl mb-2">🏠</div>
            <div className="text-lg font-semibold">Deployed & Ready</div>
            <div className="text-sm text-green-200">Comfortable Living Space</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

