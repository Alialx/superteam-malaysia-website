"use client"

import { motion } from "framer-motion"
import AnimatedButton from "./Button";

export default function MemberTextSection() {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3 items-center justify-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col text-center lg:text-left lg:items-start items-center"
        >
          <h2
            className="text-[clamp(2rem,6vw,3.75rem)] font-light italic leading-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Our Members
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col items-center lg:items-end text-center lg:text-left justify-center"
        >
          <p
            className="text-[clamp(0.75rem,3vw,1.25rem)] text-[#E0E0E0] text-extralight italic leading-relaxed lg:max-w-[550px] max-w-[400px] lg:pt-5"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Every builder has a story. Discover their achievements, skills, and impact.
          </p>

          <div className="mt-5">
            <AnimatedButton
              href="/members"
              label="All Members"
              delay={0.4}
            />
          </div>
        </motion.div>
      </div>
    )
}