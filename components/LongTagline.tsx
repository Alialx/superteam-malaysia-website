"use client"

import ScrambledText from '@/components/ScambleText';
import { motion } from 'framer-motion'

export default function LongTagline() {
    return (
        <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="max-w-6xl mx-auto px-8 py-2"
        >
        <ScrambledText
        className="scrambled-text-demo"
        radius={30}
        duration={1.2}
        speed={0.5}
        scrambleChars=".:"
        >
        <span className="block text-3xl font-light leading-relaxed text-white italic text-left">
            Superteam Malaysia exists to give every builder, creator, and founder the tools, network,
            and opportunities they need{" "}
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
