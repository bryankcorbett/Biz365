import React, { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

/* -------------------- Intersection Observer -------------------- */
const useInView = (threshold = 0.25) => {
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
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
};

/* -------------------- Card data -------------------- */
const CARDS = [
  {
    title: "Loyalty That Truly Better Works Everywhere",
    lead:
      "From salons to food trucks, Biz365 points follow your customers — and bring them back to you.",
    bullets: [
      ["Cross-store redemption ", "builds ", "customer loyalty"],
      ["Network effect ", "amplifies ", "reach"],
      ["Small stores ", "feel ", "big-brand"],
      ["Boosts ", "repeat visits", " & footfall"],
      ["Differentiates ", "from single", " shop loyalty"],
    ],
    backImg:
      "src/pages/biz3655.png",
    caption: "Earn everywhere. Redeem anywhere.",
  },
  {
    title: "Catch Customers When They Spend the Most.",
    lead:
      "Biz365 Auto-Campaign turns birthdays and anniversaries into your biggest revenue days.",
    bullets: [
      ["Special days mean special spends. ", "Don't just wish — win their business.", ""],
      ["Customers don’t celebrate with empty pockets. ", "Full hearts, fuller carts.", ""],
    ],
    backImg:
      "https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1200&auto=format&fit=crop",
    caption: "Right moment. Higher basket size.",
  },
  {
    title: "Don't Just See Customers. Understand Them.",
    lead:
      "From VIPs to at-risk customers — Biz365 tells you who matters and how to keep them.",
    bullets: [
      ["Advanced segmentation: ", "VIP, Loyal, Can’t-Lose, Lost, At-Risk, Promising", ""],
      ["Smart recommendations ", "per segment", ""],
      ["Hybrid analytics: ", "interaction patterns, timing, decay", ""],
      ["Saves discounts; ", "increases retention & uplift", ""],
      ["Edge: POS/loyalty shows numbers — ", "Biz365 tells you the next action", ""],
    ],
    backImg:
      "src/pages/biz3678.png",
    caption: "Know who to talk to — and what to say.",
  },
];

/* -------------------- Single Flip Card -------------------- */
const FlipCard = ({ data }) => (
  <Card
    className="group relative w-[340px] md:w-[360px] h-[500px] rounded-[22px] border-0 bg-transparent perspective focus:outline-none focus:ring-2 focus:ring-amber-500/40"
    tabIndex={0} // keyboard focus enables flip
    role="button"
    aria-label={`${data.title} – flip for image`}
  >
    <CardContent className="p-0 h-full">
      {/* Inner wrapper with flip (hover + focus) */}
      <div
        className="
          relative w-full h-full transition-transform duration-700
          [transform-style:preserve-3d]
          group-hover:[transform:rotateY(180deg)]
          group-focus:[transform:rotateY(180deg)]
          motion-reduce:transition-none motion-reduce:[transform:none]
        "
      >
        {/* Front Face */}
        <div className="absolute inset-0 bg-white rounded-[22px] shadow-[0_20px_50px_-18px_rgba(0,0,0,0.22)] p-6 flex flex-col gap-4 backface-hidden">
          <div className="px-4 py-2 rounded-xl bg-gray-100 shadow-inner">
            <span className="text-[18px] font-semibold text-black">{data.title}</span>
          </div>

          <div className="rounded-2xl p-5 bg-white shadow-inner flex-1 overflow-auto">
            <p className="text-black text-[15.5px] leading-7 mb-3">{data.lead}</p>
            <ul className="space-y-2">
              {data.bullets.map(([pre, strong, post], idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 mt-[2px]" aria-hidden>✓</span>
                  <p className="text-sm leading-6 text-black">
                    {pre}
                    {strong && <span className="font-semibold text-black">{strong}</span>}
                    {post}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 rounded-[22px] bg-white shadow-[0_20px_50px_-18px_rgba(0,0,0,0.25)] [transform:rotateY(180deg)] backface-hidden flex flex-col">
          <div className="h-[70%] p-[10px]">
            <div className="w-full h-full rounded-[18px] overflow-hidden shadow-[0_18px_35px_-18px_rgba(0,0,0,0.28)]">
              <img
                src={data.backImg}
                alt="benefit"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-focus:grayscale-0 group-hover:scale-105 group-focus:scale-105 transition duration-700 ease-in-out motion-reduce:transition-none"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          </div>
          <div className="h-[30%] flex items-center justify-center px-6">
            <p className="text-center text-[15px] font-medium text-black">{data.caption}</p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

/* -------------------- Main Section -------------------- */
export const BenefitsSection = () => {
  const { ref: sectionRef, inView } = useInView(0.2);

  const enterClass = (i) =>
    inView
      ? "opacity-100 translate-y-0"
      : i === 0
      ? "opacity-0 translate-x-8"
      : i === 1
      ? "opacity-0 translate-y-8"
      : "opacity-0 -translate-x-8";

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center px-4 md:px-[360px] py-[100px] pb-[120px] bg-orbai-templateframerwebsitewild-sand"
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-5 mb-10">
        <Badge
          variant="outline"
          className="px-3 py-1.5 bg-white rounded-[60px] border-neutral-200 shadow-[0_3px_10px_rgba(0,0,0,0.08)]"
        >
          BENEFITS
        </Badge>
        <h2 className="text-[42px] md:text-[50px] font-semibold text-center leading-tight bg-gradient-to-b from-black to-gray-700 bg-clip-text text-transparent">
          Why Choose Us
        </h2>
        <p className="text-center text-black/80 max-w-[620px]">
          Partner with an AI agency delivering smart solutions.
        </p>
      </div>

      {/* Cards row */}
      <div className="w-full flex flex-col md:flex-row justify-center items-stretch gap-8">
        {CARDS.map((c, i) => (
          <div
            key={i}
            className={`transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)] ${enterClass(i)} motion-reduce:transition-none`}
            style={{ transitionDelay: `${i * 120}ms` }}
          >
            <FlipCard data={c} />
          </div>
        ))}
      </div>

      {/* Flip utilities */}
      <style>{`
        .perspective { perspective: 1200px; }
        .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        @media (prefers-reduced-motion: reduce) {
          .perspective { perspective: none; }
        }
      `}</style>
    </section>
  );
};

export default BenefitsSection;
