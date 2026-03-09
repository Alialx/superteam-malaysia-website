import type { SanityStat } from '@/lib/sanity/queries'
import React, { ReactNode, RefObject } from 'react';

// ── Components ────────────────────────────────────────
export interface AnimatedLinkButtonProps {
  href: string
  label?: string
  delay?: number
  external?: boolean
}

export interface AnimatedTaglineProps {
  text: string
  className?: string
}

export interface AnimatedTextProps {
    text: string
    className?: string
}

export interface StatCardProps {
  stat: SanityStat
  index: number
}

export interface StatsGridProps {
  stats: SanityStat[]
}

export interface ImageCardClientProps {
  title: string
  image: string
  index: number
  className?: string
}

export interface FAQItem {
    _id: string
    question: string
    answer: string
    displayOrder: number
  }
  
export interface FAQSectionProps {
    faqs: FAQItem[]
}

export interface CardCarouselLoopProps {
    members: Member[];
  }  

export interface ModalProps {
    member: Member;
    onClose: () => void;
}

export interface MemberCardProps {
    member: Member;
    flipped: boolean;
    onFlip: () => void;
}

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

export interface ScrambledTextProps {
    radius?: number;
    duration?: number;
    speed?: number;
    scrambleChars?: string;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }

export interface ScrollRevealProps {
    children: ReactNode;
    scrollContainerRef?: RefObject<HTMLElement>;
    enableBlur?: boolean;
    baseOpacity?: number;
    baseRotation?: number;
    blurStrength?: number;
    containerClassName?: string;
    textClassName?: string;
    rotationEnd?: string;
    wordAnimationEnd?: string;
}

export interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    color?: string;
    shineColor?: string;
    spread?: number;
    yoyo?: boolean;
    pauseOnHover?: boolean;
    direction?: 'left' | 'right';
    delay?: number;
  }

export type LogoItem =
| {
    node: React.ReactNode;
    href?: string;
    title?: string;
    ariaLabel?: string;
}
| {
    src: string;
    alt?: string;
    href?: string;
    title?: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
};

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  pauseOnHover?: boolean;
  hoverSpeed?: number;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

  
// ── Sanity ────────────────────────────────────────────

export interface Badge {
  name: string
  icon: string
}

export interface Achievement {
  icon?: string
  image?: string
  title: string
  description?: string
  year: string
}

export interface Member {
  id: number
  name: string
  role: string
  company: string
  avatar: string
  skills: string[]
  twitter: string
  achievements: Achievement[]
}