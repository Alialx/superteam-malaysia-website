"use client"
import { motion } from 'framer-motion';
import { ExternalLink } from "lucide-react";
import AnimatedButton from "./Button";

export default function LumaSection() {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col gap-3 sm:gap-6 lg:gap-6"
      >
        <h2
          className="text-[clamp(2rem,6vw,3.75rem)] font-bold leading-tight text-white"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Stay Updated
          <br />
          With Our Events
        </h2>

        <p
          className="text-[clamp(0.75rem,3vw,1.25rem)] text-white text-extralight italic leading-relaxed "
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Where builders, creators, and founders come together.
        </p>
        <AnimatedButton href="https://lu.ma/superteammy" label="Follow Our Luma"/>
      </motion.div>
    )
}