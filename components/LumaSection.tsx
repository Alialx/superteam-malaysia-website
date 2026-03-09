"use client"
import { motion } from 'framer-motion';
import { ExternalLink } from "lucide-react";

export default function LumaSection() {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col gap-6 pt-2"
      >
        <h2
          className="text-5xl font-bold leading-tight text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Stay Updated
          <br />
          With Our Events
        </h2>

        <p
          className="text-xl text-white text-extralight italic leading-relaxed max-w-[300px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Where builders, creators, and founders come together.
        </p>

        <a
          href="https://lu.ma/superteammy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
            border border-white/20 text-white/80 text-sm italic font-medium w-fit
            hover:border-white/40 hover:text-white hover:bg-white/5
            transition-all duration-300 backdrop-blur-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Follow Our Luma
          <ExternalLink size={12} className="opacity-50" />
        </a>
      </motion.div>
    )
}