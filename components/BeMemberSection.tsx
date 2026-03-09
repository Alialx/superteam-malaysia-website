"use client"

import { motion } from "framer-motion"
import MagicBento from "@/components/MemberBento";
import { ExternalLink } from 'lucide-react'

export default function BeMemberSection() {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 2.8fr',
        gap: '4rem',
        alignItems: 'start',
      }}>
                    <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-6 pt-40"
            >
              <h2
                className="text-5xl font-bold leading-tight text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Why Become a
                <br />
                STMY Member?
              </h2>
              <p
                className="text-xl text-white text-extralight italic leading-relaxed max-w-[300px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get access to a network of Malaysia's best Web3 minds, all in one place.
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
                Join Us Now
                <ExternalLink size={12} className="opacity-50" />
              </a>
            </motion.div>
            <MagicBento/>
        </div>
    )
}