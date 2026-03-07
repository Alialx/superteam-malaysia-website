"use client";

import { motion } from "framer-motion";
import { Users, FileText, Settings, UsersRound, DollarSign } from "lucide-react";
import CountUp from "./CountUp";

const stats = [
  {
    icon: Users,
    label: "Members",
    to: 40,
    suffix: "",
  },
  {
    icon: FileText,
    label: "Events Hosted",
    to: 40,
    suffix: "",
  },
  {
    icon: Settings,
    label: "Projects",
    to: 10,
    suffix: "+",
  },
  {
    icon: UsersRound,
    label: "Community Reach",
    to: 100,
    suffix: "K",
  },
  {
    icon: DollarSign,
    label: "Bounties Completed",
    to: 100,
    suffix: "+",
  },
];

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="flex flex-col gap-4 py-10 px-30"
    >
      {/* Icon pill */}
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/10">
          <Icon size={18} className="text-white" />
        </div>
        <span className="text-white text-xl italic font-light">
          {stat.label}
        </span>
      </div>

      {/* Number */}
      <div className="flex items-end">
        <span className="text-7xl font-bold text-white leading-none tracking-tight">
          <CountUp
            from={0}
            to={stat.to}
            separator=","
            direction="up"
            duration={1.5}
            className="count-up-text"
          />
          {stat.suffix}
        </span>
      </div>
    </motion.div>
  );
}

export function StatsGrid() {
  return (
    <section className="w-full px-8 py-16 max-w-[1400px] mx-auto">
      {/* Row 1 — 3 stats */}
      <div className="grid grid-cols-3 gap-0 border-b border-white/5">
        {stats.slice(0, 3).map((stat, i) => (
          <div
            key={stat.label}
            className={i < 2 ? "border-r border-white/5" : ""}
          >
            <StatCard stat={stat} index={i} />
          </div>
        ))}
      </div>

      {/* Row 2 — 2 stats */}
      <div className="grid grid-cols-2 gap-0">
        {stats.slice(3).map((stat, i) => (
          <div
            key={stat.label}
            className={i === 0 ? "border-r border-white/5" : ""}
          >
            <StatCard stat={stat} index={i + 3} />
          </div>
        ))}
      </div>
    </section>
  );
}