import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

export interface BentoCardProps {
  color?: string;
  title?: string;
  description?: string;
  label?: string;
  icon?: React.ReactNode;
  textAutoHide?: boolean;
  disableAnimations?: boolean;
}

export interface BentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '109, 77, 255';
const MOBILE_BREAKPOINT = 768;

// SVG Icons for each pillar
const BuilderIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="16" width="6" height="9" rx="1.5" fill="rgba(109,77,255,0.25)" stroke="rgba(109,77,255,0.9)" strokeWidth="1.5"/>
    <rect x="11" y="10" width="6" height="15" rx="1.5" fill="rgba(109,77,255,0.25)" stroke="rgba(109,77,255,0.9)" strokeWidth="1.5"/>
    <rect x="19" y="4" width="6" height="21" rx="1.5" fill="rgba(109,77,255,0.4)" stroke="rgba(109,77,255,1)" strokeWidth="1.5"/>
    <circle cx="6" cy="13" r="2" fill="rgba(109,77,255,0.9)"/>
    <circle cx="14" cy="7" r="2" fill="rgba(109,77,255,0.9)"/>
    <circle cx="22" cy="1.5" r="2" fill="rgba(109,77,255,1)"/>
    <path d="M6 13 L14 7 L22 1.5" stroke="rgba(109,77,255,0.6)" strokeWidth="1" strokeDasharray="2 2"/>
  </svg>
);

const EventsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="22" height="20" rx="3" fill="rgba(109,77,255,0.15)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.5"/>
    <path d="M3 11H25" stroke="rgba(109,77,255,0.8)" strokeWidth="1.5"/>
    <rect x="9" y="2" width="2.5" height="6" rx="1.25" fill="rgba(109,77,255,1)"/>
    <rect x="16.5" y="2" width="2.5" height="6" rx="1.25" fill="rgba(109,77,255,1)"/>
    <circle cx="9" cy="17" r="1.5" fill="rgba(109,77,255,0.9)"/>
    <circle cx="14" cy="17" r="1.5" fill="rgba(109,77,255,0.9)"/>
    <circle cx="19" cy="17" r="1.5" fill="rgba(109,77,255,0.9)"/>
    <circle cx="9" cy="22" r="1.5" fill="rgba(109,77,255,0.6)"/>
    <circle cx="14" cy="22" r="1.5" fill="rgba(109,77,255,0.6)"/>
    <path d="M21 20 L25 24 M19 22 L23 26" stroke="rgba(109,77,255,0.5)" strokeWidth="1"/>
    <path d="M22 19 L27 24" stroke="rgba(109,77,255,0.9)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const GrantsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="11" fill="rgba(109,77,255,0.15)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.5"/>
    <path d="M14 7V9M14 19V21" stroke="rgba(109,77,255,1)" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M10.5 10.5C10.5 9.12 12.07 8 14 8C15.93 8 17.5 9.12 17.5 10.5C17.5 12.5 14 13.5 14 13.5C14 13.5 10.5 14.5 10.5 16.5C10.5 17.88 12.07 19 14 19C15.93 19 17.5 17.88 17.5 16.5" stroke="rgba(109,77,255,1)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="21" cy="7" r="3.5" fill="#07050B" stroke="rgba(109,77,255,0.9)" strokeWidth="1.2"/>
    <path d="M19.5 7H22.5M21 5.5V8.5" stroke="rgba(109,77,255,1)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const JobsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="9" width="22" height="16" rx="2.5" fill="rgba(109,77,255,0.15)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.5"/>
    <path d="M10 9V7C10 5.9 10.9 5 12 5H16C17.1 5 18 5.9 18 7V9" stroke="rgba(109,77,255,0.9)" strokeWidth="1.5"/>
    <path d="M3 16H25" stroke="rgba(109,77,255,0.5)" strokeWidth="1" strokeDasharray="3 2"/>
    <circle cx="14" cy="16" r="2" fill="rgba(109,77,255,1)"/>
    <path d="M8 20H12M16 20H20" stroke="rgba(109,77,255,0.6)" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="22" cy="6" r="2.5" fill="rgba(109,77,255,1)"/>
    <path d="M21 6L21.8 6.8L23.5 5" stroke="#07050B" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EducationIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 4L26 10L14 16L2 10L14 4Z" fill="rgba(109,77,255,0.2)" stroke="rgba(109,77,255,0.9)" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M6 13V20C6 20 9 23 14 23C19 23 22 20 22 20V13" stroke="rgba(109,77,255,0.8)" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M26 10V17" stroke="rgba(109,77,255,0.7)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="26" cy="19" r="2" fill="rgba(109,77,255,0.9)"/>
    <path d="M10 10.5L14 12.5L18 10.5" stroke="rgba(109,77,255,1)" strokeWidth="1" strokeLinecap="round"/>
  </svg>
);

const EcosystemIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="14" r="3" fill="rgba(109,77,255,1)"/>
    <circle cx="5" cy="8" r="2.5" fill="rgba(109,77,255,0.4)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.2"/>
    <circle cx="23" cy="8" r="2.5" fill="rgba(109,77,255,0.4)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.2"/>
    <circle cx="5" cy="20" r="2.5" fill="rgba(109,77,255,0.4)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.2"/>
    <circle cx="23" cy="20" r="2.5" fill="rgba(109,77,255,0.4)" stroke="rgba(109,77,255,0.8)" strokeWidth="1.2"/>
    <circle cx="14" cy="3" r="2.5" fill="rgba(109,77,255,0.6)" stroke="rgba(109,77,255,0.9)" strokeWidth="1.2"/>
    <circle cx="14" cy="25" r="2.5" fill="rgba(109,77,255,0.6)" stroke="rgba(109,77,255,0.9)" strokeWidth="1.2"/>
    <path d="M14 11L14 5.5M14 17L14 22.5M11 14L7.5 14M17 14L20.5 14M11.8 11.8L7.5 7.5M16.2 16.2L20.5 20.5M16.2 11.8L20.5 7.5M11.8 16.2L7.5 20.5" stroke="rgba(109,77,255,0.55)" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const cardData: BentoCardProps[] = [
  {
    color: '#07050B',
    title: 'Builder Support & Mentorship',
    description: 'Mentorship, resources, and peer support.',
    label: '01',
    icon: <BuilderIcon />
  },
  {
    color: '#07050B',
    title: 'Events & Hackathons',
    description: 'IRL meetups, online hackathons, and builder nights.',
    label: '02',
    icon: <EventsIcon />
  },
  {
    color: '#07050B',
    title: 'Grants & Funding Access',
    description: 'Navigate the Solana Foundation grant ecosystem with guidance from members who\'ve done it. We help you find the capital to build.',
    label: '03',
    icon: <GrantsIcon />
  },
  {
    color: '#07050B',
    title: 'Jobs, Bounties & Opportunities',
    description: 'Access exclusive bounties, freelance gigs, and full-time roles from top Web3 companies actively hiring from the Superteam network.',
    label: '04',
    icon: <JobsIcon />
  },
  {
    color: '#07050B',
    title: 'Education & Workshops',
    description: 'Deep-dive sessions taught by builders, for builders.',
    label: '05',
    icon: <EducationIcon />
  },
  {
    color: '#07050B',
    title: 'Ecosystem Connections',
    description: 'Plug directly into the global Solana network.',
    label: '06',
    icon: <EcosystemIcon />
  }
];

