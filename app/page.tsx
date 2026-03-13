import { CardCarouselLoop } from "@/components/MembersCarousel/MemberCarousel";
import HeroSection from "@/components/Hero";
import LumaSection from "@/components/LumaSection";
import BeMemberSection from "@/components/BeMemberSection";
import FAQ from "@/components/FAQ/FAQServer";
import TextSection from "@/components/TextSection";
import FeatureCards from '@/components/FeatureCard'
import StatSection from '@/components/Statistics/StatServer'
import MemberTextSection from "@/components/MemberText";
import UpdateTextSection from "@/components/UpdateText";
import EcosystemTextSection from "@/components/EcosystemPartner/EcosystemTextSection";
import PartnerSection from "@/components/EcosystemPartner/PartnerLogosServer";
import TwitterFeedSection from "@/components/TwitterFeed";
import TwitterFeedWrapper from "@/components/TwitterWrapper";
import FeaturedProjectsClient from '@/components/FeaturedProjects'
import FeaturedProjectText from '@/components/FeaturedProjectText'
import CTASection from "@/components/CTA";
import GalleryClient from '@/components/ImageGallery'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07050B]">

      {/* ── HERO ── */}
      <section id="about" className="relative w-full min-h-screen overflow-hidden bg-[url('/assets/Hero-bg-new.png')] lg:bg-[length:100%_auto] bg-top bg-no-repeat bg-[length:120%_auto]">
        <div className="relative z-10 flex flex-col lg:flex-row items-start justify-between max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 pt-[clamp(4rem,16vw,22.5rem)] lg:pb-64">
          <HeroSection />
        </div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-120 md:mb-60">
          <TextSection />
        </div>

        {/* ── FEATURES + STATS ── */}
        <section id="" className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-20 lg:mt-35">
          <FeatureCards />
          <div className="mt-15 lg:mt-25 mb-35 lg:mb-60">
            <StatSection />
          </div>
        </section>
      </section>
      
      {/* ── GRADIENT BG 1 ── */}
      <section className="relative w-full bg-[url('/assets/Gradient-bg-1.png')] bg-cover bg-top bg-no-repeat">
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mb-250">
          <UpdateTextSection />
        </div>
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 lg:mb-35">
          <GalleryClient />
        </div>
        <div className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8">
          <MemberTextSection />
          <CardCarouselLoop />
        </div>
      </section>

      {/* ── GRADIENT BG 2 ── */}
      <section className="relative w-full bg-[url('/assets/Gradient-bg-2.png')] bg-cover bg-top bg-no-repeat">
        <div className="relative z-10 max-w-[1700px] mx-auto px-8 mt-35 lg:mt-60">
          <BeMemberSection />
          <div className="mb-35">
            <EcosystemTextSection />
            <PartnerSection />
          </div>
          <div className="mb-35">
            <FeaturedProjectText />
            <FeaturedProjectsClient />
          </div>
          <TwitterFeedSection/>
          <TwitterFeedWrapper/>
        </div>
      </section>

      {/* ── GRADIENT BG 2 ── */}
      <section className="relative w-full bg-cover bg-top bg-no-repeat">
        <div className="relative z-10 max-w-[1700px] mx-auto px-8 mt-35 lg:mt-60 mb-15 lg:mb-10">
        
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative z-10 max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 mb-5 lg:mb-20">
        <FAQ />
      </section>

      <section
        className="relative w-full bg-[url('/assets/CTA-bg.png')] bg-cover bg-top bg-no-repeat"
      >
        <div className="absolute inset-0 -z-10"></div>
        <div className="relative z-10 max-w-[1700px] mx-auto px-8 py-35">
          <CTASection />
        </div>
      </section>

    </main>
  );
}