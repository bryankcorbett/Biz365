import { useEffect, useRef } from "react";
import { Button } from "../../../../components/ui/button";
import { ArrowRight } from "lucide-react";
import OrbBackground from "../../../../components/OrbBackground";
import "./herosection.css";
import logoblack from "../../../../assets/logoblack.png";

export default function HeroSection({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
}) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <OrbBackground 
        hue={hue}
        hoverIntensity={hoverIntensity}
        rotateOnHover={rotateOnHover}
        forceHoverState={forceHoverState}
        className="orb-container w-full max-w-[1200px] h-[1200px]"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          {/* Title - Inside the circle */}
          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms] flex items-center justify-center pointer-events-auto mt-64 text-md">
              <h1 className="bg-[linear-gradient(11deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-orbai-template-framer-website-semantic-heading-1 font-[number:var(--orbai-template-framer-website-semantic-heading-1-font-weight)] text-[length:var(--orbai-template-framer-website-semantic-heading-1-font-size)] tracking-[var(--zai-template-framer-website-semantic-heading-1-letter-spacing)] leading-[var(--orbai-template-framer-website-semantic-heading-1-line-height)] [font-style:var(--orbai-template-framer-website-semantic-heading-1-font-style)]">
              <img src={logoblack} alt="Biz365 Logo" className="w-64 object-contain"/>
              </h1>
            </div>

        {/* Subtitle - Inside the circle */}
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms] flex flex-col w-full max-w-[446px] items-center pointer-events-auto" style={{ marginBottom: '30px' }}>
              <p className="font-muskymore-biz365-ai-inter-regular font-[number:var(--muskymore-biz365-ai-inter-regular-font-weight)] text-wwwsightfulcomblack text-[length:var(--muskymore-biz365-ai-inter-regular-font-size)] text-center tracking-[var(--muskymore-biz365-ai-inter-regular-letter-spacing)] leading-[var(--muskymore-biz365-ai-inter-regular-line-height)] [font-style:var(--muskymore-biz365-ai-inter-regular-font-style)]">
              From sales to loyalty, Biz365 Dashboard shows you everything you need to grow.
              </p>
          </div>

        {/* Buttons - Inside the circle at bottom */}
        <div className="flex gap-4 items-center pointer-events-auto mb-20" >
            <Button
              asChild
            variant="default"
            className="h-auto inline-flex items-center justify-center pt-[11px] pb-3 px-6 rounded-[10px] overflow-hidden bg-wwwsightfulcomblack shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-wwwsightfulcomblack/90 border-0"
            >
              <a
              href="/signup"
                className="inline-flex items-center gap-2 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-[22.4px] text-wwwsightfulcomwhite"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
            className="h-auto inline-flex items-center justify-center pt-[11px] pb-3 px-6 rounded-[10px] overflow-hidden bg-orbai-templateframerwebsitewild-sand shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.5px_#9e9e9e4c,0px_13.65px_13.65px_-2.92px_#9e9e9e85,0px_6.87px_6.87px_-2.33px_#9e9e9e9c,0px_3.62px_3.62px_-1.75px_#9e9e9ea6,0px_1.81px_1.81px_-1.17px_#9e9e9ead,0px_0.71px_0.71px_-0.58px_#9e9e9eb0] hover:bg-orbai-templateframerwebsitewild-sand/90 border-0"
            >
              <a
                href="#services"
                className="inline-flex items-center gap-2 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-[22.4px] text-wwwsightfulcomblack"
              >
                  See Our Services
              </a>
            </Button>
          </div>
        </div>
      </div>
  );
}

