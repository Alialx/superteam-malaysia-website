'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getProjects } from '@/lib/sanity/queries'
import type { SanityProject, SanityPerson, SanityAward } from '@/lib/sanity/queries'

const fallbackColors = ['#3C2B8C', '#1D3566', '#1a4d3a', '#4d1a2a']

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

function ProjectCard({ project, index }: { project: SanityProject; index: number }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group relative block bg-[#121218] hover:bg-[#121218]/70 hover:border-white/10 transition-all duration-300 cursor-pointer"
      style={{ border: '1px solid #2a2a35' }}
    >
      <CornerBrackets />

      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(ellipse_at_center,rgba(60,43,140,0.18)_0%,transparent_70%)] pointer-events-none z-0" />

      {project.imageUrl ? (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-40 object-cover border-b border-[#2a2a35]"
        />
      ) : (
        <div className="w-full h-40 bg-[#0f0f18] border-b border-[#2a2a35] flex items-center justify-center font-mono text-xs text-[#3a3a50] tracking-widest">
          [ {project.slug}.png ]
        </div>
      )}

      <div className="relative z-10 p-4 sm:p-5">
        <span className="inline-block font-mono text-[10px] tracking-widest uppercase px-2 py-1 mb-3 text-violet-400 bg-violet-950/40 border border-violet-800/40">
          {project.tag}
        </span>

        <h3 className="text-[15px] font-semibold text-white mb-2 leading-snug">{project.title}</h3>
        <p className="text-[12.5px] text-[#6b6b80] leading-relaxed mb-4">{project.description}</p>

        {project.awards && project.awards.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.awards.map((award) => (
              <span
                key={award._key}
                className={`text-[10px] font-mono px-2 py-1 border ${
                  award.tier === 'gold'
                    ? 'bg-amber-950/30 border-amber-700/40 text-amber-400'
                    : award.tier === 'silver'
                    ? 'bg-zinc-800/40 border-zinc-600/40 text-zinc-400'
                    : 'bg-white/[0.03] border-[#2a2a35] text-[#6b6b80]'
                }`}
              >
                {award.label}
                {award.date && (
                  <span className="ml-1 opacity-60">· {new Date(award.date).getFullYear()}</span>
                )}
              </span>
            ))}
          </div>
        )}

        <div className="h-px bg-[#2a2a35] my-3" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex">
              {project.people?.slice(0, 4).map((p, i) => (
                <div
                  key={p._key}
                  className="w-[26px] h-[26px] rounded-full border-2 border-[#121218] flex items-center justify-center text-[10px] font-medium text-white"
                  style={{
                    background: p.avatarColor ?? fallbackColors[i % fallbackColors.length],
                    marginLeft: i === 0 ? 0 : -7,
                  }}
                  title={p.name}
                >
                  {p.initials}
                </div>
              ))}
            </div>
            <span className="text-[11px] text-[#6b6b80]">
              {(project.people?.length ?? 0) <= 3
                ? project.people?.map((p) => p.name.split(' ')[0]).join(', ')
                : `+${project.people?.length} contributors`}
            </span>
          </div>

          <span className="text-[#3C2B8C] group-hover:text-violet-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 text-sm">
            ↗
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function FeaturedProjectsClient() {
  const [projects, setProjects] = useState<SanityProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <section className="w-full mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project._id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}