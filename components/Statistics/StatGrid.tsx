'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import CountUp from '../CountUp'
import type { SanityStat } from '@/lib/sanity/queries'

// Dynamically resolve icon name from Sanity string
function resolveIcon(name?: string) {
  if (!name) return LucideIcons.BarChart2
  return (LucideIcons as any)[name] ?? LucideIcons.BarChart2
}

function StatCard({ stat, index }: { stat: SanityStat; index: number }) {
  const Icon = resolveIcon(stat.icon)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="flex flex-col gap-3 py-6 px-6 sm:py-8 sm:px-10 lg:py-10 lg:px-16"
    >
      {/* Icon + label */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 border border-white/10">
          <Icon size={16} className="text-white sm:w-[18px] sm:h-[18px]" />
        </div>
        <span className="text-white text-base sm:text-lg lg:text-xl italic font-light">
          {stat.label}
        </span>
      </div>

      {/* Number */}
      <div className="flex items-end">
        <span className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-white leading-none tracking-tight">
          <CountUp
            from={0}
            to={stat.value}
            separator=","
            direction="up"
            duration={1.5}
            className="count-up-text"
          />
          {stat.suffix ?? ''}
        </span>
      </div>
    </motion.div>
  )
}

export function StatsGrid({ stats }: { stats: SanityStat[] }) {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 max-w-[1400px] mx-auto">
      {/* Mobile: 2 cols, md+: 3 cols for row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-b border-white/5">
        {stats.slice(0, 3).map((stat, i) => (
          <div
            key={stat._id}
            className={`${i < 2 ? 'border-r border-white/5' : ''} ${i === 2 ? 'col-span-2 md:col-span-1 border-t md:border-t-0 border-white/5' : ''}`}
          >
            <StatCard stat={stat} index={i} />
          </div>
        ))}
      </div>

      {/* Row 2 — always 2 cols */}
      <div className="grid grid-cols-2 gap-0">
        {stats.slice(3).map((stat, i) => (
          <div
            key={stat._id}
            className={i === 0 ? 'border-r border-white/5' : ''}
          >
            <StatCard stat={stat} index={i + 3} />
          </div>
        ))}
      </div>
    </section>
  )
}