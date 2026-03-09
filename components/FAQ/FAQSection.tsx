'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FAQItem, FAQSectionProps } from '@/types';

function AccordionItem({ faq, index }: { faq: FAQItem; index: number }) {
  const [open, setOpen] = useState(index === 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        borderRadius: '14px',
        border: open
          ? '1px solid rgba(109, 77, 255, 0.4)'
          : '1px solid rgba(255, 255, 255, 0.07)',
        background: open
          ? 'linear-gradient(135deg, rgba(109,77,255,0.08) 0%, rgba(7,5,11,0.95) 100%)'
          : 'rgba(255,255,255,0.02)',
        overflow: 'hidden',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        cursor: 'pointer',
      }}
      onClick={() => setOpen(!open)}
    >
      {/* Question row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 20px',
        gap: '16px',
      }}>
        <span style={{
          color: open ? '#ffffff' : 'rgba(255,255,255,0.8)',
          fontSize: '15px',
          fontWeight: 600,
          lineHeight: '1.4',
          fontFamily: 'Inter, sans-serif',
          transition: 'color 0.2s ease',
        }}>
          {faq.question}
        </span>

        {/* Chevron */}
        <div style={{
          width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: open ? 'rgba(109,77,255,0.2)' : 'rgba(255,255,255,0.05)',
          border: open ? '1px solid rgba(109,77,255,0.4)' : '1px solid rgba(255,255,255,0.1)',
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
              stroke={open ? 'rgba(109,77,255,0.9)' : 'rgba(255,255,255,0.4)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </motion.svg>
        </div>
      </div>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 20px 20px',
              color: 'rgba(255,255,255,0.55)',
              fontSize: '14px',
              lineHeight: '1.7',
              fontFamily: 'Inter, sans-serif',
              borderTop: '1px solid rgba(109,77,255,0.12)',
              paddingTop: '16px',
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section style={{
      width: '100%',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '6rem 1.5rem',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_2.8fr] md:grid-cols-[1.5fr_2.8fr] items-start gap-4rem">
        {/* ── Left column ── */}
        <div style={{ position: 'sticky', top: '2rem' }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col gap-6"

          >
            <h2 style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              fontWeight: 700, lineHeight: 1.15,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>
              Frequently <br/> Asked <br/> Questions
            </h2>

            <p  className="text-xl text-white text-extralight italic leading-relaxed max-w-[300px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
              Everything You Need to Know
            </p>

            {/* Contact card */}
            <div style={{
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.02)',
              padding: '20px',
            }}>
              <p style={{
                color: '#ffffff', fontSize: '15px',
                fontWeight: 600, margin: '0 0 8px 0',
              }}>
                Still have a question?
              </p>
              <p style={{
                color: 'rgba(255,255,255,0.4)', fontSize: '13px',
                lineHeight: 1.6, margin: '0 0 16px 0',
              }}>
                Can't find your question? Message us and we'll get back to you as soon as possible.
              </p>
              <a
                href="mailto:malaysia@superteam.fun"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '9px 18px', borderRadius: '10px',
                  border: '1px solid rgba(109,77,255,0.4)',
                  background: 'rgba(109,77,255,0.08)',
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: '13px', fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(109,77,255,0.2)'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(109,77,255,0.7)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(109,77,255,0.08)'
                  ;(e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(109,77,255,0.4)'
                }}
              >
                <svg viewBox="0 0 24 24" style={{ width: '14px', height: '14px' }} fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
                Send Message
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Right column — accordion ── */}
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
