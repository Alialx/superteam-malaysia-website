/* "use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight, ExternalLink } from "lucide-react";
import type { LumaEvent } from "@/lib/luma/queries";



const placeholderEvents: LumaEvent[] = [
  {
    id: "1",
    title: "Solana Builder Meetup KL",
    slug: "solana-builder-meetup",
    start_at: "2025-04-12T18:00:00Z",
    url: "#",
    status: "upcoming",
    location: "Kuala Lumpur, MY",
  },
  {
    id: "2",
    title: "Superteam Malaysia Demo Day",
    slug: "superteam-demo-day",
    start_at: "2025-04-20T14:00:00Z",
    url: "#",
    status: "upcoming",
    location: "Kuala Lumpur, MY",
  },
  {
    id: "3",
    title: "Web3 Founders Networking Night",
    slug: "web3-founders-night",
    start_at: "2025-05-03T19:00:00Z",
    url: "#",
    status: "upcoming",
    location: "Petaling Jaya, MY",
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-MY", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BackgroundSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="ev-glow-1" cx="15%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#3730a3" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#3730a3" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ev-glow-2" cx="75%" cy="25%" r="40%">
          <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#ev-glow-1)" />
      <rect width="100%" height="100%" fill="url(#ev-glow-2)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <line
          key={`v${i}`}
          x1={`${(i / 13) * 100}%`} y1="0"
          x2={`${(i / 13) * 100}%`} y2="100%"
          stroke="white" strokeOpacity="0.02" strokeWidth="1"
        />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <line
          key={`h${i}`}
          x1="0" y1={`${(i / 7) * 100}%`}
          x2="100%" y2={`${(i / 7) * 100}%`}
          stroke="white" strokeOpacity="0.02" strokeWidth="1"
        />
      ))}
      <circle cx="8%" cy="75%" r="140" fill="none" stroke="white" strokeOpacity="0.035" strokeWidth="1" />
      <circle cx="8%" cy="75%" r="220" fill="none" stroke="white" strokeOpacity="0.02" strokeWidth="1" />
      <circle cx="92%" cy="15%" r="90" fill="none" stroke="white" strokeOpacity="0.035" strokeWidth="1" />
    </svg>
  );
}

function EventCard({ event, index }: { event: LumaEvent; index: number }) {
  return (
    <motion.a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="group flex items-center gap-4 p-4 rounded-2xl
        bg-white/5 border border-white/[0.08] hover:border-indigo-500/40 hover:bg-white/[0.08]
        transition-all duration-300"
    >
      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-900/40 border border-white/10 flex items-center justify-center">
        <Calendar size={18} className="text-indigo-400/70" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate group-hover:text-indigo-300 transition-colors duration-200">
          {event.title}
        </p>
        <div className="flex items-center gap-3 mt-1 flex-wrap">
          <span className="flex items-center gap-1 text-white/40 text-xs">
            <Calendar size={10} />
            {formatDate(event.start_at)}
          </span>
          {event.location && (
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <MapPin size={10} />
              {event.location}
            </span>
          )}
        </div>
      </div>

      <ArrowUpRight
        size={15}
        className="flex-shrink-0 text-white/20 group-hover:text-indigo-400 transition-colors duration-200"
      />
    </motion.a>
  );
}

export function EventsSection({ events = placeholderEvents }: { events?: LumaEvent[] }) {
  return (
    <section
      className="relative w-full overflow-hidden py-24"
      style={{ backgroundColor: "#07050B" }}
    >
      <BackgroundSVG />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-2 gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col gap-6 pt-2"
          >
            <h2
              className="text-4xl font-bold leading-tight text-white"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Stay Updated
              <br />
              With Our Events
            </h2>

            <p
              className="text-white/50 text-sm italic leading-relaxed max-w-[260px]"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Where builders, creators, and founders come together.
            </p>

            <a
              href="https://lu.ma/superteammy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-white/20 text-white/80 text-sm italic font-medium w-fit
                hover:border-white/40 hover:text-white hover:bg-white/5
                transition-all duration-300 backdrop-blur-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Follow Our Luma
              <ExternalLink size={12} className="opacity-50" />
            </a>
          </motion.div>

          <div className="flex flex-col gap-3">
            {events.length > 0 ? (
              events.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))
            ) : (
              <div className="flex items-center justify-center h-32 rounded-2xl border border-white/5 text-white/20 text-sm">
                No upcoming events
              </div>
            )}

            <motion.a
              href="https://lu.ma/superteammy"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-1.5 mt-1
                text-white/25 hover:text-white/50 text-xs transition-colors duration-200"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View all events on Luma
              <ArrowUpRight size={11} />
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
} */