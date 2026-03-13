'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import CountUp from '../CountUp'
import { SanityStat } from '@/lib/sanity/queries'
import { StatGridProps } from '@/types'
import React from "react"

const BORDER = '#444444'

function StatItem({ stat, index }: { stat: SanityStat; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col items-center gap-2 flex-1 px-4 py-2"
    >

    <div className="flex items-end">
      {stat.prefix  === '$' && (
        <span
          className="text-white font-light leading-none self-end mb-1"
          style={{ fontSize: 'clamp(0.85rem, 1.8vw, 1.1rem)' }}
        >
          {stat.prefix}
        </span>
      )}

      <span
        className="font-medium text-white leading-none tracking-tight relative"
        style={{ fontSize: 'clamp(4rem, 6vw, 10rem)' }}
      >
        <CountUp
          from={0}
          to={stat.value}
          separator=","
          direction="up"
          duration={1.5}
          className="count-up-text"
        />

        {stat.suffix === 'k' && (
          <span className="font-medium text-white">k</span>
        )}
        {stat.suffix === '+' && (
          <span
            className="text-white font-light absolute -top-1 -right-4 leading-none"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
          >
            +
          </span>
        )}

        {stat.suffix === 'k+' && (
          <>
            <span
              className="font-medium text-white leading-none tracking-tight relative"
              style={{ fontSize: 'clamp(4rem, 6vw, 10rem)' }}
            >
              k
            </span>
            <span
              className="text-white font-light absolute -top-1 -right-3 leading-none"
              style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)' }}
            >
              +
            </span>
          </>
        )}
      </span>
    </div>

      <p
        className="text-center italic m-0"
        style={{
          color: '#888888',
          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '0.02em',
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  )
}

export default function StatGrid({ stats }: StatGridProps) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="stat-grid"
      >
        {stats.map((stat, i) => (
          <React.Fragment key={stat._id}>
            <StatItem stat={stat} index={i} />

            {i < stats.length - 1 && (
              <div
                className="stat-divider"
                style={{
                  width: '1px',
                  height: '50px',
                  alignSelf: 'center',
                  background: '#5C4F9C',
                  flexShrink: 0,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </motion.div>

      <style>{`
        .stat-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .stat-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            row-gap: 30px !important;
            column-gap: 0 !important;
          }
          .stat-divider {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}