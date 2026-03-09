"use client"

import { motion } from 'framer-motion'

interface ImageCardClientProps {
  title: string
  image: string
  index: number
  className?: string
}

export default function ImageCardClient({ title, image, index, className = "" }: ImageCardClientProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${className}`}
    >
      {/* Sanity image */}
      {image ? (
        <img
          src={`${image}?w=800&h=400&fit=crop&q=75&auto=format`}
          alt={title}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          className="transition-transform duration-500 ease-out group-hover:scale-110"
        />
      ) : (
        // fallback gradient if no image uploaded yet
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900 transition-transform duration-500 ease-out group-hover:scale-110" />
      )}
      {/* Shimmer */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
      {/* Border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-white/5 group-hover:ring-white/20 transition-all duration-500" />
      {/* Title */}
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
        <p className="text-white/80 text-sm font-medium">{title}</p>
      </div>
      {/* Vignette */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}