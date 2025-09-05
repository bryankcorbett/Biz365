import { ArrowRightIcon, CheckIcon, HeartIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

/* ---------- in-view hook ---------- */
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
            obs.unobserve(entry.target);
          }
        },
        { threshold: 0.25, rootMargin: "0px 0px -10% 0px", ...(options || {}) }
      );
      obs.observe(el);
    } catch (error) {
      console.warn('IntersectionObserver not supported:', error);
      setInView(true);
    }
    return () => {
      try { 
        obs && obs.disconnect(); 
      } catch (error) {
        console.warn('Error disconnecting observer:', error);
      }
    };
  }, [options]);

  return { ref, inView };
};

/* ---------- Reveal wrapper ---------- */
const RevealOnScroll = ({ delayMs = 0, durationMs = 1200, children }) => {
  const { ref, inView } = useInView({ threshold: 0.25 });
  const hidden = "translate3d(0, 30px, 0)";
  const shown = "translate3d(0, 0, 0)";
  return (
    <div
      ref={ref}
      style={{
        transform: inView ? shown : hidden,
        opacity: inView ? 1 : 0,
        filter: inView ? "blur(0px)" : "blur(8px)",
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

const pricingPlans = [
  {
    name: "Starter",
    price: "$800",
    description: "Ideal for businesses ready to explore AI and intelligent automation",
    features: [
      "Basic AI Tools",
      "Limited Automation Features",
      "Real-Time Reporting",
      "Basic Chatbot Integration",
    ],
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    price: "$1700",
    description: "Built for companies that want to gain an edge with AI-powered automation",
    features: [
      "Advanced AI Tools",
      "Customizable Workflows",
      "AI-Powered Analytics",
      "Premium Chatbot Features",
      "Cross-Platform Integrations",
    ],
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$4700",
    description: "For businesses aiming to harness AI and automation to lead their industry",
    features: [
      "Fully Customized AI Solutions",
      "Unlimited Integrations",
      "Advanced Reporting & Insights",
      "Scalable AI Solutions",
      "Team Collaboration Features",
      "Priority Feature Access",
    ],
    buttonVariant: "outline",
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-[100px] w-full bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center gap-7 w-full">
        {/* Header */}
        <header className="flex flex-col max-w-[700px] items-center justify-center gap-4">
          <Badge
            variant="outline"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] border-neutral-100"
          >
            <img className="w-[18px] h-[15px]" alt="Group" src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/31f1b065-1217-47e4-998e-c4794587f4ef" />
            <span className="font-medium text-xs">PRICING</span>
          </Badge>

          <h1 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] font-medium text-[53.4px] text-center leading-[67.2px]">
            Simple Price For All
          </h1>
          <p className="max-w-[500px] text-base text-center opacity-80">
            Flexible pricing plans that fit your budget & scale with needs.
          </p>
        </header>

        {/* Cards row */}
        <div className="flex flex-nowrap items-stretch justify-center gap-6 mt-8 w-full overflow-x-auto lg:overflow-visible">
          {pricingPlans.map((plan, idx) => (
            <RevealOnScroll key={plan.name} delayMs={idx * 500} durationMs={1200}>
              <Card className="shrink-0 w-96 bg-orbai-templateframerwebsitewild-sand rounded-2xl shadow-md border-0 flex flex-col">
                <CardContent className="p-6 relative flex flex-col h-full min-h-[560px]">
                  {/* Header */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-base">{plan.name}</span>
                    {plan.popular && (
                      <Badge className="bg-black text-white rounded-[22px]">
                        <img className="w-5 h-5" alt="Popular" src="https://c.animaapp.com/mewus0n76JsNvN/img/component-1-8.svg" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-1.5 mb-6">
                    <span className="font-medium text-[44px]">{plan.price}</span>
                    <span className="text-base opacity-80">/month</span>
                  </div>

                  {/* Description */}
                  <p className="text-base opacity-80 mb-6">{plan.description}</p>

                  {/* Content filler to equalize */}
                  <div className="flex flex-col flex-grow">
                    <Button
                      variant={plan.buttonVariant}
                      className={`w-full h-auto mb-6 rounded-[10px] ${
                        plan.popular
                          ? "bg-black text-white"
                          : "bg-orbai-templateframerwebsitewild-sand text-black border"
                      }`}
                      asChild
                    >
                      <a href="/signup" className="flex items-center justify-center gap-2 pt-[11px] pb-3 px-6">
                        <span className="font-medium text-sm">Get Started</span>
                        <ArrowRightIcon className="w-5 h-5" />
                      </a>
                    </Button>

                    <div className="h-0.5 rounded-lg bg-black/40 mb-4" />

                    <div className="flex flex-col gap-4">
                      {plan.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <CheckIcon className="w-4 h-4 opacity-50 flex-shrink-0" />
                          <span className="text-base opacity-80">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>

        {/* Bottom notice */}
        <div className="flex items-center justify-center gap-4 max-w-[500px] px-3 py-2 bg-orbai-templateframerwebsitewild-sand rounded-lg shadow-md mt-10">
          <HeartIcon className="w-[25px] h-[25px] text-black" />
          <p className="text-base text-center opacity-80">
            We donate 2% of your membership to pediatric wellbeing
          </p>
        </div>
      </div>
    </section>
  );
};