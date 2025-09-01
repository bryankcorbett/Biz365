import { useState, useEffect, useRef } from "react";

const StarBorder = ({
    as: Component = 'button',
    className = '',
    color = '#E0BC00',
    speed = '2s',
    thickness = 2,
    children,
    ...rest
  }) => {
    return (
      <Component
        className={`relative inline-block overflow-hidden rounded-[20px] transition-all duration-300 hover:scale-105 ${className}`}
        style={{
          padding: `${thickness}px`,
          ...rest.style
        }}
        {...rest}
      >
        {/* Animated border effect - bottom (Gold) */}
        <div
          className="absolute w-[400%] h-[90%] opacity-90 bottom-[-35px] right-[-300%] rounded-full animate-star-movement-bottom z-0"
          style={{
            background: `radial-gradient(circle, #f59e0b, transparent 15%)`,
            animationDuration: speed,
            animationDelay: '0s'
          }}
        ></div>
        
        {/* Animated border effect - top (Purple) */}
        <div
          className="absolute w-[400%] h-[90%] opacity-90 top-[-35px] left-[-300%] rounded-full animate-star-movement-top z-0"
          style={{
            background: `radial-gradient(circle, #8b5cf6, transparent 15%)`,
            animationDuration: speed,
            animationDelay: '1s'
          }}
        ></div>
        
        {/* Additional side animations - right (Blue) */}
        <div
          className="absolute w-[90%] h-[400%] opacity-70 right-[-35px] top-[-300%] rounded-full animate-star-movement-right z-0"
          style={{
            background: `radial-gradient(circle, #3b82f6, transparent 15%)`,
            animationDuration: speed,
            animationDelay: '0.5s'
          }}
        ></div>
        
        {/* Additional side animations - left (Pink) */}
        <div
          className="absolute w-[90%] h-[400%] opacity-70 left-[-35px] bottom-[-300%] rounded-full animate-star-movement-left z-0"
          style={{
            background: `radial-gradient(circle, #ec4899, transparent 15%)`,
            animationDuration: speed,
            animationDelay: '1.5s'
          }}
        ></div>
        
        {/* Button content */}
        <div className="relative z-10 bg-gradient-to-b from-black to-black text-yellow-600 text-center text-[18px] py-[10px] px-[28px] rounded-[18px] font-bold shadow-lg hover:shadow-xl transition-all duration-300">
          {children}
        </div>
      </Component>
    );
  };
  
  export default StarBorder;
  
  // tailwind.config.js
  // module.exports = {
  //   theme: {
  //     extend: {
  //       animation: {
  //         'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
  //         'star-movement-top': 'star-movement-top linear infinite alternate',
  //       },
  //       keyframes: {
  //         'star-movement-bottom': {
  //           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
  //           '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
  //         },
  //         'star-movement-top': {
  //           '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
  //           '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
  //         },
  //       },
  //     },
  //   }
  // }
  