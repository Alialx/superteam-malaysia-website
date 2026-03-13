"use client"

import { motion } from "framer-motion"
import AnimatedButton from "./Button"

export default function CTASection() {
  return (
    <section className="w-full flex justify-center">
      <div className="flex flex-col items-center justify-center text-center max-w-[900px] px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <h2
            className="text-[clamp(2rem,6vw,3.75rem)] font-light italic leading-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Begin Your Journey with Superteam Malaysia
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <p
            className="text-[clamp(0.75rem,3vw,1.25rem)] text-[#E0E0E0] font-extralight italic leading-relaxed mt-6 max-w-[800px]"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Join a community of Malaysia's sharpest Web3 minds. Whether you're shipping code,
            designing products, or growing ecosystems, there's a place for you here.
          </p>
        </motion.div>

        <div className="mt-6">
            <AnimatedButton
                href="https://t.me/SuperteamMY"
                label="Join Now"
                delay={0.4}
            />
        </div>
      </div>
    </section>
  )
}