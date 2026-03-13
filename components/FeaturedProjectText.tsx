"use client"

import { motion } from "framer-motion"

export default function FeaturedProjectText() {
    return (
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 items-start flex w-full mb-8 md:mb-15 lg:mb-15">
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
            Featured Projects
          </h2>
        </motion.div>
      </div>
    )
}