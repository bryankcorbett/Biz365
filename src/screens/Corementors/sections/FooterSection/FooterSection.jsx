import React from "react";
import { Button } from "../../../../components/ui/button";
import Magnet from "../../../../components/Magnet";
import Hyperspeed from "../../../../components/Hyperspeed";
import StarBorder from "../../../../components/loginButton";
import ShinyText from "../../../../components/ShinyText";

export const FooterSection = () => {
  return (
    <footer className="relative flex flex-col items-center justify-center px-4 md:px-[360px] py-16 bg-black w-full overflow-hidden">
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
      <div className="relative z-10 flex flex-col max-w-[1200px] items-center gap-8 w-full">
        
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-8 w-full">
          
                     {/* Logo and Tagline */}
           <div className="flex flex-col items-center gap-4 ">
             <div className="relative w-[15vw] h-[10vh] filter invert  ">
               <ShinyText 
                 src="https://ik.imagekit.io/corementorid/logo.png?updatedAt=1756895388200"
                 alt="Biz365 Logo"
                 disabled={false} 
                 speed={3} 
                 className="w-[100%] h-[100%]"
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
