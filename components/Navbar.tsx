'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const CORNER = '#3C2B8C'
const BORDER = '#444444'
const ACCENT = '#5C4F9C'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Members', href: '/members' },
]

function CornerBrackets({ size = 8, thickness = 1.5, color = CORNER }: { size?: number; thickness?: number; color?: string }) {
  const base: React.CSSProperties = { position: 'absolute', width: `${size}px`, height: `${size}px`, pointerEvents: 'none', zIndex: 2 }
  const b = `${thickness}px solid ${color}`

  return (
    <>
      <span style={{ ...base, top: 0, left: 0, borderTop: b, borderLeft: b }} />
      <span style={{ ...base, top: 0, right: 0, borderTop: b, borderRight: b }} />
      <span style={{ ...base, bottom: 0, left: 0, borderBottom: b, borderLeft: b }} />
      <span style={{ ...base, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </>
  )
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between"
          style={{
            margin: '16px auto 0',
          }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/STMY%20logo%20long.svg"
              alt="Superteam Malaysia"
              width={160}
              height={44}
              priority
              className="w-[130px] sm:w-[140px] md:w-[160px] h-auto"
            />
          </Link>

          <nav
            className="hidden md:flex"
            style={{
              position: 'relative',
              alignItems: 'center',
              gap: '0',
              backgroundColor: '#0d0b14cc',
              border: `1px solid ${BORDER}`,
              backdropFilter: 'blur(16px)',
              padding: '0',
            }}
          >
            <CornerBrackets size={8} thickness={1.5} color={CORNER} />

            <ul style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0, listStyle: 'none' }}>
              {navItems.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      display: 'block',
                      padding: '10px 20px',
                      color: 'rgba(255,255,255,0.65)',
                      fontSize: '13px',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif",
                      borderRight: i < navItems.length - 1 ? `1px solid ${BORDER}` : 'none',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="https://t.me/SuperteamMY"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '10px 20px',
                color: '#fff',
                fontSize: '13px',
                fontStyle: 'italic',
                fontWeight: 500,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                borderLeft: `1px solid ${BORDER}`,
                background: `${ACCENT}18`,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${ACCENT}35` }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${ACCENT}18` }}
            >
              Join Us →
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              position: 'relative',
              background: '#121212',
              border: `1px solid ${BORDER}`,
              padding: '8px 12px',
              cursor: 'pointer',
              color: '#fff',
              fontSize: '18px',
              lineHeight: 1,
            }}
          >
            <CornerBrackets size={6} thickness={1.5} color={CORNER} />
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              margin: '8px 24px 0',
              backgroundColor: '#0d0b14ee',
              border: `1px solid ${BORDER}`,
              backdropFilter: 'blur(16px)',
              position: 'relative',
            }}
          >
            <CornerBrackets size={8} thickness={1.5} color={CORNER} />

            {navItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 20px',
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '14px',
                  fontStyle: 'italic',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  borderBottom: i < navItems.length - 1 ? `1px solid ${BORDER}` : 'none',
                }}
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/join"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                padding: '14px 20px',
                color: '#fff',
                fontSize: '14px',
                fontStyle: 'italic',
                fontWeight: 600,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
                borderTop: `1px solid ${BORDER}`,
                background: `${ACCENT}18`,
              }}
            >
              Join Us →
            </Link>
          </motion.div>
        )}
      </motion.header>
    </>
  )
}