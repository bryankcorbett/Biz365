import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

export const FounderNoteSection = () => {
  const fullText = "From sales to loyalty, Biz365 Dashboard shows you everything you need to grow.";
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

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

  useEffect(() => {
    // Start typing animation only when section is in view
    if (!isInView) return;
    
    const startTypingTimer = setTimeout(() => {
      setIsTyping(true);
    }, 600); // Start after the card fade-in animation

    return () => clearTimeout(startTypingTimer);
  }, [isInView]);

  useEffect(() => {
    if (!isTyping) return;

    const typingTimer = setTimeout(() => {
      if (currentIndex < fullText.length) {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50); // Adjust speed here (50ms = ~20 characters per second, ~3 seconds total)

    return () => clearTimeout(typingTimer);
  }, [currentIndex, isTyping, fullText]);

  return (
    <section ref={sectionRef} className="flex flex-col items-center justify-center px-4 md:px-[360px] py-[100px] w-full bg-orbai-templateframerwebsitewhite-30 shadow-[inset_0px_-3px_1px_#ffffff66,inset_0px_3px_1px_#ffffff66] mt-52">
      <div className="flex flex-col max-w-[1200px] items-center w-full">
        <Card className={`max-w-[844px] w-full bg-transparent border-none shadow-none ${isInView ? 'translate-y-0 animate-fade-in opacity-100' : 'translate-y-[-1rem] opacity-0'}`}>
          <CardContent className="flex flex-col items-center justify-center gap-6 p-0">
            <blockquote className={`text-center ${isInView ? 'translate-y-0 animate-fade-in opacity-100' : 'translate-y-[-1rem] opacity-0'}`}>
              <p className="text-[32px] md:text-[34px] leading-[50.4px] [font-family:'Inter',Helvetica] font-medium text-orbai-templateframerwebsiteblack-55 tracking-[0] min-h-[100px] flex items-center justify-center">
                <span className="relative">
                  "{displayedText}
                  {isTyping && currentIndex < fullText.length && (
                    <span className="animate-pulse text-orbai-templateframerwebsiteblack-55">|</span>
                  )}
                  "
                </span>
              </p>
            </blockquote>

          </CardContent>
        </Card>
      </div>
    </section>
  );
};
