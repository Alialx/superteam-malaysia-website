"use client"

import { motion } from "framer-motion"
import AnimatedButton from "./Button"
import BounceCards from '@/components/WhyCards'

export default function BeMemberSection() {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1.4fr_2.5fr] items-center w-full mb-35 md:mb-20 lg:mb-50">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col lg:items-start lg:text-left text-center items-center gap-3 lg:gap-5"
      >
        <h2
          className="text-[clamp(2rem,6vw,3.75rem)] font-light italic leading-tight text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Superteam is a Cheat Code
        </h2>

        <p
          className="text-[clamp(0.75rem,3vw,1.25rem)] text-[#E0E0E0] text-extralight italic leading-relaxed lg:max-w-[550px] max-w-[400px] lg:pt-5"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Superteam gives builders an unfair advantage. Access to the right people, opportunities, and support. Because building is always easier when you’re not doing it alone.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex items-center justify-center overflow-hidden"
      >
        <BounceCards
          containerWidth={1500}
          containerHeight={480}
          animationDelay={0.3}
          enableHover={true}
        />
      </motion.div>
    </div>
  )
}