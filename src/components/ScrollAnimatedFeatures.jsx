import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrollAnimatedFeatures = ({ children, className = '' }) => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
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

    // Animate cards on scroll
    const cards = cardsRef.current.filter(Boolean);
    
    cards.forEach((card, index) => {
      if (!card) return;

      // Create scroll-triggered animation for each card
      gsap.fromTo(card, 
        {
          y: 100,
          opacity: 0,
          rotationX: 15,
          rotationY: 5,
          scale: 0.9,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 20%",
            scrub: 1,
            toggleActions: "play none none reverse"
          }
        }
      );

      // Add hover animations
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          rotationY: 5,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      // Add parallax effect on scroll
      gsap.to(card, {
        y: -50 * (index + 1),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        }
      });
    });

    // Cleanup function
    return () => {
      if (lenis) {
        lenis.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Function to register card refs
  const registerCard = (el, index) => {
    if (el) {
      cardsRef.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className={`scroll-animated-features ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            ref: (el) => registerCard(el, index),
            className: `${child.props.className || ''} scroll-animated-card`,
            style: {
              ...child.props.style,
              transformStyle: 'preserve-3d',
              perspective: '1000px'
            }
          });
        }
        return child;
      })}
      
      <style>{`
        .scroll-animated-features {
          perspective: 1000px;
        }
        
        .scroll-animated-card {
          transform-style: preserve-3d;
          will-change: transform, opacity, filter;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .scroll-animated-card {
            transform: none !important;
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollAnimatedFeatures;