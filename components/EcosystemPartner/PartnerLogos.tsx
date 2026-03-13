'use client'

import { motion } from 'framer-motion'
import type { SanityPartner } from '@/lib/sanity/queries'

interface PartnersSectionClientProps {
  partners: SanityPartner[]
}

function PartnerCard({
  partner,
  index,
}: {
  partner: SanityPartner
  index: number
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative flex items-start
        px-6 py-4
        bg-[#121212]
        hover:bg-[#121212]/40
        hover:border-white/15
        transition-all duration-300 ease-out
        cursor-pointer"
    >
        <span
          className="absolute inset-0 transition-colors duration-300"
          style={{ border: '1px solid #444444' }}
        />

        {/* Corner brackets — top-left */}
        <span className="absolute top-0 left-0 w-3 h-3 transition-colors duration-300"
          style={{
            borderTop: '2px solid #3C2B8C',
            borderLeft: '2px solid #3C2B8C',
          }}
        />
        {/* top-right */}
        <span className="absolute top-0 right-0 w-3 h-3 transition-colors duration-300"
          style={{
            borderTop: '2px solid #3C2B8C',
            borderRight: '2px solid #3C2B8C',
          }}
        />
        {/* bottom-left */}
        <span className="absolute bottom-0 left-0 w-3 h-3 transition-colors duration-300"
          style={{
            borderBottom: '2px solid #3C2B8C',
            borderLeft: '2px solid #3C2B8C',
          }}
        />
        {/* bottom-right */}
        <span className="absolute bottom-0 right-0 w-3 h-3 transition-colors duration-300"
          style={{
            borderBottom: '2px solid #3C2B8C',
            borderRight: '2px solid #3C2B8C',
          }}
        />

      {/* subtle inner glow on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
        bg-[radial-gradient(ellipse_at_center,[#3C2B8C]_0%,transparent_70%)]
        pointer-events-none"
      />

      <img
        src={partner.logoUrl}
        alt={partner.name}
        title={partner.name}
        className="h-8 sm:h-9 w-auto object-contain
          group-hover:opacity-100
          transition-opacity duration-300
          select-none pointer-events-none
          max-w-[140px] sm:max-w-[160px]"
        draggable={false}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  )

  if (partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={partner.name}
        className="block"
      >
        {inner}
      </a>
    )
  }

  return inner
}

export default function PartnersSectionClient({ partners }: PartnersSectionClientProps) {
  // Split into rows based on the `row` field from Sanity
  const row1 = partners.filter((p) => p.row === 1)
  const row2 = partners.filter((p) => p.row === 2)

  const renderRow = (rowPartners: SanityPartner[], rowOffset: number) => (
<div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">      {rowPartners.map((partner, i) => (
        <PartnerCard key={partner._id} partner={partner} index={rowOffset + i} />
      ))}
    </div>
  )

  return (
    <section className="w-full mx-auto ">
      {/* Partner grid — row 1 then row 2 */}
      <div className="flex flex-col gap-2 sm:gap-3">
        {row1.length > 0 && renderRow(row1, 0)}
        {row2.length > 0 && renderRow(row2, row1.length)}
      </div>
    </section>
  )
}