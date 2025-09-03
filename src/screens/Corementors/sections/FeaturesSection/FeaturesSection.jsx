import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

/* -------------------- UTIL: in-view hook (SSR safe) -------------------- */
const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target); // fire once
        }
      },
      { threshold: 0.5, ...(options || {}) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

/* -------------------- TYPEWRITER (runs when in view) -------------------- */
const TypewriterOnScroll = ({ text, className, speed = 45 }) => { // slower typing
  const { ref, inView } = useInView({ threshold: 0.6 });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [inView, text, speed]);

  return (
    <>
      <style>{`@keyframes blink{0%,100%{opacity:0}50%{opacity:1}}`}</style>
      <h1 ref={ref} className={className}>
        {shown}
        <span className="inline-block w-[1ch] -mb-[2px] border-r border-black animate-[blink_1s_steps(1)_infinite]" />
      </h1>
    </>
  );
};

/* -------------------- REVEAL (slide from CORNERS on scroll) -------------------- */
const RevealOnScroll = ({
  direction = "left",     // backward-compat (ignored if origin provided)
  origin,                 // "tl" | "tr" | "bl" | "br"
  delayMs = 0,
  durationMs = 4500,      // a bit longer so entry clearly dikhai de
  children,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.15,
    rootMargin: "0px 0px -20% 0px",
  });

  // Compute X/Y offset: corners ke hisaab se
  let dx = 0, dy = 0;
  const OFFSET = 140; // bada offset so entry visible
  if (origin === "tl") { dx = -OFFSET; dy = -OFFSET; }
  else if (origin === "tr") { dx = OFFSET; dy = -OFFSET; }
  else if (origin === "bl") { dx = -OFFSET; dy = OFFSET; }
  else if (origin === "br") { dx = OFFSET; dy = OFFSET; }
  else {
    // fallback to old left/right behaviour
    dx = direction === "left" ? -OFFSET : OFFSET;
    dy = 0;
  }

  return (
    <div
      ref={ref}
      style={{
        transform: inView
          ? "translate(0, 0) scale(1)"
          : `translate(${dx}px, ${dy}px) scale(0.96)`,
        opacity: inView ? 1 : 0,
        transitionProperty: "transform, opacity",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.19,1,0.22,1)",
        transitionDelay: `${delayMs}ms`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
};

/* -------------------- YOUR EXISTING DATA (unchanged) -------------------- */
const featuresData = [
  {
    id: 1,
    title: "Launch Campaigns That Sell Themselves.",
    description:
      "→ Festive & seasonal templates\n→ One-click push to Instagram, WhatsApp, Facebook, TikTok\n→ Custom titles, offers, discount rules\n→ Multi-channel reach (Email, WhatsApp, SMS)\n→ Flexible rewards (discounts, freebies, no-discount promos)",
    iconSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/group-6.png",
    graphicSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/graphic.png",
    hasGraphic: true,
    fontSize: "text-[19.1px]",
  },
  {
    id: 2,
    title: "Never Miss a Birthday, Anniversary, or Festival Again.",
    description:
      "Biz365 Auto-Campaign remembers your customers and boosts your sales — automatically.\n\nYou approve. We deliver. Your customers celebrate with you.\n\n🎉Special days tracked automatically\n🎉One-click campaign launch\n🎉Multi-channel delivery (SMS, WhatsApp, Email)\n🎉No AI complexity — simple and effective\n🎉Visible results in dashboard",
    iconSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/group-7.png",
    hasGraphic: false,
    fontSize: "text-[18.8px]",
  },
  {
    id: 3,
    title: "Not Just a Code. A Connection.",
    description:
      "From games to reviews, from loyalty to followers — Magic QR makes every scan unforgettable.\n\n\"Scan. Spin. Smile. Repeat.\"\n\n🎯Spin-the-wheel gamification\n🎯Birthday & special occasion triggers\n🎯Loyalty sign-ups made fun\n🎯Digital menus & Google reviews\n🎯Instagram follows & business cards\n🎯Store & campaign links",
    iconSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/group-8.png",
    hasGraphic: false,
    fontSize: "text-[18.4px]",
  },
  {
    id: 4,
    title: "Feedback That Rewards.",
    description:
      "Your customers share. You listen. They earn. You grow.\n\n\"Turn every opinion into an opportunity.\"\n\n💬Smart forms that customers love to fill\n💬Incentivized feedback with loyalty points\n💬Actionable insights from responses\n💬Continuous improvement loop\n💬Silent risk prevention through early warnings",
    iconSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/group-9.png",
    graphicSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/graphic-1.png",
    hasGraphic: true,
    fontSize: "text-[18.8px]",
  },
];

const buttonsData = [
  { text: "Get Started", href: "https://orbai-template.framer.website/#pricing", variant: "primary", hasIcon: true },
  { text: "See Our Services", href: "https://orbai-template.framer.website/#services", variant: "secondary", hasIcon: false },
];

/* -------------------- Animated bullets (typed) -------------------- */
const AnimatedBulletPoints = ({ text, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setIsVisible(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      {text}
    </div>
  );
};

/* -------------------- SHARED CARD CLASSES (uniform, wider) -------------------- */
/* Wider cards: full width of inner container, large max width, centered */
const cardClass =
  "w-full max-w-[1100px] mx-auto bg-orbai-templateframerwebsitewild-sand rounded-[20px] overflow-hidden " +
  "shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-0";
const cardContentClass = "flex items-center gap-8 p-10 min-h-[360px]";

/* -------------------- MAIN SECTION -------------------- */
export const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-[360px] py-[100px] bg-orbai-templateframerwebsitewild-sand">
      <div className="relative w-full max-w-[1200px]">
        {/* Header */}
        <header className="w-full flex flex-col items-center mb-[70px] translate-y-[-1rem] animate-fade-in opacity-0">
          <Badge
            variant="outline"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 mb-6 bg-orbai-templateframerwebsitewild-sand rounded-[60px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border-neutral-100"
          >
            <div className="flex flex-col w-4 h-5 items-start">
              <img
                className="w-[13px] h-3.5 mt-[3px] ml-0.5"
                alt="Features icon"
                src="https://c.animaapp.com/mewus0n76JsNvN/img/group-10.png"
              />
            </div>
            <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.2px] tracking-[0] leading-[14.4px]">
              FEATURES
            </span>
          </Badge>

          {/* TYPEWRITER (exact same text) */}
          <TypewriterOnScroll
            text="All Struggles is over with Biz365 Dashboard"
            className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_100%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-[52px] text-center tracking-[-0.56px] leading-[67.2px] mb-6"
          />

          <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 opacity-80 max-w-[500px] translate-y-[-1rem] animate-fade-in">
            Discover features that simplify workflows & grow your business.
          </p>
        </header>

        {/* Features Grid */}
        <div className="flex flex-col gap-6 mb-[46px]">
          {/* Row 1 */}
          <div className="flex flex-col gap-6">
            {/* 1: top-left corner */}
            <RevealOnScroll origin="tl" delayMs={150} durationMs={4500}>
              <Card className={cardClass}>
                <CardContent className={cardContentClass}>
                  <div className="flex flex-col w-full max-w-[500px] justify-center gap-8">
                    <div className="inline-flex items-center justify-center px-2.5 py-2 rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.25px_#ababab59,0px_13.65px_13.65px_-2.71px_#ababab82,0px_6.87px_6.87px_-2.17px_#ababab94,0px_3.62px_3.62px_-1.62px_#ababab9c,0px_1.81px_1.81px_-1.08px_#abababa1,0px_0.71px_0.71px_-0.54px_#abababa3] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_100%)] w-fit">
                      <div className="flex flex-col w-[31px] h-[34px] items-start">
                        <img className="w-[23px] h-[23px] mt-[5px] ml-1" alt="AI icon" src={featuresData[0].iconSrc} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[19.1px] tracking-[-0.20px] leading-6">
                        {featuresData[0].title}
                      </h3>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-8 opacity-80 text-left space-y-3">
                        {featuresData[0].description.split("\n").map((line, index) => (
                          <AnimatedBulletPoints key={index} text={line} delay={1000 + index * 300} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>

            {/* 2: top-right corner */}
            <RevealOnScroll origin="tr" delayMs={250} durationMs={4500}>
              <Card className={cardClass}>
                <CardContent className={cardContentClass}>
                  <div className="flex flex-col w-full max-w-[500px] justify-center gap-8">
                    <div className="inline-flex items-center justify-center px-2.5 py-2 rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.25px_#ababab59,0px_13.65px_13.65px_-2.71px_#ababab82,0px_6.87px_6.87px_-2.17px_#ababab94,0px_3.62px_3.62px_-1.62px_#ababab9c,0px_1.81px_1.81px_-1.08px_#abababa1,0px_0.71px_0.71px_-0.54px_#abababa3] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_100%)] w-fit">
                      <div className="flex flex-col w-[31px] h-[34px] items-start">
                        <img className="w-[27px] h-[25px] mt-1 ml-0.5" alt="Workflows icon" src={featuresData[1].iconSrc} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[18.8px] tracking-[-0.20px] leading-6">
                        {featuresData[1].title}
                      </h3>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-8 opacity-80 text-left space-y-3">
                        {featuresData[1].description.split("\n").map((line, index) => (
                          <AnimatedBulletPoints key={index} text={line} delay={1200 + index * 300} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>

          {/* Row 2 */}
          <div className="flex flex-col gap-6">
            {/* 3: bottom-left corner */}
            <RevealOnScroll origin="bl" delayMs={150} durationMs={4500}>
              <Card className={cardClass}>
                <CardContent className={cardContentClass}>
                  <div className="flex flex-col w-full max-w-[500px] justify-center gap-8">
                    <div className="inline-flex items-center justify-center px-2.5 py-2 rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.25px_#ababab59,0px_13.65px_13.65px_-2.71px_#ababab82,0px_6.87px_6.87px_-2.17px_#ababab94,0px_3.62px_3.62px_-1.62px_#ababab9c,0px_1.81px_1.81px_-1.08px_#abababa1,0px_0.71px_0.71px_-0.54px_#abababa3] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_100%)] w-fit">
                      <div className="flex flex-col w-[31px] h-[34px] items-start">
                        <img className="w-[27px] h-[17px] mt-[7px] ml-0.5" alt="Analytics icon" src={featuresData[2].iconSrc} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[18.4px] tracking-[-0.20px] leading-6">
                        {featuresData[2].title}
                      </h3>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-8 opacity-80 text-left space-y-3">
                        {featuresData[2].description.split("\n").map((line, index) => (
                          <AnimatedBulletPoints key={index} text={line} delay={1100 + index * 300} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>

            {/* 4: bottom-right corner */}
            <RevealOnScroll origin="br" delayMs={250} durationMs={4500}>
              <Card className={cardClass}>
                <CardContent className={cardContentClass}>
                  <div className="flex flex-col w-full max-w-[500px] justify-center gap-8">
                    <div className="inline-flex items-center justify-center px-2.5 py-2 rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.25px_#ababab59,0px_13.65px_13.65px_-2.71px_#ababab82,0px_6.87px_6.87px_-2.17px_#ababab94,0px_3.62px_3.62px_-1.62px_#ababab9c,0px_1.81px_1.81px_-1.08px_#abababa1,0px_0.71px_0.71px_-0.54px_#abababa3] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_100%)] w-fit">
                      <div className="flex flex-col w-[31px] h-[34px] items-start">
                        <img className="w-[25px] h-[25px] mt-1 ml-[3px]" alt="Support icon" src={featuresData[3].iconSrc} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-6">
                      <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[18.8px] tracking-[-0.20px] leading-6">
                        {featuresData[3].title}
                      </h3>
                      <div className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-8 opacity-80 text-left space-y-3">
                        {featuresData[3].description.split("\n").map((line, index) => (
                          <AnimatedBulletPoints key={index} text={line} delay={1400 + index * 300} />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center translate-y-[-1rem] animate-fade-in opacity-0">
          {buttonsData.map((button, idx) => (
            <Button
              key={idx}
              asChild
              variant={button.variant === "primary" ? "default" : "outline"}
              className={`h-auto inline-flex items-center justify-center pt-[11px] pb-3 px-6 rounded-[10px] overflow-hidden ${
                button.variant === "primary"
                  ? "bg-wwwsightfulcomblack shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-wwwsightfulcomblack/90"
                  : "bg-orbai-templateframerwebsitewild-sand shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.5px_#9e9e9e4c,0px_13.65px_13.65px_-2.92px_#9e9e9e85,0px_6.87px_6.87px_-2.33px_#9e9e9e9c,0px_3.62px_3.62px_-1.75px_#9e9e9ea6,0px_1.81px_1.81px_-1.17px_#9e9e9ead,0px_0.71px_0.71px_-0.58px_#9e9e9eb0] hover:bg-orbai-templateframerwebsitewild-sand/90"
              } border-0`}
            >
              <a
                href={button.href}
                rel="noopener noreferrer"
                target="_blank"
                className={`inline-flex items-center gap-2 [font-family:'Inter',Helvetica] font-medium text-sm tracking-[0] leading-[22.4px] ${
                  button.variant === "primary" ? "text-wwwsightfulcomwhite" : "text-wwwsightfulcomblack"
                }`}
              >
                {button.text}
                {button.hasIcon && <ArrowRightIcon className="w-5 h-5" />}
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};