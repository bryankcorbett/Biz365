import React from 'react';

const AnimatedNavbar = ({ navigationItems }) => {
  return (
    <div className="inline-flex gap-6 items-center">
      {navigationItems.map((item, index) => (
                 <div key={index} className="inline-flex flex-col items-start relative flex-[0_0_auto]">
           <div className="inline-flex flex-col items-start justify-center pt-[7px] pb-2 px-4 relative flex-[0_0_auto] rounded-[10px] overflow-hidden hover:bg-black transition-all duration-300 hover:transform hover:translate-z-[10%]">
             <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
               <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                 <a
                   className="relative w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm tracking-[0] leading-[22.4px] whitespace-nowrap hover:text-yellow-600 hover:font-bold transition-all duration-300"
                   href={item.href}
                   rel="noopener noreferrer"
                 >
                   {item.label}
                 </a>
               </div>
             </div>
           </div>
         </div>
      ))}
    </div>
  );
};

export default AnimatedNavbar;
