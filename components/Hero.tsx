'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import ShinyText from '@/components/ShinyText' // adjust path if needed
import AnimatedButton from './Button'

export default function HeroSection() {
  return (
    <div className="relative w-full min-h-[350px]">

      <div className="lg:max-w-[350px] max-w-[150px] flex flex-col gap-3 lg:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <ShinyText
            text="Where Malaysian Web3 Talent Meets Global Opportunities"
            speed={4}
            delay={0.2}
            color="#ffffff"
            shineColor="#3c2b8c"
            spread={110}
            direction="left"
            className="text-[clamp(1rem,2vw,1.4rem)] text-white font-extralight italic leading-tight"
          />
        </motion.div>

        <AnimatedButton
          href="/about"
          label="Learn More"
          delay={0.4}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9 }}
        className="lg:mt-70 mt-8 md:mt-30 lg:bottom-16 text-right justify-end align-right items-right text-right"
      >
        <h2
          className="text-[clamp(2rem,6vw,6rem)] font-light italic leading-none text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Home to Malaysia's <br/> Solana Community
        </h2>
      </motion.div>

    </div>
  )
}