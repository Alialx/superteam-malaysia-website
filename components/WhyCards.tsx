'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface WhyCard {
  title: string;
  description: string;
  icon: string;
}

const CARDS: WhyCard[] = [
  {
    icon: '⚡',
    title: 'Access Exclusive Opportunities',
    description: 'Get first access to grants, bounties, and job opportunities from leading Web3 projects before they go public.',
  },
  {
    icon: '🌐',
    title: 'Build Your Network',
    description: "Connect with Malaysia's top builders, founders, and creators who are shipping products on the global stage.",
  },
  {
    icon: '🚀',
    title: 'Grow With Support',
    description: 'Tap into mentorship, peer reviews, and ecosystem resources that accelerate your path from idea to launch.',
  },
];

const ACCENT  = '#5C4F9C';
const CORNER  = '#3C2B8C';
const BORDER  = '#333333';
const CARD_BG = '#0d0b14';

function CornerBrackets({ size = 14, thickness = 2, color = CORNER }: { size?: number; thickness?: number; color?: string }) {
  const base: React.CSSProperties = { position: 'absolute', width: `${size}px`, height: `${size}px`, pointerEvents: 'none', zIndex: 2 };
  const b = `${thickness}px solid ${color}`;
  return (
    <>
      <span style={{ ...base, top: 0,    left: 0,  borderTop: b, borderLeft: b }} />
      <span style={{ ...base, top: 0,    right: 0, borderTop: b, borderRight: b }} />
      <span style={{ ...base, bottom: 0, left: 0,  borderBottom: b, borderLeft: b }} />
      <span style={{ ...base, bottom: 0, right: 0, borderBottom: b, borderRight: b }} />
    </>
  );
}

function StaticCard({ card }: { card: WhyCard }) {
  return (
    <div
      style={{
        backgroundColor: CARD_BG,
        border: `1px solid ${BORDER}`,
        boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${ACCENT}20`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '24px',
        overflow: 'hidden',
        borderRadius: '4px',
        position: 'relative',
        minHeight: '200px',
      }}
    >
      <CornerBrackets size={14} thickness={2} color={CORNER} />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse at 50% 100%, ${ACCENT}25, transparent 70%)`,
      }} />

      <div style={{
        position: 'absolute', top: '24px', left: '24px',
        fontSize: '1.75rem', lineHeight: 1,
      }}>
        {card.icon}
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h3 style={{
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: 700,
          fontStyle: 'italic',
          lineHeight: 1.3,
          marginBottom: '8px',
          fontFamily: "'Inter', sans-serif",
        }}>
          {card.title}
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.45)',
          fontSize: '0.8rem',
          fontStyle: 'italic',
          lineHeight: 1.65,
          fontFamily: "'Inter', sans-serif",
          margin: 0,
        }}>
          {card.description}
        </p>
      </div>
    </div>
  );
}

interface BounceCardsProps {
  className?: string;
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

function BounceCardsDesktop({
  className = '',
  containerWidth = 700,
  containerHeight = 420,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = 'elastic.out(1, 0.8)',
  transformStyles = [
    'rotate(6deg) translate(-240px)',
    'rotate(-2deg) translate(0px)',
    'rotate(-7deg) translate(240px)',
  ],
  enableHover = false,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card',
        { scale: 0 },
        { scale: 1, stagger: animationStagger, ease: easeType, delay: animationDelay }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (t: string) =>
    /rotate\([\s\S]*?\)/.test(t) ? t.replace(/rotate\([\s\S]*?\)/, 'rotate(0deg)') : `${t} rotate(0deg)`;

  const getPushedTransform = (base: string, offsetX: number) => {
    const match = base.match(/translate\(([-0-9.]+)px\)/);
    if (match) {
      const newX = parseFloat(match[1]) + offsetX;
      return base.replace(/translate\(([-0-9.]+)px\)/, `translate(${newX}px)`);
    }
    return base === 'none' ? `translate(${offsetX}px)` : `${base} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIdx: number) => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    CARDS.forEach((_, i) => {
      const sel = q(`.card-${i}`);
      gsap.killTweensOf(sel);
      if (i === hoveredIdx) {
        gsap.to(sel, { transform: getNoRotationTransform(transformStyles[i] || 'none'), duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
      } else {
        const offsetX = i < hoveredIdx ? -160 : 160;
        gsap.to(sel, { transform: getPushedTransform(transformStyles[i] || 'none', offsetX), duration: 0.4, ease: 'back.out(1.4)', delay: Math.abs(hoveredIdx - i) * 0.05, overwrite: 'auto' });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;
    const q = gsap.utils.selector(containerRef);
    CARDS.forEach((_, i) => {
      const sel = q(`.card-${i}`);
      gsap.killTweensOf(sel);
      gsap.to(sel, { transform: transformStyles[i] || 'none', duration: 0.4, ease: 'back.out(1.4)', overwrite: 'auto' });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: containerWidth, height: containerHeight }}
    >
      {CARDS.map((card, idx) => (
        <div
          key={idx}
          className={`card card-${idx} absolute`}
          style={{
            width: '280px',
            height: '340px',
            transform: transformStyles[idx] || 'none',
            backgroundColor: CARD_BG,
            border: `1px solid ${BORDER}`,
            boxShadow: `0 8px 40px rgba(0,0,0,0.5), 0 0 0 1px ${ACCENT}20`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '28px',
            overflow: 'hidden',
          }}
          onMouseEnter={() => pushSiblings(idx)}
          onMouseLeave={resetSiblings}
        >
          <CornerBrackets size={14} thickness={2} color={CORNER} />
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: `radial-gradient(ellipse at 50% 100%, ${ACCENT}25, transparent 70%)`,
          }} />
          <div style={{ position: 'absolute', top: '28px', left: '28px', fontSize: '2rem', lineHeight: 1 }}>
            {card.icon}
          </div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{
              color: '#ffffff',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              fontWeight: 700,
              fontStyle: 'italic',
              lineHeight: 1.3,
              marginBottom: '10px',
              fontFamily: "'Inter', sans-serif",
            }}>
              {card.title}
            </h3>
            <p style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
              fontStyle: 'italic',
              lineHeight: 1.65,
              fontFamily: "'Inter', sans-serif",
              margin: 0,
            }}>
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BounceCards(props: BounceCardsProps) {
  return (
    <>
      <div className="hidden sm:flex justify-center">
        <BounceCardsDesktop {...props} />
      </div>

      <div className="grid grid-cols-1 gap-3 sm:hidden px-4 mt-5">
        {CARDS.map((card, i) => (
          <StaticCard key={i} card={card} />
        ))}
      </div>
    </>
  );
}