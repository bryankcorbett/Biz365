import React from "react";
import { Button } from "../../../../components/ui/button";
import Magnet from "../../../../components/Magnet";
import Hyperspeed from "../../../../components/Hyperspeed";
import StarBorder from "../../../../components/loginButton";
import ShinyText from "../../../../components/ShinyText";
import logowhite from "../../../../assets/logowhite.png";

export const FooterSection = () => {
  return (
    <footer className="relative flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 py-16 bg-black w-full max-w-full overflow-hidden">
      {/* 3D Hyperspeed Animation Background */}
      <div className="absolute inset-0 w-full h-full">
        <Hyperspeed
          effectOptions={{
            onSpeedUp: () => { },
            onSlowDown: () => { },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>
      
      {/* Content Layer - All existing content with relative positioning */}
      <div className="relative z-10 flex flex-col max-w-7xl items-center gap-8 w-full">
        
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-8 w-full">
          
                     {/* Logo and Tagline */}
           <div className="flex flex-col items-center gap-4 ">
             <div className="relative w-[15vw] h-[10vh] ">
               <img 
                 src={logowhite}
                 alt="Biz365 Logo"
                 className="w-[100%] h-[100%] object-contain"
               />
             </div>
            
            <div className="flex flex-col max-w-[600px] items-center gap-4">
                             <h3 className="[font-family:'Inter',Helvetica] font-semibold text-white text-[28px] tracking-[-0.5px] leading-8 text-center">
                 Ready to Transform Your Business?
               </h3>
               <p className="[font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-6 text-center opacity-70">
                 Join thousands of businesses already using Biz365 to grow their customer base and increase revenue.
               </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4">
                             <h4 className="[font-family:'Inter',Helvetica] font-medium text-white text-[20px] tracking-[-0.2px] leading-6 text-center">
                 Start your journey today
               </h4>
              <div className="flex items-center gap-4">
              <StarBorder
                as="button"
                className="custom-class"
                color="#ffffff"
                speed="2s"
                onClick={() => window.location.href = '/login'}
              >
                Log in
              </StarBorder>
              <Button
                className="inline-flex items-center justify-center pt-[11px] pb-3 px-6 h-auto bg-transparent border border-wwwsightfulcomblack rounded-[10px] overflow-hidden hover:bg-gray-100 transition-colors"
                asChild
              >
                
              </Button>
                <Magnet
                  padding={50}
                  magnetStrength={3}
                  disabled={false}
                  activeTransition="transform 0.2s ease-out"
                  inactiveTransition="transform 0.4s ease-in-out"
                >
                                     <Button
                     className="inline-flex items-center justify-center pt-[11px] pb-3 px-6 h-auto bg-white rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.5px_#ffffff26,0px_13.65px_13.65px_-2.92px_#ffffff42,0px_6.87px_6.87px_-2.33px_#ffffff4c,0px_3.62px_3.62px_-1.75px_#ffffff54,0px_1.81px_1.81px_-1.17px_#ffffff57,0px_0.71px_0.71px_-0.58px_#ffffff59,0px_10px_18px_-3.75px_#ffffff40,0px_2.29px_4.12px_-2.5px_#ffffffa3] hover:bg-gray-200 transition-colors"
                     asChild
                   >
                     <a href="/signup">
                       <span className="[font-family:'Inter',Helvetica] font-medium text-black text-sm tracking-[0] leading-[22.4px] whitespace-nowrap">
                         Try it for free
                       </span>
                     </a>
                   </Button>
                </Magnet>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col items-center gap-4 w-full">
                         <div className="flex flex-wrap justify-center items-center gap-8 max-w-[800px]">
               <a href="#dashboard" className="[font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22.4px] hover:opacity-70 transition-opacity">
                 Dashboard
               </a>
               <a href="#campaigns" className="[font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22.4px] hover:opacity-70 transition-opacity">
                 Campaigns
               </a>
               <a href="#insights" className="[font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22.4px] hover:opacity-70 transition-opacity">
                 Insights
               </a>
               <a href="#loyalty" className="[font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22.4px] hover:opacity-70 transition-opacity">
                 Loyalty
               </a>
               <a href="#magic-qr" className="[font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22.4px] hover:opacity-70 transition-opacity">
                 Magic QR
               </a>
               <a href="#biztag" className="[font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[22.4px] hover:opacity-70 transition-opacity">
                 BizTag
               </a>
             </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col items-center gap-4">
            <div className="social-icons flex items-center gap-6">
              <a href="https://www.tiktok.com/@biz365.ai?lang=en" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="social-icon w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.49v-3.4a4.85 4.85 0 0 1-1-.96z"/>
                </svg>
              </a>
              
              <a href="https://www.instagram.com/getbiz365?igsh=b3d1empmNHNvMDU=" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="social-icon w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a href="https://www.facebook.com/profile.php?id=61580249515668" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="social-icon w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a href="https://www.youtube.com/@biz365_ai" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <svg className="social-icon w-6 h-6" viewBox="0 0 24 24" fill="#FFFFFF">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

                 {/* Bottom Section */}
         <div className="flex flex-col items-center gap-4 w-full pt-2 border-t border-gray-600">
           <div className="flex flex-col items-center gap-4">
             <p className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 text-center opacity-60">
             © 2025 Biz365. All rights reserved.Powered by CoreMentor
             </p>
             <div className="flex items-center gap-6 mb-0">
               <a href="#privacy" className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 hover:opacity-70 transition-opacity">
                 Privacy Policy
               </a>
               <a href="#terms" className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 hover:opacity-70 transition-opacity">
                 Terms of Service
               </a>
               <a href="#contact" className="[font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-5 hover:opacity-70 transition-opacity">
                 Contact Us
               </a>
               
             </div>
           </div>
         </div>

      </div>
    </footer>
  );
};
