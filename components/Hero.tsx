'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ShinyText from '@/components/ShinyText' // adjust path if needed

export default function HeroSection() {
  return (
    <div className="flex-1 max-w-6xl flex flex-col gap-6 sm:gap-8 lg:gap-10">
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="font-bold leading-tight max-w-6xl text-[clamp(1.5rem,5vw,4.5rem)]"
      >
        Malaysia&apos;s Home
        <br />
        for Solana Builders
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <ShinyText
          text="Where builders, creators, and founders come together."
          speed={4}
          delay={0.2}
          color="#ffffff"
          shineColor="#3c2b8c"
          spread={110}
          direction="left"
          yoyo={false}
          pauseOnHover={false}
          disabled={false}
          className="text-[clamp(1rem,2.5vw,1.5rem)] text-white font-extralight italic max-w-[350px] leading-relaxed"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <a
          href="https://lu.ma/superteammy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
            border border-white/20 text-white/80 text-sm italic font-medium w-fit
            hover:border-white/40 hover:text-white hover:bg-white/5
            transition-all duration-300 backdrop-blur-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Learn More
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </motion.div>
    </div>
  )
}