const createParticleElement = (x: number, y: number, color: string = DEFAULT_GLOW_COLOR): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
}> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();
    particlesRef.current.forEach(particle => {
      gsap.to(particle, {
        scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
        onComplete: () => { particle.parentNode?.removeChild(particle); }
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) { initializeParticles(); }
    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
      }
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) {
        gsap.to(element, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      }
      if (enableMagnetism) {
        gsap.to(element, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        gsap.to(element, { rotateX, rotateY, duration: 0.1, ease: 'power2.out', transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;
        magnetismAnimationRef.current = gsap.to(element, { x: magnetX, y: magnetY, duration: 0.3, ease: 'power2.out' });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxDistance = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${maxDistance*2}px;height:${maxDistance*2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x-maxDistance}px;top:${y-maxDistance}px;pointer-events:none;z-index:1000;`;
      element.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={{ ...style, position: 'relative', overflow: 'hidden' }}>
      {children}
    </div>
  );
};

const GlobalSpotlight: React.FC<{
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}> = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = DEFAULT_GLOW_COLOR }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;
    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.15) 0%,rgba(${glowColor},0.08) 15%,rgba(${glowColor},0.04) 25%,rgba(${glowColor},0.02) 40%,rgba(${glowColor},0.01) 65%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll('.card');
      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(card => { (card as HTMLElement).style.setProperty('--glow-intensity', '0'); });
        return;
      }
      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;
      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);
        let glowIntensity = 0;
        if (effectiveDistance <= proximity) { glowIntensity = 1; }
        else if (effectiveDistance <= fadeDistance) { glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity); }
        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
      });
      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current?.querySelectorAll('.card').forEach(card => { (card as HTMLElement).style.setProperty('--glow-intensity', '0'); });
      if (spotlightRef.current) { gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' }); }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

const BentoCardGrid: React.FC<{ children: React.ReactNode; gridRef?: React.RefObject<HTMLDivElement | null>; }> = ({ children, gridRef }) => (
  <div className="bento-section grid gap-2 p-3 w-full max-w-[90rem] select-none relative" style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }} ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

const MagicBento: React.FC<BentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .bento-section {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-color: ${glowColor};
          --border-color: rgba(109, 77, 255, 0.25);
          --background-dark: #07050B;
          --white: hsl(0, 0%, 100%);
          --purple-primary: rgba(109, 77, 255, 1);
          --purple-glow: rgba(109, 77, 255, 0.2);
          --purple-border: rgba(109, 77, 255, 0.8);
          font-family: 'Inter', sans-serif;
        }

        .bento-section * {
          font-family: 'Inter', sans-serif;
        }

        .card-responsive {
          grid-template-columns: 1fr;
          width: 100%;
          margin: 0 auto;
          padding: 0.75rem;
        }

        @media (min-width: 600px) {
          .card-responsive { grid-template-columns: repeat(2, 1fr); }
        }

        @media (min-width: 1024px) {
          .card-responsive { grid-template-columns: repeat(4, 1fr); }
          .card-responsive .card:nth-child(3) { grid-column: span 2; grid-row: span 2; }
          .card-responsive .card:nth-child(4) { grid-column: 1 / span 2; grid-row: 2 / span 2; }
          .card-responsive .card:nth-child(6) { grid-column: 4; grid-row: 3; }
        }

        .card--border-glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 6px;
          background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%);
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }

        .card--border-glow:hover {
          box-shadow: 0 4px 32px rgba(109, 77, 255, 0.25), 0 0 40px rgba(109, 77, 255, 0.12);
          border-color: rgba(109, 77, 255, 0.5) !important;
        }

        .card__icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: rgba(109, 77, 255, 0.1);
          border: 1px solid rgba(109, 77, 255, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.1rem;
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .card:hover .card__icon {
          background: rgba(109, 77, 255, 0.2);
          border-color: rgba(109, 77, 255, 0.6);
        }

        .card__label {
          font-family: 'Inter', sans-serif !important;
          font-size: 11px !important;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(109, 77, 255, 0.7) !important;
        }

        .card__title {
          font-family: 'Inter', sans-serif !important;
          font-size: 1.15rem !important;
          font-weight: 600 !important;
          line-height: 1.35;
          color: rgba(255,255,255,0.95) !important;
          margin-bottom: 0.55rem !important;
        }

        .card__description {
          font-size: 0.875rem !important;
          line-height: 1.65 !important;
          color: rgba(255, 255, 255, 0.45) !important;
        }

        .card:hover .card__description {
          color: rgba(255, 255, 255, 0.6) !important;
        }

        .card__corner-accent {
          position: absolute;
          top: 0;
          right: 0;
          width: 60px;
          height: 60px;
          background: radial-gradient(circle at top right, rgba(109,77,255,0.15) 0%, transparent 70%);
          border-radius: 0 18px 0 0;
          pointer-events: none;
        }

        .particle::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: rgba(${glowColor}, 0.2);
          border-radius: 50%;
          z-index: -1;
        }

        .text-clamp-1 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .text-clamp-2 {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 599px) {
          .card-responsive { grid-template-columns: 1fr; width: 100%; margin: 0 auto; padding: 0.75rem; }
          .card-responsive .card { width: 100%; min-height: 180px; }
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight gridRef={gridRef} disableAnimations={shouldDisableAnimations} enabled={enableSpotlight} spotlightRadius={spotlightRadius} glowColor={glowColor} />
      )}

      <BentoCardGrid gridRef={gridRef}>
        <div className="card-responsive grid gap-3">
          {cardData.map((card, index) => {
            const baseClassName = `card flex flex-col justify-between relative aspect-[4/3] min-h-[260px] w-full max-w-full p-6 rounded-[20px] border border-solid font-light overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-0.5 ${enableBorderGlow ? 'card--border-glow' : ''}`;
            const cardStyle = {
              backgroundColor: card.color || 'var(--background-dark)',
              borderColor: 'rgba(109, 77, 255, 0.2)',
              color: 'var(--white)',
              '--glow-x': '50%',
              '--glow-y': '50%',
              '--glow-intensity': '0',
              '--glow-radius': '200px'
            } as React.CSSProperties;

            const cardContent = (
              <>
                <div className="card__corner-accent" />
                <div className="card__header flex justify-between items-start gap-3 relative text-white">
                  <div className="card__icon">
                    {card.icon}
                  </div>
                  <span className="card__label">{card.label}</span>
                </div>
                <div className="card__content flex flex-col relative text-white">
                  <h3 className={`card__title m-0 mb-1 ${''}`}>
                    {card.title}
                  </h3>
                  <p className={`card__description ${''}`}>
                    {card.description}
                  </p>
                </div>
              </>
            );

            if (enableStars) {
              return (
                <ParticleCard key={index} className={baseClassName} style={cardStyle} disableAnimations={shouldDisableAnimations} particleCount={particleCount} glowColor={glowColor} enableTilt={enableTilt} clickEffect={clickEffect} enableMagnetism={enableMagnetism}>
                  {cardContent}
                </ParticleCard>
              );
            }

            return (
              <div key={index} className={baseClassName} style={cardStyle}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;