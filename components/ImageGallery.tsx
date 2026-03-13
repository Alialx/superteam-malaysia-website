'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getGallery } from '@/lib/sanity/queries'
import type { SanityGallery, SanityGalleryImage } from '@/lib/sanity/queries'

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-0 left-0 w-3 h-3" style={{ borderTop: '2px solid #3C2B8C', borderLeft: '2px solid #3C2B8C' }} />
      <span className="absolute top-0 right-0 w-3 h-3" style={{ borderTop: '2px solid #3C2B8C', borderRight: '2px solid #3C2B8C' }} />
      <span className="absolute bottom-0 left-0 w-3 h-3" style={{ borderBottom: '2px solid #3C2B8C', borderLeft: '2px solid #3C2B8C' }} />
      <span className="absolute bottom-0 right-0 w-3 h-3" style={{ borderBottom: '2px solid #3C2B8C', borderRight: '2px solid #3C2B8C' }} />
    </>
  )
}

function GalleryImage({
    item,
    index,
    className,
  }: {
    item: SanityGalleryImage
    index: number
    className?: string
  }) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={`group relative overflow-hidden bg-[#121218] ${className}`}
        style={{ border: '1px solid #2a2a35' }}
      >
        <CornerBrackets />
  
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
  
        {item.alt && (
          <div className="absolute bottom-0 left-0 right-0 z-20 px-3 pb-3 pt-6 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out">
            <p className="font-mono text-[11px] tracking-widest text-white/90 uppercase leading-relaxed">
              {item.alt}
            </p>
          </div>
        )}
  
        <img
          src={item.imageUrl}
          alt={item.alt ?? ''}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </motion.div>
    )
  }

export default function GalleryClient() {
  const [gallery, setGallery] = useState<SanityGallery | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getGallery()
      .then(setGallery)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null
  if (!gallery) return null

  const [a, b, c, d, e] = gallery.images

  return (
    <section className="w-full">
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-2 sm:mb-3">
        <GalleryImage item={a} index={0} className="h-48 sm:h-64" />
        <GalleryImage item={b} index={1} className="h-48 sm:h-64" />
        <GalleryImage item={c} index={2} className="h-48 sm:h-64" />
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <GalleryImage item={d} index={3} className="h-48 sm:h-64" />
        <GalleryImage item={e} index={4} className="h-48 sm:h-64" />
      </div>
    </section>
  )
}