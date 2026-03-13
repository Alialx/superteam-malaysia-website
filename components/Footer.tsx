'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const CORNER = '#3C2B8C'
const BORDER = '#444444'
const ACCENT = '#5C4F9C'

const links = {
  Explore: [
    { label: 'Members',   href: '/members' },
  ],
  Resources: [
    { label: 'Bounties', href: 'https://earn.superteam.fun' },
    { label: 'FAQ',      href: '/#faq' },
    { label: 'About',    href: '/#about' },
  ],
  Community: [
    { label: 'Join Superteam', href: '/join' },
    { label: 'Twitter / X',    href: 'https://twitter.com/SuperteamMY' },
    { label: 'Telegram',       href: 'https://t.me/SuperteamMY' },
  ],

}

function CornerBrackets({ size = 10, thickness = 1.5, color = CORNER }: { size?: number; thickness?: number; color?: string }) {
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

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{
        borderTop: `1px solid ${BORDER}`,
        backgroundColor: '#07050B',
        padding: 'clamp(40px, 6vw, 72px) clamp(16px, 5vw, 64px) 32px',
        fontFamily: "'Inter', sans-serif",
        position: 'relative',
      }}
    >
      <CornerBrackets size={14} thickness={2} color={CORNER} />

      <div
        className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12"
        style={{ maxWidth: '1440px', margin: '0 auto' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Image
            src="/assets/STMY%20logo%20long.svg"
            alt="Superteam Malaysia"
            width={150}
            height={42}
          />
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', lineHeight: 1.7, maxWidth: '280px' }}>
            Empowering Malaysian builders, creators, and founders to win on the global stage.
          </p>

          <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
            {[
              { href: 'https://twitter.com/SuperteamMY', label: 'X', icon: (
                <svg viewBox="0 0 24 24" style={{ width: '13px', height: '13px', fill: 'currentColor' }}>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              )},
              { href: 'https://t.me/SuperteamMY',
                label: 'Telegram',
                icon: (
                  <svg viewBox="0 0 24 24" style={{ width: '13px', height: '13px', fill: 'currentColor' }}>
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
              )},
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  color: 'rgba(255,255,255,0.5)',
                  backgroundColor: '#121212',
                  border: `1px solid ${BORDER}`,
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = '#fff'
                  el.style.borderColor = `${ACCENT}88`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.color = 'rgba(255,255,255,0.5)'
                  el.style.borderColor = BORDER
                }}
              >
                <CornerBrackets size={5} thickness={1} color={CORNER} />
                {icon}
              </a>
            ))}
          </div>
        </div>

        {Object.entries(links).map(([heading, items]) => (
          <div key={heading} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{
              color: 'rgba(255,255,255,0.25)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: 0,
            }}>
              {heading}
            </p>
            {items.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '13px',
                  fontStyle: 'italic',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fff' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.5)' }}
              >
                {label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        maxWidth: '1440px',
        margin: '48px auto 0',
        paddingTop: '20px',
        borderTop: `1px solid ${BORDER}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', margin: 0, fontStyle: 'italic' }}>
          © {new Date().getFullYear()} Superteam Malaysia. All rights reserved.
        </p>
      </div>
    </motion.footer>
  )
}