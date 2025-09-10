import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollFeatures = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollContainerRef.current;
    
    if (!container || !scrollContainer) return;

    // Initialize smooth scrolling with Lenis
    let lenis;
    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('@studio-freight/lenis');
        
        lenis = new Lenis({
          duration: 1.2,
          easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          gestureDirection: 'vertical',
          smooth: true,
          mouseMultiplier: 1,
          smoothTouch: false,
          touchMultiplier: 2,
          infinite: false
        });

        function raf(time) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      } catch (error) {
        console.warn('Lenis not available, using default scroll');
      }
    };

    initLenis();

    // Get all cards
    const cards = scrollContainer.children;
    const cardWidth = window.innerWidth * 0.8;
    const totalWidth = cards.length * cardWidth;

    // Set up horizontal scroll animation
    const horizontalScroll = gsap.to(scrollContainer, {
      x: () => -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Add velocity-based distortion effect
          const velocity = self.getVelocity();
          const distortion = Math.abs(velocity) * 0.0001;
          
          Array.from(cards).forEach((card, index) => {
            gsap.set(card, {
              skewX: velocity * 0.01,
              rotationY: velocity * 0.005,
              z: distortion * 100
            });
          });
        }
      }
    });

    // Individual card animations
    Array.from(cards).forEach((card, index) => {
      // Entrance animation
      gsap.fromTo(card, 
        {
          y: 100,
          opacity: 0,
          rotationX: 15,
          scale: 0.8,
          filter: 'blur(20px)'
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "left 90%",
            end: "left 10%",
            horizontal: true,
            containerAnimation: horizontalScroll,
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax effect for card content
      const cardContent = card.querySelector('.card-content');
      if (cardContent) {
        gsap.to(cardContent, {
          x: index % 2 === 0 ? -50 : 50,
          scrollTrigger: {
            trigger: card,
            start: "left right",
            end: "right left",
            horizontal: true,
            containerAnimation: horizontalScroll,
            scrub: 2
          }
        });
      }

      // 3D hover effects
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -20,
          rotationY: index % 2 === 0 ? 10 : -10,
          rotationX: 5,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        });
      });
    });

    setIsInitialized(true);

    // Cleanup
    return () => {
      if (lenis) {
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={`horizontal-scroll-features ${className}`}
      style={{ height: '100vh', overflow: 'hidden' }}
    >
      <div 
        ref={scrollContainerRef}
        className="flex items-center gap-8 h-full"
        style={{ 
          width: 'max-content',
          transformStyle: 'preserve-3d',
          perspective: '1000px'
        }}
      >
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <div
                key={index}
                className="horizontal-scroll-card flex-shrink-0"
                style={{
                  width: '80vw',
                  maxWidth: '900px',
                  height: '70vh',
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <div className="card-content h-full">
                  {React.cloneElement(child, {
                    className: `${child.props.className || ''} h-full`,
                    style: {
                      ...child.props.style,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }
                  })}
                </div>
              </div>
            );
          }
          return child;
        })}
      </div>
      
      <style>{`
        .horizontal-scroll-features {
          perspective: 1000px;
        }
        
        .horizontal-scroll-card {
          transform-style: preserve-3d;
          will-change: transform, opacity, filter;
        }
        
        .card-content {
          transform-style: preserve-3d;
          will-change: transform;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .horizontal-scroll-card {
            transform: none !important;
            animation: none !important;
          }
          .card-content {
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrollFeatures;