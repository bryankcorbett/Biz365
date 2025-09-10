import React, { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

/* -------------------- Simple In-view hook -------------------- */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -100px 0px", ...options }
    );
    
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return { ref, inView };
};

/* -------------------- Typewriter Effect -------------------- */
const TypewriterOnScroll = ({ text, className, speed = 50 }) => {
  const { ref, inView } = useInView({ threshold: 0.6 });
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!inView) return;
    
    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    
    return () => clearInterval(interval);
  }, [inView, text, speed]);

  return (
    <h1 ref={ref} className={className}>
      {shown}
      {shown.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-current animate-pulse ml-1" />
      )}
    </h1>
  );
};

/* -------------------- Animated Feature Card -------------------- */
const AnimatedFeatureCard = ({ feature, index }) => {
  const { ref, inView } = useInView({ threshold: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        inView 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-16 opacity-0 scale-95'
      }`}
      style={{ 
        transitionDelay: `${index * 200}ms`,
        willChange: 'transform, opacity'
      }}
    >
      <Card className="w-full bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group">
        <CardContent className="p-0">
          <div className={`grid md:grid-cols-2 gap-0 items-center ${isEven ? '' : 'md:[&>*:first-child]:order-2'}`}>
            {/* Text Content */}
            <div className="p-8 md:p-10 space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                {feature.title}
              </h3>
              
              <div className="space-y-4 text-gray-700">
                {feature.description.split('\n').map((line, lineIndex) => {
                  if (!line.trim()) return <div key={lineIndex} className="h-2" />;
                  
                  return (
                    <div
                      key={lineIndex}
                      className={`transition-all duration-700 ease-out ${
                        inView 
                          ? 'translate-x-0 opacity-100' 
                          : `${isEven ? 'translate-x-8' : '-translate-x-8'} opacity-0`
                      }`}
                      style={{ 
                        transitionDelay: `${(index * 200) + (lineIndex * 100) + 300}ms`
                      }}
                    >
                      {line.startsWith('→') || line.startsWith('🎉') || line.startsWith('🎯') || line.startsWith('💬') ? (
                        <div className="flex items-start gap-3">
                          <span className="text-black font-bold mt-1 flex-shrink-0">
                            {line.charAt(0)}
                          </span>
                          <span className="text-gray-700">{line.slice(1).trim()}</span>
                        </div>
                      ) : (
                        <p className="text-gray-700 leading-relaxed">{line}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image */}
            <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
              <div
                className={`w-full h-full transition-all duration-1000 ease-out ${
                  inView 
                    ? 'scale-100 opacity-100' 
                    : 'scale-110 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 200 + 400}ms`
                }}
              >
                <img
                  src={feature.graphicSrc}
                  alt={`${feature.title} illustration`}
                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

/* -------------------- Features Data -------------------- */
const featuresData = [
  {
    id: 1,
    title: "Launch Campaigns That Sell Themselves.",
    description: `→ Festive & seasonal templates
→ One-click push to Instagram, WhatsApp, Facebook, TikTok
→ Custom titles, offers, discount rules
→ Multi-channel reach (Email, WhatsApp, SMS)
→ Flexible rewards (discounts, freebies, no-discount promos)`,
    graphicSrc: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Never Miss a Birthday, Anniversary, or Festival Again.",
    description: `Biz365 Auto-Campaign remembers your customers and boosts your sales — automatically.

You approve. We deliver. Your customers celebrate with you.

🎉 Special days tracked automatically
🎉 One-click campaign launch
🎉 Multi-channel delivery (SMS, WhatsApp, Email)
🎉 Simple and effective
🎉 Visible results in dashboard`,
    graphicSrc: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Not Just a Code. A Connection.",
    description: `From games to reviews, from loyalty to followers — Magic QR makes every scan unforgettable.

"Scan. Spin. Smile. Repeat."

🎯 Spin-the-wheel gamification
🎯 Birthday & special occasion triggers
🎯 Loyalty sign-ups made fun
🎯 Digital menus & Google reviews
🎯 Instagram follows & business cards
🎯 Store & campaign links`,
    graphicSrc: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Feedback That Rewards.",
    description: `Your customers share. You listen. They earn. You grow.

"Turn every opinion into an opportunity."

💬 Smart forms customers love
💬 Incentivized feedback with loyalty points
💬 Actionable insights from responses
💬 Continuous improvement loop
💬 Silent risk prevention with early warnings`,
    graphicSrc: "https://images.unsplash.com/photo-1553729784-e91953dec042?q=80&w=1200&auto=format&fit=crop",
  },
];

/* -------------------- Main Features Section -------------------- */
export const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center px-4 md:px-8 lg:px-12 py-[100px] bg-gray-50">
      <div className="w-full max-w-[1200px] mx-auto">
        {/* Header */}
        <header className="flex flex-col items-center mb-16 text-center">
          <Badge 
            variant="outline" 
            className="px-4 py-2 mb-6 rounded-full border-gray-300 bg-white shadow-sm text-gray-700 font-medium"
          >
            FEATURES
          </Badge>
          
          <TypewriterOnScroll
            text="All Struggles are Over with Biz365 Dashboard"
            className="font-bold text-4xl md:text-5xl lg:text-6xl text-center leading-tight mb-6 bg-gradient-to-b from-black to-gray-700 bg-clip-text text-transparent"
          />
          
          <p className="text-gray-600 text-lg text-center max-w-[600px] leading-relaxed">
            Discover features that simplify workflows & grow your business.
          </p>
        </header>

        {/* Feature Cards */}
        <div className="space-y-16 mb-16">
          {featuresData.map((feature, index) => (
            <AnimatedFeatureCard 
              key={feature.id} 
              feature={feature} 
              index={index}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            className="h-auto inline-flex items-center justify-center pt-4 pb-4 px-8 bg-black rounded-xl overflow-hidden shadow-lg hover:bg-gray-800 hover:scale-105 hover:shadow-xl transition-all duration-300"
            asChild
          >
            <a
              href="/signup"
              className="inline-flex items-center gap-3 font-medium text-white text-base"
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;