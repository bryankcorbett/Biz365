import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Badge } from "../../../../components/ui/badge";

/* ------- in-view hook (SSR safe + guarded) ------- */
const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    if (typeof window.IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    let obs = null;
    try {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setInView(true);
            if (obs) obs.unobserve(entry.target); // fire once
          }
        },
        { threshold: 0.5, ...(options || {}) }
      );
      obs.observe(el);
    } catch (error) {
      console.warn('IntersectionObserver not supported:', error);
      setInView(true);
    }
    return () => {
      try {
        if (obs) obs.disconnect();
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    };
  }, [options]);

  return { ref, inView };
};

/* ------- Typewriter (runs when in view) ------- */
const TypewriterOnScroll = ({ text, className, speed = 60 }) => {
  const { ref, inView } = useInView({ threshold: 0.6 });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown((prev) => (prev === text ? prev : text.slice(0, i)));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [inView, text, speed]);

  return (
    <>
      <style>{`@keyframes blink{0%,100%{opacity:0}50%{opacity:1}}`}</style>
      <h3 ref={ref} className={className}>
        {shown}
        <span className="inline-block w-[1ch] -mb-[2px] border-r border-black animate-[blink_1s_steps(1)_infinite]" />
      </h3>
    </>
  );
};

/* ------- Reveal from LEFT / RIGHT on scroll (slower + more visible) ------- */
const RevealOnScroll = ({
  origin = "left",     // "left" | "right" (also supports tl/tr/bl/br if you ever need)
  delayMs = 0,
  durationMs = 1600,   // longer duration
  children,
}) => {
  const { ref, inView } = useInView({ threshold: 0.2, rootMargin: "0px 0px -15% 0px" });

  const OFFSET = 360; // bigger offset so entry clearly visible
  const map = {
    left: [-OFFSET, 0],
    right: [OFFSET, 0],
    tl: [-OFFSET, -OFFSET],
    tr: [OFFSET, -OFFSET],
    bl: [-OFFSET, OFFSET],
    br: [OFFSET, OFFSET],
  };
  const [dx, dy] = map[origin] || [0, 0];

  const hidden = `translate3d(${dx}px, ${dy}px, 0) scale(0.94)`;
  const shown  = "translate3d(0,0,0) scale(1)";

  return (
    <div
      ref={ref}
      style={{
        transform: inView ? shown : hidden,
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(6px)",
        transition: `
          transform ${durationMs}ms cubic-bezier(0.19,1,0.22,1) ${delayMs}ms,
          opacity ${durationMs}ms ease ${delayMs}ms,
          filter ${durationMs}ms ease ${delayMs}ms
        `,
        willChange: "transform, opacity, filter",
      }}
    >
      {children}
    </div>
  );
};

/* ------- Animated line reveal for description (slightly slower) ------- */
const LineReveal = ({ children, delay = 0 }) => {
  const [v, setV] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setV(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-[900ms] ease-out ${
        v ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      {children}
    </div>
  );
};

/* -------------------- DATA (as-is) -------------------- */
const servicesData = [
  {
    id: 1,
    title: "AI Strategy Consulting",
    description: "Get expert guidance to implement AI solutions that drive business growth",
    size: "small",
    decorativeElements: [
      { type: "bar", className: "w-[137px] h-1.5 top-[91px] left-[91px] rotate-[36deg]" },
      { type: "circle", className: "w-11 h-11 top-[145px] left-[77px]" },
      { type: "circle", className: "w-8 h-8 top-[19px] left-[317px]" },
      { type: "circle", className: "w-[22px] h-[22px] top-[95px] left-[166px]" },
      { type: "circle", className: "w-[22px] h-[22px] top-[92px] left-[161px]" },
      { type: "large-circle", className: "w-[124px] h-[124px] top-[94px] left-[184px]", hasLogo: true, logoSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/logo-1.png" },
      { type: "medium-circle", className: "w-[84px] h-[84px] top-[9px] left-[60px]", hasIcon: true, iconSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/mask-group.svg" }
    ],
    gradient: "w-[437px] h-[306px] left-[-45px] [background:radial-gradient(50%_50%_at_94%_8%,rgba(184,199,217,0.5)_0%,rgba(184,199,217,0)_100%)] opacity-10"
  },
  {
    id: 2,
    title: "Your Business, Crystal Clear.",
    description:
      "✓Crystal-clear visibility of sales, orders, customers, rewards\n✓Loyalty engine auto-rewards every purchase\n✓Competitor-proof clarity → no blind spots\n✓Business growth made predictable through simplicity",
    size: "large",
    hasDropdown: true,
    dropdownOptions: ["View Sales Report", "Check Customer Data", "Analyze Growth"]
  },
  {
    id: 3,
    title: "Tap Into Growth.",
    description:
      "makes every tap a new opportunity.\n\n\"BizTag: One Tap. Endless Possibilities.\"\n\n\"Why hand out cards when your brand can live in every customer's phone?\"\n\n⚡NFC + QR dual technology\n⚡edirect to Google Reviews / Instagram\n⚡Loyalty / Digital Menu instant access\n⚡Custom Links & Save Contact",
    size: "large",
    hasDropdown: true,
    dropdownOptions: ["Scan QR Code", "Save Contact", "View Menu"]
  },
  {
    id: 4,
    title: "Automated Workflows",
    description: "Automate workflows to streamline tasks, boost efficiency, and save time",
    size: "small",
    workflowIcons: [
      { src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-10.svg", className: "w-[70px] h-[70px] top-[83px] left-[43px]", iconSize: "w-[45px] h-[45px]" },
      { src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-18.svg", className: "w-[58px] h-[58px] top-[164px] left-[211px]", iconSize: "w-[33px] h-[33px]" },
      { src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-23.svg", className: "w-[45px] h-[45px] top-[11px] left-[58px]", iconSize: "w-[27px] h-[27px]" },
      { src: "https://c.animaapp.com/mewus0n76JsNvN/img/component-1-14.svg", className: "w-12 h-12 top-[39px] left-[308px]", iconSize: "w-[27px] h-[27px]" }
    ],
    centralLogo: { src: "https://c.animaapp.com/mewus0n76JsNvN/img/logo-2.png", className: "top-[11px] left-[132px]" }
  }
];

/* ------ right side image (same size as earlier visual box) ------ */
const RIGHT_IMAGES = {
  2: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
  3: "https://cdn.pixabay.com/photo/2021/05/27/02/07/gamestop-6286877_1280.jpg",
};

export const ServicesSection = () => {
  return (
    <section id="services" className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-16 py-16 sm:py-20 lg:py-[100px] bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center gap-11 w-full">
        {/* Header Section (as-is) */}
        <header className="flex flex-col min-w-0 max-w-[700px] items-center justify-center gap-[15px] w-full translate-y-[-1rem] animate-fade-in opacity-0">
          <Badge
            variant="outline"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border-neutral-100"
          >
            <div className="flex flex-col w-4 h-5 items-start">
              <div className="relative self-stretch w-full h-5">
                <img className="absolute w-6 h-5 top-0 left-0.5" alt="Group" src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/7cb85085-2d66-47ca-b2e1-727c6533bb9a" />
              </div>
            </div>
            <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.6px] tracking-[0] leading-[14.4px]">
              SERVICES
            </span>
          </Badge>

          <div className="flex flex-col items-center w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h2 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-[52.4px] text-center tracking-[-0.56px] leading-tight sm:leading-[1.2] lg:leading-[67.2px]">
              What We Offer
            </h2>
          </div>

          <div className="flex flex-col max-w-[500px] w-full items-center pt-px pb-0 px-0 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm sm:text-base text-center tracking-[0] leading-5 sm:leading-6">
              From reviews to loyalty, from social media to menus — BizTag makes every tap a new opportunity.
            </p>
          </div>
        </header>

        {/* Services Grid */}
        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-screen-xl mx-auto translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          {/* First Row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* Card: id=2 - appears from LEFT (slower + visible) */}
            <RevealOnScroll origin="left" delayMs={100} durationMs={1600}>
              <Card className="w-full max-w-4xl bg-orbai-templateframerwebsitewild-sand rounded-[20px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-0">
                <CardContent className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 p-4 sm:p-6 lg:p-[30px] min-h-[300px] lg:min-h-[360px]">
                  {/* LEFT: text */}
                  <div className="flex flex-col gap-4 flex-1">
                    <TypewriterOnScroll
                      text={servicesData[1].title}
                      className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-lg sm:text-xl lg:text-[18.8px] tracking-[-0.20px] leading-5 sm:leading-6"
                      speed={60}
                    />
                    <div className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm sm:text-base tracking-[0] leading-5 sm:leading-6 opacity-80">
                      {servicesData[1].description.split("\n").map((line, index) => (
                        <LineReveal key={index} delay={300 + index * 160}>
                          <div className="mb-3">{line}</div>
                        </LineReveal>
                      ))}
                    </div>
                  </div>
                  {/* RIGHT: responsive IMAGE */}
                  <div className="w-full lg:w-[400px] rounded-2xl overflow-hidden shadow-[0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
                    <img src={RIGHT_IMAGES[2]} alt="service-visual-2" className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover" loading="lazy" />
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>

          {/* Second Row */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {/* Card: id=3 - appears from RIGHT (slower + visible) */}
            <RevealOnScroll origin="right" delayMs={250} durationMs={1600}>
              <Card className="w-full max-w-4xl bg-orbai-templateframerwebsitewild-sand rounded-[20px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-0">
                <CardContent className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 p-4 sm:p-6 lg:p-[30px] min-h-[300px] lg:min-h-[360px]">
                  {/* LEFT: text */}
                  <div className="flex flex-col gap-4 flex-1">
                    <TypewriterOnScroll
                      text={servicesData[2].title}
                      className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-lg sm:text-xl lg:text-[18.8px] tracking-[-0.20px] leading-5 sm:leading-6"
                      speed={60}
                    />
                    <div className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm sm:text-base tracking-[0] leading-5 sm:leading-6 opacity-80">
                      {servicesData[2].description.split("\n").map((line, index) => (
                        <LineReveal key={index} delay={300 + index * 160}>
                          <div className="mb-3">{line}</div>
                        </LineReveal>
                      ))}
                    </div>
                  </div>
                  {/* RIGHT: responsive IMAGE */}
                  <div className="w-full lg:w-[400px] rounded-2xl overflow-hidden shadow-[0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
                    <img src={RIGHT_IMAGES[3]} alt="service-visual-3" className="w-full h-[200px] sm:h-[250px] lg:h-[300px] object-cover" loading="lazy" />
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};