'use client'

import { motion } from 'framer-motion'
import { AnimatedButtonProps } from '@/types';

export default function AnimatedButton({
  href,
  label = '',
  delay = 0.28,
  external = false,
}: AnimatedButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <a
        href={href}
        target={external ? '_blank' : '_self'}
        rel={external ? 'noopener noreferrer' : undefined}
        className="
          group relative inline-flex items-center gap-2
          px-3 py-1.5
          sm:px-5 sm:py-2
          lg:px-7 lg:py-3
          text-[11px] sm:text-sm
          text-white/80 italic font-light w-fit
          hover:text-white
          transition-all duration-300
        "
        style={{
          fontFamily: "'Inter', sans-serif",
          backgroundColor: '#121212',
        }}
      >
        <span
          className="absolute inset-0 transition-colors duration-300"
          style={{ border: '1px solid #444444' }}
        />

        <span
          className="absolute top-0 left-0 w-2 h-2 sm:w-3 sm:h-3"
          style={{
            borderTop: '2px solid #3C2B8C',
            borderLeft: '2px solid #3C2B8C',
          }}
        />

        <span
          className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3"
          style={{
            borderTop: '2px solid #3C2B8C',
            borderRight: '2px solid #3C2B8C',
          }}
        />

        <span
          className="absolute bottom-0 left-0 w-2 h-2 sm:w-3 sm:h-3"
          style={{
            borderBottom: '2px solid #3C2B8C',
            borderLeft: '2px solid #3C2B8C',
          }}
        />

        <span
          className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3"
          style={{
            borderBottom: '2px solid #3C2B8C',
            borderRight: '2px solid #3C2B8C',
          }}
        />

        {label}
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    </motion.div>
  )
}