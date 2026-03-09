"use client"
import { useState, useEffect, useRef, useCallback, memo } from "react";
import Member from "@/components/MembersCarousel/MemberCard";
import { MemberCard } from "@/components/MembersCarousel/MemberCard";
import { getAllMembers, mapSanityMembers } from '@/lib/sanity/queries'

const CARD_W     = 337;   // px
const GAP        = 32;    // px between cards
const SPEED      = 80;    // px/s nominal scroll speed
const SMOOTH_TAU = 0.28;  // velocity-smoothing time constant (seconds)
const COPIES     = 4;     // track duplicates for seamless loop
const raw = await getAllMembers()
const MEMBERS = mapSanityMembers(raw)

const members: Member[] = MEMBERS.map((m: any, index: number) => ({
  id: index,           
  name: m.name,
  role: m.role,
  company: m.company,
  avatar: m.avatar,
  twitter: m.twitter,
  skills: m.skills ?? [],
  achievements: m.achievements ?? [],
}))

export function CardCarouselLoop() {
    const trackRef    = useRef<HTMLDivElement>(null);
    const isHoveredRef = useRef<boolean>(false);
  
    const seqWidth = (CARD_W + GAP) * members.length;
  
    const [flippedIds, setFlippedIds] = useState<Record<number, boolean>>({});
  
    const toggleFlip = useCallback((id: number) => {
      setFlippedIds((prev) => ({ ...prev, [id]: !prev[id] }));
    }, []);
  
    const handleMouseEnter = useCallback(() => { isHoveredRef.current = true; }, []);
    const handleMouseLeave = useCallback(() =>
    {
      isHoveredRef.current = false;
      setFlippedIds({});  
    }, []);
    
    /* RAF animation loop */
    useEffect(() => {
      if (!trackRef.current || seqWidth === 0) return;
  
      const track = trackRef.current;
      let offset   = 0;
      let velocity = SPEED;
      let lastTs: number | null = null;
      let rafId: number;
  
      const tick = (ts: number) => {
        if (lastTs === null) lastTs = ts;
        const dt = Math.min((ts - lastTs) / 1000, 0.1);
        lastTs = ts;
  
        const target = isHoveredRef.current ? 0 : SPEED;
        const alpha  = 1 - Math.exp(-dt / SMOOTH_TAU);
        velocity += (target - velocity) * alpha;
  
        offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
  
        rafId = requestAnimationFrame(tick);
      };
  
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }, [seqWidth]);
  
    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}

        style={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            alignItems: "center",
            width: "max-content",
            willChange: "transform",
            paddingTop: "20px",
            paddingBottom: "28px",
            gap: `${GAP}px`,
          }}
        >
          {Array.from({ length: COPIES }, (_, copyIdx) =>
            members.map((member) => (
              <MemberCard
                key={`${copyIdx}-${member.id}`}
                member={member}
                flipped={!!flippedIds[member.id]}
                onFlip={() => toggleFlip(member.id)}
              />
            ))
          )}
        </div>
      </div>
    );
  }
  