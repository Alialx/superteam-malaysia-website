"use client"

import ScrambledText from '@/components/ScrambleText';
import { motion } from 'framer-motion'

export default function LongTagline() {
    return (
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-6xl mx-auto px-2 lg:px-8 lg:py-2"
        >
        <ScrambledText
        className="scrambled-text-demo"
        radius={30}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
        >
        <span className="text-clamp(1rem,2.5vm,2rem) font-light text-white italic text-left">
            Superteam Malaysia exists to give every builder, creator, and founder the tools, network, and opportunities they need{" "}
            <a
            href="#"
            className="text-indigo-400 italic hover:text-indigo-300 transition-colors duration-200"
            >
            to win on the global stage
            </a>
            .
        </span>
        </ScrambledText>
        </motion.div>
    )
}
