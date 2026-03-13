"use client"

import { motion } from "framer-motion"

export default function EcosystemTextSection() {
    return (
      <section>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 items-start flex w-full">
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col text-center lg:align-left lg:text-left md:align-left md:text-left"
            >
            <h2
              className="text-[clamp(2rem,6vw,3.75rem)] font-light italic leading-tight text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
            Ecosystem Partners
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col lg:justify-self-end lg:items-end lg:text-left text-center md:justify-center md:text-center"
            >
            <p
              className="text-[clamp(0.75rem,3vw,1.25rem)] text-[#E0E0E0] text-extralight italic leading-relaxed lg:max-w-[550px] mb-5 lg:pt-5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              We work closely with ecosystem partners across the Solana network to connect Malaysian builders with global projects, opportunities, and resources.    
            </p>
          </motion.div>

        </div>
      </section>
    )
}