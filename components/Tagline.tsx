'use client'

import { motion } from 'framer-motion'
import { AnimatedTaglineProps } from '@/types'

export default function AnimatedTagline({ text, className = "" }: AnimatedTaglineProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="text-white text-center py-8"
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`text-[clamp(1rem,2.5vw,1.5rem)] text-white font-extralight italic text-center ${className}`}
      >
        {text}
      </motion.p>
    </motion.div>
  )
}