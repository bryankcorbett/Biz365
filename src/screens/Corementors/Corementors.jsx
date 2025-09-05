import React from "react";
import { Button } from "../../components/ui/button";
import Magnet from "../../components/Magnet";
import { BenefitsSection } from "./sections/BenefitsSection/BenefitsSection";
import { ComparisonSection } from "./sections/ComparisonSection/ComparisonSection";
import { DesktopViewSection } from "./sections/DesktopViewSection/DesktopViewSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { FounderNoteSection } from "./sections/FounderNoteSection/FounderNoteSection";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { PricingSection } from "./sections/PricingSection/PricingSection";
import { ProcessSection } from "./sections/ProcessSection/ProcessSection";
import { ProjectsSection } from "./sections/ProjectsSection/ProjectsSection";
import { ReviewsSection } from "./sections/ReviewsSection/ReviewsSection";
import { ServicesSection } from "./sections/ServicesSection/ServicesSection";
import { TeamSection } from "./sections/TeamSection/TeamSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import StarBorder from "../../components/loginButton";
import AnimatedNavbar from "../../components/AnimatedNavbar";
import ShinyText from "../../components/ShinyText";
import iconblack from "../../assets/iconblack.png";

const navigationItems = [
  {
    label: "Dashboard",
    href: "#dashboard",
  },
  {
    label: "Campaigns",
    href: "#campaigns",
  },
  {
    label: "Insights",
    href: "#insights",
  },
  {
    label: "Loyalty",
    href: "#loyalty",
  },
  {
    label: "Magic QR",
    href: "#magic-qr",
  },
  {
    label: "BizTag",
    href: "#biztag",
  },
];

export const Corementors = () => {
  return (
    <div
      className="flex flex-col items-start relative bg-[linear-gradient(0deg,rgba(245,245,245,1)_0%,rgba(245,245,245,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] bg-orbai-templateframerwebsitewhite-wild-sand w-full max-w-full overflow-x-hidden"
      data-model-id="1:308"
    >
      <div className="relative self-stretch w-full bg-orbai-templateframerwebsitewild-sand">
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <div style={{ width: '100%', height: '600px', position: 'relative' }}>
            <HeroSection
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false} /></div>

        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <FounderNoteSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <BenefitsSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <FeaturesSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          <ServicesSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
          {/* <ProcessSection /> */}
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]">
          {/* <ProjectsSection /> */}
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms]">
          <ReviewsSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms]">
          <PricingSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1800ms]">
          {/* <ComparisonSection /> */}
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:2000ms]">
          {/* <TeamSection /> */}
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:2200ms]">
          <DesktopViewSection />
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:2400ms]">
          {/* <MainContentSection /> */}
        </div>
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:2600ms]">
          <FooterSection />
        </div>
      </div>

      


      <header className="flex flex-col w-[100%] items-start fixed top-0 left-0 z-50 ">
        <nav className="flex justify-center bg-white w-full max-w-full pt-3 pb-4 px-4 self-stretch flex-[0_0_auto] [-webkit-backdrop-filter:blur(2.5px)_brightness(100%)] items-center relative" >
          <div className="absolute h-16 top-0 left-0 border-b-2 [border-bottom-style:solid] border-[#ffffff4c]" />

          <div className="flex w-[100%] items-center justify-between relative pl-[9vw] pr-[4vw]">
            {/* Logo - Left Side (Start) */}
            <div className="absolute left-0 flex-shrink-0">
              <div className="relative w-[170px] h-[80px] max-w-[230px] max-h-[150px]">
                <img 
                  src="https://ik.imagekit.io/corementorid/black_full_glow_biz365.png?updatedAt=1757074822500"
                  alt="Biz365 Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Navigation - Center */}
            <div className="flex-1 flex justify-center ml-16 mt-4">
              <AnimatedNavbar navigationItems={navigationItems} />
            </div>

            {/* Buttons - Right Side */}
            <div className="flex-shrink-0 flex items-center gap-3">
              <StarBorder
                as="a"
                href="/login"
                className="custom-class"
                color="#ffffff"
                speed="2s"
                onClick={() => window.location.href = '/login'}
              >
                Log in
              </StarBorder>

              <Magnet
                padding={50}
                magnetStrength={3}
                disabled={false}
                activeTransition="transform 0.2s ease-out"
                inactiveTransition="transform 0.4s ease-in-out"
              >
                <Button
                  className="inline-flex items-center justify-center pt-2 pb-2 px-3 sm:pt-[11px] sm:pb-3 sm:px-6 h-auto w-auto bg-wwwsightfulcomblack rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-gray-800 transition-colors ml-[1.2vw]"
                  asChild
                >
                  <a
                    href="/signup"
                  >
                    <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomwhite text-xs sm:text-sm tracking-[0] leading-[18px] sm:leading-[22.4px] whitespace-nowrap">
                      <span className="hidden sm:inline">Try it for free</span>
                      <span className="sm:hidden">Try free</span>
                    </span>
                  </a>
                </Button>
              </Magnet>
            </div>
          </div>
        </nav>
      </header>

      
    </div>
  );
};

export default Corementors;
