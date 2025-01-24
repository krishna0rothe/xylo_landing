"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { services } from "@/data/services"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const currentService = services[currentIndex]

  return (
    <div
      className="relative min-h-screen px-16 overflow-hidden transition-colors duration-1000 ease-in-out"
      style={{
        background: `linear-gradient(to  top , black, ${currentService.color})`,
      }}
    >
      <div className="container relative mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column - Content */}
        <motion.div initial="initial" animate="animate" variants={stagger} className="space-y-6">
          <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white" variants={fadeInUp}>
            Your All-in-One
            <motion.span className="text-gray-00 block" variants={fadeInUp}>
              Game Development
            </motion.span>
            Platform
          </motion.h1>

          <motion.p className="text-lg text-gray-300 max-w-lg" variants={fadeInUp}>
            Simplify game creation, and  marketing, and monetization. Focus on creating great games while we handle
            everything else.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4" variants={fadeInUp}>
            <motion.button
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium transition-colors rounded-lg bg-white text-black hover:bg-gray-500 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium transition-all duration-200 ease-in-out rounded-lg border border-primary bg-black text-white hover:bg-white hover:text-black hover:border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Features
            </motion.button>
          </motion.div>

          <motion.p className="text-sm text-gray-400" variants={fadeInUp}>
            No credit card required • Free tier available
          </motion.p>
        </motion.div>

        {/* Right Column - Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative lg:block"
        >
          <div className="relative">
            {/* Dashboard Preview */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="rounded-lg border border-gray-800 bg-gray-900 shadow-2xl overflow-hidden"
              >
                <motion.img
                  src={currentService.image || "/placeholder.svg"}
                  alt={`${currentService.title} Preview`}
                  className="rounded-lg w-full h-full object-cover"
                  animate={{
                    y: [0, -10, 0],
                    transition: {
                      duration: 5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    },
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Feature Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="absolute  -bottom-6 -left-6 bg-primary p-6 rounded-lg shadow-lg max-w-sm"
              >
                <motion.h3
                  className="text-lg font-semibold text-white mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {currentService.title}
                </motion.h3>
                <motion.p
                  className="text-sm text-white/80"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {currentService.oneLiner}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

