import React, { useEffect, useRef, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

export const BenefitsSection = () => {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target); // Only trigger once
        }
      },
      { threshold: 0.3, rootMargin: '0px 0px -100px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center px-4 md:px-[360px] py-[100px] pb-[150px] bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center justify-center gap-10 w-full">
        {/* Header */}
        <header className="flex flex-col min-w-[700px] max-w-[700px] items-center justify-center gap-[20px]">
          <div className="flex flex-col items-start">
            <Badge
              variant="outline"
              className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border-neutral-100"
            >
              <div className="flex flex-col w-4 h-5 items-start">
                <div className="relative self-stretch w-full h-5">
                  <img
                    className="absolute w-3.5 h-[13px] top-[3px] left-px"
                    alt="Group"
                    src="https://c.animaapp.com/mewus0n76JsNvN/img/group-5.png"
                  />
                </div>
              </div>
              <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.2px] tracking-[0] leading-[14.4px]">
                BENEFITS
              </span>
            </Badge>
          </div>

          <div className="flex flex-col items-start w-full">
            <div className="flex flex-col items-center w-full">
              <h2 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-[53.3px] text-center tracking-[-0.56px] leading-[67.2px]">
                Why Choose Us
              </h2>
            </div>
          </div>

          <div className="flex flex-col max-w-[500px] w-[500px] items-start pt-px pb-0 px-0 opacity-80">
            <div className="flex flex-col items-center w-full">
              <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6">
                Partner with an AI agency delivering smart solutions.
              </p>
            </div>
          </div>
        </header>

        {/* Cards Row */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-nowrap items-start justify-center gap-10 w-full">
            {/* First Card */}
            <Card
              className={`flex flex-col w-96 h-[470px] items-start justify-center mb-10 bg-orbai-templateframerwebsitewild-sand rounded-[20px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-3.33px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-0 hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-amber-500/20 transform-gpu will-change-transform hover:bg-black ${isInView ? 'animate-card-sequence-1' : 'opacity-0 translate-x-[100px]'} ${hoveredCard === 1 ? 'animation-paused' : ''}`}
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="flex flex-col items-center justify-start relative flex-1 w-full h-full p-6 overflow-hidden  transition-transform duration-500 ease-out">

                {/* First card - Updated content matching the image */}
                <div className="flex flex-col items-start gap-2 w-full h-full">
                  {/* Top Title Section - Similar to other cards */}
                  <div className="inline-flex items-center gap-10 px-4 py-2 rounded-[2px]shadow-md mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300 group-hover:bg-gray-800 group-hover:border group-hover:border-yellow-500/50">
                    <span className="text-lg font-medium text-wwwsightfulcomblack group-hover:text-white transition-colors duration-300">
                    Loyalty That  Truly  Better Works Everywhere
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col items-start gap-3 p-4 rounded-lg shadow-sm w-full h-[330px] group-hover:shadow-md group-hover:shadow-yellow-500/20 group-hover:bg-gray-800 group-hover:border group-hover:border-yellow-500/30 transition-all duration-300">
                    {/* Introductory Paragraph */}
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                    From salons to food trucks, Biz365 points follow your customers — and bring them back to you.
                    </p>

                    {/* Secondary Text */}
                    <p className="text-md text-purple-600 leading-relaxed group-hover:text-yellow-400 group-hover:scale-105 transition-all duration-300">
                    "Earn everywhere. Redeem anywhere."
                    </p>

                    {/* Benefits List */}
                    <ul className="space-y-2 ">
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-amber-600 text-sm font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Cross-store redemption  <span className="text-purple-600 font-semibold group-hover:text-yellow-400">builds </span>customer loyalty

                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "50ms" }}>
                        <span className="text-amber-600 text-sm font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Network effect <span className="text-purple-600 font-semibold group-hover:text-yellow-400">amplifies </span> reach
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "100ms" }}>
                        <span className="text-amber-600 text-sm font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Small stores<span className="text-purple-600 font-semibold group-hover:text-yellow-400">feel</span>big-brand
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "150ms" }}>
                        <span className="text-amber-600 text-sm font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                          BuBoosts  <span className="text-purple-600 font-semibold group-hover:text-yellow-400">repeat visits</span> & footfall
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "200ms" }}>
                        <span className="text-amber-600 text-sm font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Differentiates <span className="text-purple-600 font-semibold group-hover:text-yellow-400">from single</span> shop loyalty
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Second Card */}
            <Card
              className={`flex flex-col w-96 h-[470px] items-start justify-center bg-orbai-templateframerwebsitewild-sand rounded-[20px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-3.33px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-0 hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-purple-500/20 transform-gpu will-change-transform hover:bg-black ${isInView ? 'animate-card-sequence-2' : 'opacity-0 translate-y-[100px]'} ${hoveredCard === 2 ? 'animation-paused' : ''}`}
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="flex flex-col items-center justify-start relative flex-1 w-full h-full p-6 overflow-hidden  transition-transform duration-500 ease-out">


                {/* Second card - AI Growth */}
                <div className="flex flex-col items-start gap-2 w-full h-full">
                  {/* Top Title Section - Similar to other cards */}
                  <div className="inline-flex items-center gap-10 px-4 py-2 rounded-[2px] shadow-md mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300 group-hover:bg-gray-800 group-hover:border group-hover:border-yellow-500/50">
                    <span className="text-lg font-medium text-wwwsightfulcomblack group-hover:text-white transition-colors duration-300">
                    Catch Customers When They Spend the Most.
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col items-start gap-3 p-4 rounded-lg shadow-sm w-full h-[330px] group-hover:shadow-md group-hover:shadow-yellow-500/20 group-hover:bg-gray-800 group-hover:border group-hover:border-yellow-500/30 transition-all duration-300">
                    {/* Introductory Paragraph */}
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                    Biz365 Auto-Campaign turns birthdays and anniversaries into your biggest revenue days.
                    </p>

                    {/* Secondary Text */}
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-amber-600 text-xs font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Special days mean special spends.<span className="text-purple-600 font-semibold group-hover:text-yellow-400">Don't just wish your customers — win their business.</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "50ms" }}>
                        <span className="text-amber-600 text-xs font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Customers don't celebrate with empty pockets. <span className="text-purple-600 font-semibold group-hover:text-yellow-400">They celebrate with full hearts — and fuller carts. Be part of it with Auto-Campaign.</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Third Card */}
            <Card
              className={`flex flex-col w-96 h-[470px] items-start justify-center bg-orbai-templateframerwebsitewild-sand rounded-[20px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-3.33px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-0 hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/20 transform-gpu will-change-transform hover:bg-black ${isInView ? 'animate-card-sequence-3' : 'opacity-0 translate-x-[100px]'} ${hoveredCard === 3 ? 'animation-paused' : ''}`}
              onMouseEnter={() => setHoveredCard(3)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="flex flex-col items-center justify-start relative flex-1 w-full h-full p-6 overflow-hidden  transition-transform duration-500 ease-out">
                

                {/* Third card - Updated content matching the image */}
                <div className="flex flex-col items-start gap-2 w-full h-full">
                  {/* Top Title Section - Similar to other cards */}
                  <div className="inline-flex items-center gap-10 px-4 py-2 rounded-[2px] shadow-md mb-4 group-hover:shadow-lg group-hover:shadow-yellow-500/30 transition-all duration-300 group-hover:bg-gray-800 group-hover:border group-hover:border-yellow-500/50">
                    <span className="text-lg font-medium text-wwwsightfulcomblack group-hover:text-white transition-colors duration-300">
                      Don't Just See Customers. Understand Them.
                    </span>
                  </div>

                  {/* Main Content */}
                  <div className="flex flex-col items-start gap-3 p-4 rounded-lg shadow-sm w-full h-[330px] group-hover:shadow-md group-hover:shadow-yellow-500/20 group-hover:bg-gray-800 group-hover:border group-hover:border-yellow-500/30 transition-all duration-300">
                    {/* First Paragraph */}
                    <p className="text-lg text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                      From VIPs to at-risk customers — Biz365 tells you who matters and how to keep them.
                    </p>

                   

                    {/* Benefits List */}
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300">
                        <span className="text-amber-600 text-xs font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                          Advanced segmentation: <span className="text-purple-600 font-semibold group-hover:text-yellow-400">VIP, Loyal, Can't-Lose, Lost, At-Risk, Promising</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "50ms" }}>
                        <span className="text-amber-600 text-xs font-bold mt-0.5 animate-ping group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Smart recommendations<span className="text-purple-600 font-semibold group-hover:text-yellow-400">per segment
                        </span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "100ms" }}>
                        <span className="text-amber-600 text-xs font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                          Hybrid analytics: <span className="text-purple-600 font-semibold group-hover:text-yellow-400">interaction patterns, timing, decay</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "150ms" }}>
                        <span className="text-amber-600 text-xs font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Saves discounts; <span className="text-purple-600 font-semibold group-hover:text-yellow-400">increases retention & uplift
                        </span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: "200ms" }}>
                        <span className="text-amber-600 text-xs font-bold mt-0.5 group-hover:animate-ping group-hover:text-yellow-400" aria-hidden="true">✓</span>
                        <span className="text-sm text-gray-700 leading-relaxed group-hover:text-white transition-colors duration-300">
                        Edge: POS/loyalty only shows numbers<span className="text-purple-600 font-semibold group-hover:text-yellow-400">— Biz365 tells you what to do next</span>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Custom CSS for card sequence animations */}
      <style jsx>{`
        /* Card 1: Animates from right to position */
        @keyframes card-sequence-1 {
          0% { 
            opacity: 0; 
            transform: translateX(100px); 
          }
          30% { 
            opacity: 1; 
            transform: translateX(0); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        /* Card 2: Animates from down to position */
        @keyframes card-sequence-2 {
          0% { 
            opacity: 0; 
            transform: translateY(100px); 
          }
          30% { 
            opacity: 1; 
            transform: translateY(0); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        /* Card 3: Animates from right to position */
        @keyframes card-sequence-3 {
          0% { 
            opacity: 0; 
            transform: translateX(100px); 
          }
          30% { 
            opacity: 1; 
            transform: translateX(0); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }
        
        /* Animation classes with 10-second cycle and 3-second card animations */
        .animate-card-sequence-1 {
          animation: card-sequence-1 10s ease-in-out infinite;
          animation-delay: 0s;
        }
        
        .animate-card-sequence-2 {
          animation: card-sequence-2 10s ease-in-out infinite;
          animation-delay: 3.5s;
        }
        
        .animate-card-sequence-3 {
          animation: card-sequence-3 10s ease-in-out infinite;
          animation-delay: 7s;
        }
        
        /* Pause animation on hover */
        .animation-paused {
          animation-play-state: paused !important;
        }
        
        /* Smooth transitions for hover effects */
        .group:hover {
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};