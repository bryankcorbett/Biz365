import React, { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

/* ---------- in-view hook (SSR safe) ---------- */
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

    let obs;
    try {
      obs = new IntersectionObserver(
        ([entry]) => {
          if (entry && entry.isIntersecting) {
            setInView(true);
            obs.unobserve(entry.target); // trigger once
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -10% 0px", ...(options || {}) }
      );
      obs.observe(el);
    } catch {
      setInView(true);
    }

    return () => {
      try { obs && obs.disconnect(); } catch {}
    };
  }, [options]);

  return { ref, inView };
};

/* ---------- Reveal container (slide-up + fade) ---------- */
const RevealOnScroll = ({ delayMs = 0, durationMs = 900, children }) => {
  const { ref, inView } = useInView({ threshold: 0.25 });
  const hidden = "translate3d(0, 24px, 0)";
  const shown = "translate3d(0, 0, 0)";
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

/* ---------- Staggered words animation (per word delay) ---------- */
const AnimatedWords = ({ words, lineDelay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <div ref={ref} className="flex items-center justify-center gap-2 mb-2 flex-wrap">
      {words.map((word, idx) => (
        <span
          key={`${word.text}-${idx}`}
          className={`${word.className} inline-block translate-y-2 opacity-0`}
          style={{
            transform: inView ? "translateY(0)" : "translateY(8px)",
            opacity: inView ? 1 : 0,
            transition: `transform 700ms cubic-bezier(0.19,1,0.22,1) ${lineDelay + idx * 70}ms, opacity 700ms ease ${lineDelay + idx * 70}ms`,
            willChange: "transform, opacity",
            whiteSpace: "nowrap",
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
};

/* ==================== DATA (unchanged) ==================== */
const animatedTextWords = [
  { text: "Happy", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
  { text: "customers", className: "[font-family:'Inter',Helvetica] font-semibold text-[#1f2937] text-[24px] drop-shadow-sm" },
  { text: "don't", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
  { text: "just", className: "font-medium text-[#6b7280] text-[20px] [font-family:'Inter',Helvetica]" },
  { text: "return", className: "[font-family:'Inter',Helvetica] font-semibold text-[#1f2937] text-[24px] drop-shadow-sm" },
  { text: "—", className: "text-[#9ca3af] text-[22px] [font-family:'Inter',Helvetica] font-medium" },
  { text: "they", className: "text-[#374151] text-[22px] [font-family:'Inter',Helvetica] font-medium" },
  { text: "bring", className: "text-[#1f2937] text-[24px] [font-family:'Inter',Helvetica] font-semibold drop-shadow-sm" },
  { text: "friends.", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
];

const animatedTextWordsLine2 = [
  { text: "Referral", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
  { text: "prompts", className: "text-[#1f2937] text-[22px] [font-family:'Inter',Helvetica] font-semibold drop-shadow-sm" },
  { text: "via", className: "[font-family:'Inter',Helvetica] font-medium text-[#6b7280] text-[20px]" },
  { text: "email/", className: "font-medium text-[#9ca3af] text-[18px] [font-family:'Inter',Helvetica]" },
  { text: "WhatsApp", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
];

const animatedTextWordsLine3 = [
  { text: "Unique", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
  { text: "codes", className: "[font-family:'Inter',Helvetica] font-semibold text-[#1f2937] text-[22px] drop-shadow-sm" },
  { text: "&", className: "[font-family:'Inter',Helvetica] font-medium text-[#9ca3af] text-[20px]" },
  { text: "links", className: "[font-family:'Inter',Helvetica] font-semibold text-[#1f2937] text-[22px] drop-shadow-sm" },
  { text: "for", className: "[font-family:'Inter',Helvetica] font-medium text-[#6b7280] text-[20px]" },
  { text: "tracking", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
];

const animatedTextWordsLine4 = [
  { text: "Mutual", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
  { text: "rewards", className: "text-[#1f2937] text-[22px] [font-family:'Inter',Helvetica] font-semibold drop-shadow-sm" },
  { text: "for", className: "[font-family:'Inter',Helvetica] font-medium text-[#9ca3af] text-[18px]" },
  { text: "both", className: "[font-family:'Inter',Helvetica] font-medium text-[#9ca3af] text-[18px]" },
  { text: "parties", className: "text-[#1f2937] text-[22px] [font-family:'Inter',Helvetica] font-semibold drop-shadow-sm" },
];

const animatedTextWordsLine5 = [
  { text: "Ripple", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
  { text: "network", className: "[font-family:'Inter',Helvetica] font-semibold text-[#1f2937] text-[22px] drop-shadow-sm" },
  { text: "growth", className: "[font-family:'Inter',Helvetica] font-semibold text-[#1f2937] text-[22px] drop-shadow-sm" },
  { text: "effect", className: "[font-family:'Inter',Helvetica] font-medium text-[#374151] text-[22px]" },
];

/* ==================== COMPONENT ==================== */
export const ReviewsSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-[100px] bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center gap-11 w-full">
        {/* Header Section (unchanged visual) */}
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] flex flex-col min-w-0 max-w-[700px] items-center justify-center gap-[15px] w-full">
          <div className="flex flex-col items-start">
            <Badge variant="premium" className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-[60px] group">
              <div className="flex flex-col w-4 h-5 items-start">
                <div className="relative w-full h-5">
                  <img className="absolute w-6 h-5 top left-px" alt="Group" src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/bb139178-e08a-429e-826c-1b8d041be1d7" />
                </div>
              </div>
              <span className="font-orbai-template-framer-website-inter-medium font-[number:var(--orbai-template-framer-website-inter-medium-font-weight)] text-wwwsightfulcomblack text-[length:var(--orbai-template-framer-website-inter-medium-font-size)] tracking-[var(--orbai-template-framer-website-inter-medium-letter-spacing)] leading-[var(--orbai-template-framer-website-inter-medium-line-height)] [font-style:var(--orbai-template-framer-website-inter-medium-font-style)]">
                CUSTOMERS
              </span>
            </Badge>
          </div>

          <div className="flex flex-col items-center w-full">
            <h2 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_100%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] font-orbai-template-framer-website-semantic-heading-2 font-[number:var(--orbai-template-framer-website-semantic-heading-2-font-weight)] text-[length:var(--orbai-template-framer-website-semantic-heading-2-font-size)] text-center tracking-[var(--orbai-template-framer-website-semantic-heading-2-letter-spacing)] leading-[var(--orbai-template-framer-website-semantic-heading-2-line-height)] [font-style:var(--orbai-template-framer-website-semantic-heading-2-font-style)]">
              Turn Customers Into Marketers
            </h2>
          </div>

          <div className="flex flex-col max-w-[500px] w-full items-center opacity-80">
            <p className="font-muskymore-biz365-ai-inter-regular font-[number:var(--muskymore-biz365-ai-inter-regular-font-weight)] text-wwwsightfulcomblack text-[length:var(--muskymore-biz365-ai-inter-regular-font-size)] text-center tracking-[var(--muskymore-biz365-ai-inter-regular-letter-spacing)] leading-[var(--muskymore-biz365-ai-inter-regular-line-height)] [font-style:var(--muskymore-biz365-ai-inter-regular-font-style)]">
              Every customer can invite their friends with a unique link — you gain new sales, they gain rewards.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative w-full">
          {/* Animated Testimonial Card with reveal + hover float */}
          <RevealOnScroll delayMs={150} durationMs={900}>
            <div className="flex justify-center w-full mb-6">
              <Card className="flex flex-col max-w-[800px] w-full bg-gradient-to-br from-white via-gray-50/30 to-gray-100/20 rounded-[20px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border border-gray-200/30 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0px_40px_40px_-8px_#00000010,0px_20px_20px_-6px_#00000015] hover:border-gray-300/50 group">
                <CardContent className="flex flex-col items-center pt-[60px] pb-10 px-10">
                  <div className="flex flex-col max-w-screen-sm items-center justify-center gap-6 w-full">
                    {/* Animated Text (staggered words) */}
                    <div className="flex flex-col max-w-screen-sm items-center w-full">
                      <div className="min-h-[200px] relative w-full flex flex-col items-center justify-center">
                        <AnimatedWords words={animatedTextWords} lineDelay={0} />
                        <AnimatedWords words={animatedTextWordsLine2} lineDelay={250} />
                        <AnimatedWords words={animatedTextWordsLine3} lineDelay={500} />
                        <AnimatedWords words={animatedTextWordsLine4} lineDelay={750} />
                        <AnimatedWords words={animatedTextWordsLine5} lineDelay={1000} />
                      </div>
                    </div>

                    {/* Quote Icon */}
                    <div className="flex flex-col w-[38px] items-start">
                      <div className="relative w-full h-[41px]">
                        <img className="absolute w-[31px] h-[30px] top-2.5 left-1" alt="Group" src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/77a15f15-7134-40cc-85e3-c9a483c3c14e" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};