"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Events", href: "/events" },
  { label: "Members", href: "/members" },
  { label: "Projects", href: "/projects" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-20"
    >
      <div className="pointer-events-none mx-auto flex max-w-[1440] items-center justify-between px-6 pt-6 lg:px-8">
        <div className="pointer-events-auto inline-flex items-center gap-2">
          <Image
            src="/assets/STMY%20logo%20long.svg"
            alt="Superteam Malaysia"
            width={180}
            height={50}
            priority
          />
        </div>

        <nav className="pointer-events-auto hidden items-center gap-8 rounded-3xl border border-white/10 bg-neutral-900/40 px-5 py-2 text-sm font-light text-neutral-200 shadow-lg shadow-purple-500/20 backdrop-blur md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/join"
            className="ml-4 inline-flex items-center justify-center rounded-full bg-white/95 px-4 py-1.5 text-sm font-light text-black shadow-md shadow-white/40 transition hover:bg-white hover:shadow-white/70"
          >
            Join Now
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}

