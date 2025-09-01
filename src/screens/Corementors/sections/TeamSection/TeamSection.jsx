import React from "react";
import { Badge } from "../../../../components/ui/badge";

export const TeamSection = () => {
  return (
    <section className="flex flex-col items-center justify-center pt-[100px] pb-[60px] px-4 md:px-[360px] w-full bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center gap-11 w-full">
        <div className="flex flex-col min-w-0 max-w-[700px] items-center justify-center gap-[15px] w-full">
          <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
            <Badge
              variant="secondary"
              className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border border-solid border-neutral-100"
            >
              <div className="flex flex-col w-4 h-5 items-start">
                <div className="relative self-stretch w-full h-5">
                  <img
                    className="absolute w-[15px] h-[11px] top-[5px] left-px"
                    alt="Group"
                    src="https://c.animaapp.com/mewus0n76JsNvN/img/group-4.png"
                  />
                </div>
              </div>
              <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.2px] tracking-[0] leading-[14.4px]">
                TEAM
              </span>
            </Badge>
          </div>

          <div className="flex flex-col items-start w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <div className="w-full flex flex-col items-center">
              <h2 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-[52.1px] text-center tracking-[-0.56px] leading-[67.2px] whitespace-nowrap">
                Team Behind Success
              </h2>
            </div>
          </div>

          <div className="flex flex-col max-w-[500px] w-full items-start pt-px pb-0 px-0 opacity-80 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <div className="flex flex-col items-center w-full">
              <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6">
                Meet the experts behind our AI—driven to deliver smart
                solutions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start rounded-[14px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <img
            className="w-full h-[514px] rounded-[14px]"
            alt="Section mask group"
            src="https://c.animaapp.com/mewus0n76JsNvN/img/section-mask-group.svg"
          />
        </div>
      </div>
    </section>
  );
};
