import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const MainContentSection = () => {
  const iconBadges = [
    {
      src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-38.svg",
      alt: "Component",
    },
    {
      src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-31.svg",
      alt: "Component",
    },
    {
      src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-35.svg",
      alt: "Component",
    },
  ];

  const footerLinks = [
    {
      text: "Features",
      href: "#features",
    },
    {
      text: "Contact",
      href: "#contact",
    },
    {
      text: "Projects",
      href: "#projects",
    },
    {
      text: "Updates",
      href: "#updates",
    },
    {
      text: "Privacy",
      href: "#privacy",
    },
  ];

  return (
    <section className="flex flex-col items-start pt-0 pb-[150px] px-0 w-full">
      <div className="flex gap-[60px] pt-40 pb-10 px-4 md:px-8 lg:px-16 xl:px-24 bg-orbai-templateframerwebsitewild-sand overflow-hidden flex-col items-center justify-center relative w-full">
        <div className="flex flex-col w-full max-w-7xl h-[1031px] items-start absolute top-[-238px] left-0">
          <div className="relative self-stretch w-full h-[1031.39px] mb-[-0.39px] bg-[url(https://c.animaapp.com/mewus0n76JsNvN/img/ampvrvyhfqxbob0v2qyjln83ji-mp4-1.png)] bg-cover bg-[50%_50%]" />
        </div>

        <div className="absolute w-full max-w-7xl h-[746px] top-0 left-0 [background:radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0)_0%,rgba(255,255,255,1)_100%)]" />

        <div className="flex flex-col max-w-[1200px] w-full items-center justify-center px-0 py-10 relative">
          <div className="flex flex-col max-w-[1028px] items-center justify-center gap-8 relative">
            <div className="flex items-center justify-center gap-4 relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
              {iconBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-start relative">
                  <div className="flex items-center justify-center p-3 relative bg-orbai-templateframerwebsitewhite-30 rounded-lg shadow-[inset_0px_0px_9px_#ffffff80]">
                    <div className="flex flex-col w-4 h-4 items-start relative">
                      <img
                        className="relative self-stretch w-full h-4"
                        alt={badge.alt}
                        src={badge.src}
                      />
                    </div>
                    <div className="absolute w-10 h-10 top-0 left-0 rounded-lg border border-solid border-white" />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center justify-center gap-4 relative w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
              

              <div className="flex flex-col w-full max-w-[446px] items-start relative">
                <div className="flex flex-col items-center relative w-full">
                  <p className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                    Next-gen AI systems, built for tomorrow&apos;s innovators
                  </p>
                </div>
              </div>
            </div>

            <div className="flex relative w-full items-center justify-center translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
              <div className="flex flex-col items-start relative">
                <Button
                  className="h-auto inline-flex items-center justify-center pt-[11px] pb-3 px-6 bg-wwwsightfulcomblack rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-wwwsightfulcomblack/90 transition-colors"
                  asChild
                >
                  <a
                    href="/signup"
                    className="gap-2 flex items-center justify-center w-full"
                  >
                    <div className="flex flex-col items-start relative">
                      <div className="flex flex-col items-start relative w-full">
                        <span className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomwhite text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                          Get Started
                        </span>
                      </div>
                    </div>
                    <ArrowRightIcon className="w-5 h-5 text-wwwsightfulcomwhite" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer className="flex gap-6 w-full bg-transparent flex-col items-center justify-center relative translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <nav className="flex items-center justify-center gap-[60px] pl-[627.09px] pr-[627.11px] py-0 relative z-[1]">
            {footerLinks.map((link, index) => (
              <div key={index} className="flex flex-col items-start relative">
                <div className="flex flex-col items-center relative w-full">
                  <div className="flex items-start justify-center relative">
                    <a
                      className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 underline whitespace-nowrap hover:text-wwwsightfulcomblack/80 transition-colors"
                      href={link.href}
                    >
                      {link.text}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </nav>

          <div className="flex items-center pt-6 pb-0 px-0 relative z-0">
            <div className="flex flex-col w-full max-w-7xl items-start relative opacity-90">
              <div className="flex items-start justify-center relative w-full">
                <p className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  ORBAI © 2025. Designed by
                </p>
                <div className="flex items-start justify-center relative">
                  <a
                    className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 underline whitespace-nowrap hover:text-wwwsightfulcomblack/80 transition-colors"
                    href="#"
                  >
                    FrameBase
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};
