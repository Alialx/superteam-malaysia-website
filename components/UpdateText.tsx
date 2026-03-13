"use client"

import { motion } from "framer-motion"
import AnimatedButton from "./Button"
export default function UpdateTextSection() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start flex w-full gap-3">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col text-center lg:align-left lg:text-left md:align-left md:text-left"
                  >
          <h2
            className="text-[clamp(1.5rem,5vw,3.75rem)] font-light italic leading-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Stay Updated with Our Events
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col justify-center items-center lg:justify-self-end lg:items-end lg:text-left text-center"
        >
          <p
            className="text-[clamp(0.75rem,3vw,1.25rem)] text-[#E0E0E0] text-extralight italic leading-relaxed lg:max-w-[550px] max-w-[400px] lg:pt-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            See what's happening next in the ecosystem.
          </p>
          <div className="mt-3">
              <AnimatedButton
              href="https://lu.ma/mysuperteam"
              label="Follow Our Luma"
              delay={0.4}
              />
            </div>

        </motion.div>
      </div>
    )
}