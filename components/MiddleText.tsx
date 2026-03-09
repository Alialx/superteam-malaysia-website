"use client"

import { motion } from "framer-motion"
import { AnimatedTextProps } from "@/types"

export default function AnimatedText({ text, className = ""}: AnimatedTextProps) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col gap-6 pt-2 text-center"
      >
        {text}
      </motion.div>
    )
}