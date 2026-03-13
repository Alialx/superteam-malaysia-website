'use client'

import {  motion } from 'framer-motion'
import { useState } from 'react'
import { FeatureCard } from '@/types'

const ACCENT = '#5C4F9C'
const CORNER = '#3C2B8C'
const BORDER = '#444444'
const BG     = '#121212'

function CornerBrackets({
  size = 14,
  thickness = 2,
  color = CORNER,
}: {
  size?: number
  thickness?: number
  color?: string
}) {
  const base: React.CSSProperties = {
    position: 'absolute',
    width: `${size}px`,
    height: `${size}px`,
    pointerEvents: 'none',
    zIndex: 2,
  }
  const b = `${thickness}px solid ${color}`
  return (
    <>
      <span style={{ ...base, top: 0,    left: 0,  borderTop: b, borderLeft: b }} />
      <span style={{ ...base, top: 0,    right: 0, borderTop: b, borderRight: b }} />
      <span style={{ ...base, bottom: 0, left: 0,  borderBottom: b, borderLeft: b }} />
      <span style={{ ...base, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </>
  )
}

const FEATURE_CARDS: FeatureCard[] = [
  {
    title: 'Builder Support and Mentorship',
    description: 'Mentorship, resources, and peer support.',
    textPosition: 'top',
  },
  {
    title: 'Grants, Funding and Ecosystem Connections',
    description: 'Mentorship, resources, and peer support.',
    textPosition: 'bottom',
  },
  {
    title: 'Jobs, Bounties and Work Opportunities',
    description: 'Mentorship, resources, and peer support.',
    textPosition: 'top',
  },
]

function FeatureCardItem({ card, index }: { card: FeatureCard; index: number }) {
  const isBottom = card.textPosition === 'bottom'
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: BG,
        border: `1px solid ${hovered ? '#5C4F9C88' : BORDER}`,
        minHeight: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isBottom ? 'flex-end' : 'flex-start',
        padding: '24px',
        overflow: 'hidden',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: hovered
          ? `0 0 32px ${ACCENT}40, 0 8px 40px rgba(0,0,0,0.6)`
          : '0 4px 20px rgba(0,0,0,0.3)',
        zIndex: hovered ? 2 : 1,
        cursor: 'default',
      }}
    >
      <CornerBrackets size={14} thickness={2} color={hovered ? '#6B5BB0' : CORNER} />

      {/* ambient glow — intensifies on hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at ${isBottom ? '50% 100%' : '50% 0%'}, ${ACCENT}${hovered ? '30' : '18'}, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'background 0.3s ease',
      }} />

      {/* bottom glow bloom on hover */}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        left: '10%',
        right: '10%',
        height: '60px',
        background: `radial-gradient(ellipse at 50% 100%, ${ACCENT}, transparent 70%)`,
        filter: 'blur(24px)',
        opacity: hovered ? 0.55 : 0,
        transition: 'opacity 0.35s ease',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2  className="text-white font-light italic leading-tight mb-[10px]"
          style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', 
            lineHeight: 1.2,
            fontFamily: "'Inter', sans-serif" 
          }}>
          {card.title}
        </h2>
        <p className=""
          style={{
            color: hovered ? '#B0B0B0' : ' #888888',
            fontSize: 'clamp(0.875rem, 2vw, 1rem)',
            fontStyle: 'italic',
            lineHeight: 1.2,
            fontFamily: "'Inter', sans-serif",
            margin: 0,
            transition: 'color 0.3s ease',
        }}>
          {card.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function FeatureCards() {
  return (
    <>
      <div
        className="feature-cards-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '15px',
        }}
      >
        {FEATURE_CARDS.map((card, i) => (
          <FeatureCardItem key={i} card={card} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .feature-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </>
  )
}