"use client";
import { Navbar } from "../components/Navbar";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollText";
import ImageCard from "@/components/ImageCards";
import ShinyText from "@/components/ShinyText";
import ScrambledText from '@/components/ScambleText';
import LogoLoop from "@/components/LogoLoop";
import { StatsGrid } from "@/components/STMYStats";
import { getUpcomingEvents } from "@/lib/luma/queries";
import { ExternalLink } from "lucide-react";
import { CardCarouselLoop } from "@/components/MemberCarousel";
import Member from "@/components/MemberCard";
import ChromaGrid from '@/components/ChromaGrid'
import MagicBento from "@/components/MemberBento";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
];

const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  }
];

const placeholderProjects = [
  { id: 1, title: "Project Alpha" },
  { id: 2, title: "Project Beta" },
  { id: 3, title: "Project Gamma" },
  { id: 4, title: "Project Delta" },
  { id: 5, title: "Project Epsilon" },
  { id: 6, title: "Project Zeta" },
  { id: 7, title: "Project Eta" },
  { id: 8, title: "Project Theta" },
  { id: 9, title: "Project Iota" },
  { id: 10, title: "Project Kappa" },
];

const MEMBERS: Member[] = [
  {
    id: 1, name: "Aria Chen", role: "Protocol Engineer", company: "Solana Labs",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=aria&backgroundColor=b6e3f4",
    skills: ["Dev", "DeFi", "DAO"],
    badges: ["Core Contributor", "Hackathon Winner", "Solana Builder"],
    twitter: "@aria_onchain",
    achievements: [
      { icon: "⚡", title: "Solana Breakpoint 2023", description: "1st Place — DeFi Track ($50K prize)", year: "2023" },
      { icon: "◎", title: "Solana Foundation Grant", description: "$75K grant for cross-chain bridge protocol", year: "2023" },
      { icon: "◈", title: "Orca Protocol", description: "Core smart contract contributor, $2B+ TVL", year: "2022" },
      { icon: "◐", title: "MonkeDAO", description: "Technical steward, 3,000+ member DAO", year: "2022" },
    ],
  },
  {
    id: 2, name: "Marcus Webb", role: "Creative Director", company: "Magic Eden",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=marcus&backgroundColor=ffdfbf",
    skills: ["Design", "NFT", "Content"],
    badges: ["Solana Builder", "Hackathon Winner"],
    twitter: "@marcuswebb_sol",
    achievements: [
      { icon: "⚡", title: "Grizzlython 2023", description: "Best Design — NFT UX Innovation", year: "2023" },
      { icon: "◈", title: "Magic Eden Launchpad", description: "Designed UI serving 1M+ monthly users", year: "2022" },
      { icon: "◉", title: "Metaplex Bounty", description: "12 open-source UI bounties ($28K total)", year: "2023" },
      { icon: "◎", title: "Superteam Grant", description: "Creative tools grant for Solana artists ($20K)", year: "2023" },
    ],
  },
  {
    id: 3, name: "Priya Nair", role: "Ecosystem Lead", company: "Superteam",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=priya&backgroundColor=d1d4f9",
    skills: ["BizDev", "DAO", "Content"],
    badges: ["Core Contributor", "Grant Recipient", "DAO Steward"],
    twitter: "@priya_superteam",
    achievements: [
      { icon: "◐", title: "Superteam India", description: "Founded chapter, onboarded 500+ builders", year: "2022" },
      { icon: "◎", title: "Solana Foundation Grant", description: "$100K ecosystem growth grant", year: "2023" },
      { icon: "◈", title: "Breakpoint Speaker", description: "Keynote: 'Building in Emerging Markets'", year: "2023" },
      { icon: "◉", title: "Bounties Completed", description: "27 ecosystem bounties, $45K earned", year: "2022–23" },
    ],
  },
  {
    id: 4, name: "Kai Nakamoto", role: "DeFi Researcher", company: "Ellipsis Labs",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=kai&backgroundColor=c0aede",
    skills: ["Research", "Dev", "DeFi"],
    badges: ["Hackathon Winner", "Bounty Hunter", "Solana Builder"],
    twitter: "@kai_ellipsis",
    achievements: [
      { icon: "⚡", title: "Solana Sandstorm 2022", description: "Grand Prize — DeFi ($100K)", year: "2022" },
      { icon: "◈", title: "Phoenix DEX", description: "CLOB protocol, $500M+ monthly volume", year: "2023" },
      { icon: "◎", title: "Multicoin Research Grant", description: "MEV on Solana research, $60K funding", year: "2023" },
      { icon: "◉", title: "Audit Bounties", description: "Found 6 critical bugs, $80K in bounties", year: "2022–23" },
    ],
  },
  {
    id: 5, name: "Zoe Reyes", role: "Tokenomics Lead", company: "Drift Protocol",
    avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=zoe&backgroundColor=ffd5dc",
    skills: ["Research", "BizDev", "DeFi"],
    badges: ["Grant Recipient", "DAO Steward"],
    twitter: "@zoe_drift",
    achievements: [
      { icon: "◎", title: "Drift Foundation Grant", description: "Tokenomics research, $55K grant", year: "2023" },
      { icon: "◐", title: "Drift DAO", description: "Steward overseeing $12M treasury", year: "2023" },
      { icon: "◈", title: "Perpetuals AMM", description: "Co-designed vAMM, $800M open interest", year: "2022" },
      { icon: "⚡", title: "Colosseum 2024", description: "Finalist — DeFi Innovation track", year: "2024" },
    ],
  },
];

