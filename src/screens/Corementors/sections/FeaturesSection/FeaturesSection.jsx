import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

/* -------------------- In-view hook -------------------- */
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
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.25, ...(options || {}) }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

/* -------------------- Typewriter -------------------- */
const TypewriterOnScroll = ({ text, className, speed = 38 }) => {
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
        <span className="inline-block w-[1ch] border-r border-black animate-[blink_1s_steps(1)_infinite]" />
      </h1>
    </>
  );
};

/* -------------------- Reveal -------------------- */
const RevealOnScroll = ({ origin = "tl", delayMs = 0, durationMs = 900, children }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const OFFSET = 80;
  const map = { tl: [-OFFSET, -OFFSET], tr: [OFFSET, -OFFSET], bl: [-OFFSET, OFFSET], br: [OFFSET, OFFSET] };
  const [dx, dy] = map[origin] || [0, 0];

  return (
    <div
      ref={ref}
      style={{
        transform: inView ? "translate(0,0)" : `translate(${dx}px, ${dy}px)`,
        opacity: inView ? 1 : 0,
        transition: `transform ${durationMs}ms cubic-bezier(0.19,1,0.22,1) ${delayMs}ms, opacity ${durationMs}ms ease ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* -------------------- Premium Image -------------------- */
const PremiumImage = ({ src, alt = "feature visual", side = "right" }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const from = side === "left" ? "-40px" : "40px";

  return (
    <div
      ref={ref}
      className="w-full md:w-[420px] lg:w-[460px] shrink-0"
      style={{
        transform: inView ? "translateX(0) scale(1)" : `translateX(${from}) scale(0.96)`,
        opacity: inView ? 1 : 0,
        transition: "transform 800ms cubic-bezier(0.19,1,0.22,1), opacity 800ms ease",
      }}
    >
      <div
        className="rounded-[22px] p-[2px]"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.15), rgba(255,255,255,0.25))",
        }}
      >
        <div className="rounded-[20px] overflow-hidden bg-white shadow-[0_22px_40px_-18px_rgba(0,0,0,0.28)]">
          <img
            src={src}
            alt={alt}
            className="w-full h-[230px] md:h-[250px] lg:h-[270px] object-cover select-none 
                       filter grayscale hover:grayscale-0 transition duration-500 ease-in-out"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

/* -------------------- Data -------------------- */
const featuresData = [
  {
    id: 1,
    title: "Launch Campaigns That Sell Themselves.",
    description:
      "→ Festive & seasonal templates\n→ One-click push to Instagram, WhatsApp, Facebook, TikTok\n→ Custom titles, offers, discount rules\n→ Multi-channel reach (Email, WhatsApp, SMS)\n→ Flexible rewards (discounts, freebies, no-discount promos)",
    graphicSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/graphic.png",
  },
  {
    id: 2,
    title: "Never Miss a Birthday, Anniversary, or Festival Again.",
    description:
      "Biz365 Auto-Campaign remembers your customers and boosts your sales — automatically.\n\nYou approve. We deliver. Your customers celebrate with you.\n\n🎉 Special days tracked automatically\n🎉 One-click campaign launch\n🎉 Multi-channel delivery (SMS, WhatsApp, Email)\n🎉 Simple and effective\n🎉 Visible results in dashboard",
    graphicSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/graphic.png",
  },
  {
    id: 3,
    title: "Not Just a Code. A Connection.",
    description:
      "From games to reviews, from loyalty to followers — Magic QR makes every scan unforgettable.\n\n\"Scan. Spin. Smile. Repeat.\"\n\n🎯 Spin-the-wheel gamification\n🎯 Birthday & special occasion triggers\n🎯 Loyalty sign-ups made fun\n🎯 Digital menus & Google reviews\n🎯 Instagram follows & business cards\n🎯 Store & campaign links",
    graphicSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/graphic.png",
  },
  {
    id: 4,
    title: "Feedback That Rewards.",
    description:
      "Your customers share. You listen. They earn. You grow.\n\n\"Turn every opinion into an opportunity.\"\n\n💬 Smart forms customers love\n💬 Incentivized feedback with loyalty points\n💬 Actionable insights from responses\n💬 Continuous improvement loop\n💬 Silent risk prevention with early warnings",
    graphicSrc: "https://c.animaapp.com/mewus0n76JsNvN/img/graphic-1.png",
  },
];

const buttonsData = [
  { text: "Get Started", href: "/signup", variant: "primary", hasIcon: true },
  { text: "See Our Services", href: "#services", variant: "secondary", hasIcon: false },
];

/* -------------------- Animated Bullet -------------------- */
const AnimatedBullet = ({ text, delay = 0 }) => {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setOn(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div
      className={`transition-all duration-700 ease-out ${
        on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {text}
    </div>
  );
};

/* -------------------- Feature Card -------------------- */
const FeatureCard = ({ feature, imageLeft = false }) => {
  return (
    <Card className="w-full max-w-[1100px] mx-auto bg-white rounded-[24px] overflow-hidden shadow-[0_24px_48px_-20px_rgba(0,0,0,0.18)] border-0">
      <CardContent
        className={`flex flex-col md:flex-row items-center gap-10 p-10 ${
          imageLeft ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* TEXT */}
        <div className="flex flex-col w-full md:flex-1 gap-6">
          <h3 className="text-[22px] md:text-[26px] leading-tight tracking-[-0.02em] text-gray-900 font-semibold">
            {feature.title}
          </h3>
          <div className="text-[15.5px] md:text-[16.5px] leading-7 text-gray-700 text-left space-y-3 [font-feature-settings:'ss01'on]">
            {feature.description.split("\n").map((line, i) => (
              <AnimatedBullet key={i} text={line} delay={450 + i * 220} />
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <PremiumImage src={feature.graphicSrc} side={imageLeft ? "left" : "right"} />
      </CardContent>
    </Card>
  );
};

/* -------------------- Main Section -------------------- */
export const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center px-4 md:px-8 lg:px-[360px] py-[100px] bg-gray-50">
      <div className="w-full max-w-[1200px]">
        {/* Header */}
        <header className="flex flex-col items-center mb-[70px]">
          <Badge
            variant="outline"
            className="px-4 py-1.5 mb-6 rounded-full border-gray-200 bg-white/80 shadow-sm"
          >
            FEATURES
          </Badge>
          <TypewriterOnScroll
            text="All Struggles are Over with Biz365 Dashboard"
            className="font-semibold text-[40px] md:text-[52px] text-center leading-tight mb-6 bg-gradient-to-b from-black to-gray-700 bg-clip-text text-transparent"
          />
          <p className="text-gray-600 text-base text-center max-w-[640px]">
            Discover features that simplify workflows & grow your business.
          </p>
        </header>

        {/* Alternating Cards */}
        <div className="flex flex-col gap-10 mb-[46px]">
          <RevealOnScroll origin="tl">
            <FeatureCard feature={featuresData[0]} imageLeft={false} />
          </RevealOnScroll>
          <RevealOnScroll origin="tr">
            <FeatureCard feature={featuresData[1]} imageLeft={true} />
          </RevealOnScroll>
          <RevealOnScroll origin="bl">
            <FeatureCard feature={featuresData[2]} imageLeft={false} />
          </RevealOnScroll>
          <RevealOnScroll origin="br">
            <FeatureCard feature={featuresData[3]} imageLeft={true} />
          </RevealOnScroll>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {buttonsData.map((button, idx) => (
            <Button
              key={idx}
              asChild
              variant={button.variant === "primary" ? "default" : "outline"}
              className="h-auto px-6 py-3 rounded-xl shadow-sm"
            >
              <a
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium text-sm"
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

export default FeaturesSection;
