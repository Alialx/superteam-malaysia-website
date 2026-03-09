import { Navbar } from "../components/Navbar";
import ImageCards from "@/components/ImageCards/ImageCards";
import LogoLoop from "@/components/LogoLoop";
import { CardCarouselLoop } from "@/components/MembersCarousel/MemberCarousel";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import HeroSection from "@/components/Hero";
import AnimatedTagline from "@/components/Tagline";
import LongTagline from "@/components/LongTagline";
import LumaSection from "@/components/LumaSection";
import Text from "@/components/MiddleText";
import BeMemberSection from "@/components/BeMemberSection";
import FAQ from "@/components/FAQ/FAQServer";
import StatSection from "@/components/Statistics/StatServer";
const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
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
    <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-[clamp(6rem,18vw,22.5rem)] pb-8 md:pb-30 lg:pb-64">

      <HeroSection/>
    </div>
    <AnimatedTagline text="Built by Malaysians, Recognized Globally."/>
    <section className="w-full px-4 ">
      <ImageCards/>
    </section>

      <section
        className="relative w-full bg-[url('/assets/Stats-bg.png')] bg-contain bg-top bg-no-repeat"
        style={{ minHeight: "200vw" }}
      >
        <LongTagline/>
        <StatSection/>
        <section className="relative z-10 max-w-[1400px] mx-auto px-8 mt-250">
          <div className="grid grid-cols-2 gap-20 items-start">
            <LumaSection/>
          </div>
        </section>

        <section className="relative z-10 max-w-[1400px] mx-auto px-8 mt-80 mb-10 text-5xl font-bold leading-tight text-white text-center">
          <Text text="Meet Our Members" className=""/>
        </section>
        <div style={{ width: "100%", overflow: "hidden" }}>
          <CardCarouselLoop></CardCarouselLoop>
        </div>
        <section className="relative z-10 max-w-[1400px] mx-auto px-8 mt-60 mb-60">
          <BeMemberSection/>          
          </section>
          <section>
          <AnimatedTagline text="Trusted By Many." className="text-2xl"/>
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
        <FAQ/>
      </section>
      
    </main>
  );
}