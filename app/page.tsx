import Providers from "@/components/Providers";
import AuroraBackdrop from "@/components/aurora/AuroraBackdrop";
import Nav from "@/components/aurora/Nav";
import SmoothScroll from "@/components/aurora/SmoothScroll";
import ScrollProgress from "@/components/aurora/ScrollProgress";
import PixelCursor from "@/components/aurora/PixelCursor";
import TapBurst from "@/components/aurora/TapBurst";
import SkylineDivider from "@/components/aurora/SkylineDivider";
import Marquee from "@/components/aurora/Marquee";
import Hero from "@/components/aurora/Hero";
import WorkSection from "@/components/aurora/WorkSection";
import ExperienceSection from "@/components/aurora/ExperienceSection";
import AboutSection from "@/components/aurora/AboutSection";
import SkillsSection from "@/components/aurora/SkillsSection";
import JourneySection from "@/components/aurora/JourneySection";
import ContactSection from "@/components/aurora/ContactSection";

export default function Home() {
  return (
    <Providers>
      <SmoothScroll />
      <PixelCursor />
      <TapBurst />
      <ScrollProgress />
      <Nav />
      <main id="main" className="relative">
        {/* pinned hero — the rest of the page slides over it */}
        <Hero />

        {/* the curtain: skyline crown, then opaque night sky content */}
        <div className="relative z-10">
          <SkylineDivider />
          <div className="relative overflow-clip bg-night">
            <AuroraBackdrop />
            <div className="relative">
              <Marquee />
              <WorkSection />
              <ExperienceSection />
              <AboutSection />
              <SkillsSection />
              <JourneySection />
              <SkylineDivider />
              <ContactSection />
            </div>
          </div>
        </div>
      </main>
    </Providers>
  );
}
