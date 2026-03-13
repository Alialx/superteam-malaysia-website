"use client"

import { motion } from "framer-motion"
import AnimatedButton from "./Button";

export default function TwitterFeedSection() {
    return (
      <div className="mb-8 md:mb-20 lg:mb-15">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col justify-self-center text-center"
        >
        <h2
            className="text-[clamp(2rem,6vw,3.75rem)] font-light italic leading-tight text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Wall of Love
          </h2>
          
        </motion.div>
      </div>
    )
}