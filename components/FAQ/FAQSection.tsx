'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQItem, FAQSectionProps } from '@/types';

const ACCENT = '#5C4F9C'
const CORNER = '#3C2B8C'
const BORDER = '#444444'

function CornerBrackets({ size = 14, thickness = 2, color = CORNER }: { size?: number; thickness?: number; color?: string }) {
  const base: React.CSSProperties = { position: 'absolute', width: `${size}px`, height: `${size}px`, pointerEvents: 'none', zIndex: 2 }
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

function AccordionItem({ faq, index }: { faq: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      onClick={() => setOpen(!open)}
      style={{
        position: 'relative',
        backgroundColor: '#121212',
        border: `1px solid ${open ? `${ACCENT}66` : BORDER}`,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: open ? `0 0 24px ${ACCENT}20` : 'none',
      }}
    >
      <CornerBrackets size={12} thickness={2} color={open ? `${ACCENT}` : CORNER} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: open
          ? `radial-gradient(ellipse at 50% 0%, ${ACCENT}12, transparent 70%)`
          : 'transparent',
        transition: 'background 0.3s ease',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 20px', gap: '16px',
      }}>
        <span style={{
          color: open ? '#ffffff' : 'rgba(255,255,255,0.75)',
          fontSize: '15px', fontWeight: 600, lineHeight: 1.4,
          fontFamily: 'Inter, sans-serif',
          transition: 'color 0.2s ease',
        }}>
          {faq.question}
        </span>

        <div style={{
          width: '28px', height: '28px', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          background: open ? `${ACCENT}22` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${open ? `${ACCENT}55` : BORDER}`,
          transition: 'all 0.25s ease',
        }}>
          <motion.svg
            viewBox="0 0 24 24"
            style={{ width: '14px', height: '14px' }}
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke={open ? ACCENT : 'rgba(255,255,255,0.4)'}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
            />
          </motion.svg>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}
          >
            <div style={{
              padding: '16px 20px 20px',
              color: 'rgba(255,255,255,0.5)',
              fontSize: '14px', lineHeight: 1.7,
              fontFamily: 'Inter, sans-serif',
              borderTop: `1px solid ${ACCENT}20`,
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ContactCard() {
  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#121212',
      border: `1px solid ${BORDER}`,
      padding: '24px',
      overflow: 'hidden',
    }}>
      <CornerBrackets size={12} thickness={2} color={CORNER} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 50% 100%, ${ACCENT}15, transparent 70%)`,
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ color: '#ffffff', fontSize: '15px', fontWeight: 600, margin: '0 0 8px 0' }}>
          Still have a question?
        </p>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', lineHeight: 1.6, margin: '0 0 16px 0' }}>
          Can't find your question? Message us and we'll get back to you as soon as possible.
        </p>
        <a
          href="https://t.me/SuperteamMY"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '9px 18px',
            position: 'relative',
            border: `1px solid ${BORDER}`,
            background: `${ACCENT}12`,
            color: 'rgba(255,255,255,0.85)',
            fontSize: '13px', fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.2s ease',
            overflow: 'hidden',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = `${ACCENT}28`
            el.style.borderColor = `${ACCENT}88`
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement
            el.style.background = `${ACCENT}12`
            el.style.borderColor = BORDER
          }}
        >
          <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }} fill="none">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          Send Message
        </a>
      </div>
    </div>
  )
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section style={{ width: '100%', fontFamily: 'Inter, sans-serif' }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.8fr] md:grid-cols-[1.5fr_2.8fr] lg:items-start gap-3">

        <div style={{ position: 'sticky', top: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col gap-6 text-center lg:text-left"
          >
            <h2
              className="text-[clamp(2rem,6vw,3.75rem)] font-light italic leading-tight text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
            Frequently <br/> Asked Questions
            </h2>

            <p
              className="text-[clamp(0.75rem,3vw,1.25rem)] text-[#E0E0E0] text-extralight italic leading-relaxed lg:max-w-[550px]"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 'clamp(0.75rem, 1.5vw, 1rem)' }}
            >
              Everything You Need to Know
            </p>

            <ContactCard />
          </motion.div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.length > 0 ? (
            faqs.map((faq, index) => (
              <AccordionItem key={faq._id} faq={faq} index={index} />
            ))
          ) : (
            <div style={{
              padding: '3rem', textAlign: 'center',
              color: 'rgba(255,255,255,0.2)', fontSize: '14px',
            }}>
              No FAQs yet. Add some in Sanity Studio.
            </div>
          )}
        </div>

      </div>
    </section>
  )
}