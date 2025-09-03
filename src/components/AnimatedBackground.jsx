import React from 'react';

const AnimatedBackground = ({ variant = 'default' }) => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Main animated circle gradient */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] rounded-full animate-pulse-slow"
          style={{
            background: `
              radial-gradient(
                circle at center,
                transparent 20%,
                rgba(147, 51, 234, 0.3) 30%,
                rgba(79, 70, 229, 0.4) 40%,
                rgba(236, 72, 153, 0.3) 50%,
                rgba(147, 51, 234, 0.2) 60%,
                transparent 80%
              )
            `,
            filter: 'blur(30px)',
            animation: 'float 8s ease-in-out infinite, pulse-slow 6s ease-in-out infinite'
          }}
        />
      </div>

      {/* Secondary rotating circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full"
          style={{
            background: `
              conic-gradient(
                from 0deg,
                transparent,
                rgba(147, 51, 234, 0.4),
                rgba(79, 70, 229, 0.5),
                rgba(236, 72, 153, 0.4),
                transparent
              )
            `,
            filter: 'blur(25px)',
            animation: 'spin 20s linear infinite'
          }}
        />
      </div>

      {/* Inner glow circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div 
          className="w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full"
          style={{
            background: `
              radial-gradient(
                circle at center,
                rgba(255, 255, 255, 0.9) 0%,
                rgba(255, 255, 255, 0.6) 20%,
                rgba(255, 255, 255, 0.3) 40%,
                transparent 70%
              )
            `,
            filter: 'blur(15px)',
            animation: 'pulse-subtle 4s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 bg-purple-400/50 rounded-full"
          style={{
            left: `${15 + (i * 12)}%`,
            top: `${25 + (i * 10)}%`,
            animation: `float ${3 + (i * 0.5)}s ease-in-out infinite ${i * 0.5}s`,
          }}
        />
      ))}

      {/* Additional ambient glow for auth pages */}
      {variant === 'auth' && (
        <div className="absolute inset-0">
          <div 
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: `
                linear-gradient(
                  135deg,
                  rgba(147, 51, 234, 0.03) 0%,
                  transparent 50%,
                  rgba(79, 70, 229, 0.03) 100%
                )
              `
            }}
          />
        </div>
      )}

      {/* Grid pattern overlay for subtle texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