export default function HomePage() {
  return (
<main className="min-h-screen bg-[#07050B]">
  <Navbar />

  {/* ── HERO ── */}
  <section
  className="relative w-full min-h-screen overflow-hidden bg-[url('/assets/Hero-bg.png')] bg-[length:100%_auto] bg-top bg-no-repeat"
  >
    {/* Content */}
    <div className="relative z-10 flex items-start justify-between max-w-[1440] mx-auto px-8 pt-90 pb-16">
      {/* Left: hero copy */}
      <div className="flex-1 max-w-6xl">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-7xl font-bold tracking-tight max-w-6xl"
        >
          Malaysia&apos;s Home
          <br />
          for Solana Builders
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className=""
        >
          <ShinyText
            text="Where builders, creators, and founders come together."
            speed={4}
            delay={0.2}
            color="#ffffff"
            shineColor="#3c2b8c"
            spread={110}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
            className="text-2xl mt-10 text-white font-extralight italic max-w-xs leading-relaxed"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8"
        >
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
            Learn More
            <ExternalLink size={12} className="opacity-50" />
          </a>
        </motion.div>
      </div>
    </div>
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-white text-center py-8 mt-30"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-2xl mt-20 text-white font-extralight italic text-center"
        >
            Built by Malaysians, Recognized Globally.
        </motion.p>
      </motion.div>

      <section className="w-full px-4 ">
        <div className="grid grid-cols-5 gap-2 mb-2" style={{ height: "160px" }}>
          {placeholderProjects.slice(0, 5).map((project, i) => (
            <ImageCard key={project.id} project={project} index={i} className="h-full" />
          ))}
        </div>

        <div className="grid grid-cols-8 gap-2" style={{ height: "160px" }}>
          <ImageCard project={placeholderProjects[5]} index={5} className="col-span-2 h-full" />
          <ImageCard project={placeholderProjects[6]} index={6} className="col-span-1 h-full" />
          <ImageCard project={placeholderProjects[7]} index={7} className="col-span-2 h-full" />
          <ImageCard project={placeholderProjects[8]} index={8} className="col-span-1 h-full" />
          <ImageCard project={placeholderProjects[9]} index={9} className="col-span-2 h-full" />
        </div>
      </section>

      <section
        className="relative w-full bg-[url('/assets/Stats-bg.png')] bg-contain bg-top bg-no-repeat"
        style={{ minHeight: "200vw" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-6xl mx-auto px-8 py-2"
        >
          <ScrambledText
            className="scrambled-text-demo"
            radius={30}
            duration={1.2}
            speed={0.5}
            scrambleChars=".:"
          >
            <span className="block text-3xl font-light leading-relaxed text-white italic text-left">
              Superteam Malaysia exists to give every builder, creator, and founder the tools, network,
              and opportunities they need{" "}
              <a
                href="#"
                className="text-indigo-400 italic hover:text-indigo-300 transition-colors duration-200"
              >
                to win on the global stage
              </a>
              .
            </span>
          </ScrambledText>
        </motion.div>

        <StatsGrid></StatsGrid>

        <section className="relative z-10 max-w-[1400px] mx-auto px-8 mt-250">
          <div className="grid grid-cols-2 gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-6 pt-2"
            >
              <h2
                className="text-5xl font-bold leading-tight text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Stay Updated
                <br />
                With Our Events
              </h2>

              <p
                className="text-xl text-white text-extralight italic leading-relaxed max-w-[300px]"
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
          </div>
        </section>

        <section className="relative z-10 max-w-[1400px] mx-auto px-8 mt-80 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-6 pt-2 text-center"
            >
              <h2
                className="text-5xl font-bold leading-tight text-white text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Meet Our Core Team
              </h2>
              <p
                className="text-xl text-white text-extralight italic leading-relaxed max-w-[300px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                The team behind Superteam Malaysia.
              </p>
            </motion.div>
        </section>
        <section>
          <CardCarouselLoop members={MEMBERS} />
        </section>
        <section className="relative z-10 max-w-[1400px] mx-auto px-8 mt-60 mb-60">
          <div className="grid grid-cols-[1.5fr_2.8fr] items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col gap-6 pt-40"
            >
              <h2
                className="text-5xl font-bold leading-tight text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Why Become a
                <br />
                STMY Member?
              </h2>
              <p
                className="text-xl text-white text-extralight italic leading-relaxed max-w-[300px]"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Get access to a network of Malaysia's best Web3 minds, all in one place.
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
                Join Us Now
                <ExternalLink size={12} className="opacity-50" />
              </a>
            </motion.div>
            <MagicBento></MagicBento>
          </div>
          
          </section>
          <section>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-white text-center mb-15"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-2xl text-white font-extralight italic text-center"
              >
                  Tursted By Many.
              </motion.p>
            </motion.div>
            <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
            <LogoLoop
              logos={techLogos}
              speed={50}
              direction="left"
              logoHeight={60}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="#07050B"
              ariaLabel="Technology partners"
            />
          </div>
          </section>
        </section>
      </section>
      
    </main>
  );
}