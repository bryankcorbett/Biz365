import { ArrowRightIcon, CheckIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ComparisonSection = () => {
  const orbAiFeatures = [
    "Automated workflows",
    "Personalized AI-driven strategies",
    "Data-backed, real-time insights",
    "Scalable AI systems",
    "Trained chatbots",
    "Rapid, AI-generated content",
    "Real time data analysis",
  ];

  const othersFeatures = [
    "Manual workflows",
    "Generic, one-size-fits-all solutions",
    "decision-making based on guesswork",
    "Lacks scalability",
    "Standard chatbots",
    "Time-consuming content creation",
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-[100px] bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center gap-[43.99px] w-full">
        <header className="flex flex-col min-w-[700px] max-w-[700px] items-center justify-center gap-[15px] translate-y-[-1rem] animate-fade-in opacity-0">
          <Badge
            variant="outline"
            className="inline-flex items-center gap-3 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border-neutral-100"
          >
            <img
              className="w-[11px] h-[11px]"
              alt="Group"
              src="https://c.animaapp.com/mewus0n76JsNvN/img/group-3.png"
            />
            <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.8px] tracking-[0] leading-[14.4px]">
              COMPARISON
            </span>
          </Badge>

          <h2 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-[52px] text-center tracking-[-0.56px] leading-[67.2px]">
            Precision vs Basic
          </h2>

          <p className="max-w-[500px] [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 opacity-80">
            See how our AI outperforms competitors with speed.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row max-w-[760px] items-start justify-center gap-6 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <Card className="flex-1 max-w-[440px] w-full bg-orbai-templateframerwebsitewild-sand rounded-2xl shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
            <CardContent className="flex flex-col items-start justify-center gap-6 p-6">
              <div className="flex items-end h-[50.39px]">
                <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[35.7px] text-center tracking-[0] leading-[50.4px]">
                  ORB AI
                </h3>
              </div>

              <div className="w-full h-0.5 rounded-lg bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-40">
                <div className="h-1.5 rounded-lg border-[3px] border-dashed border-[#00000066]" />
              </div>

              <div className="flex flex-col items-start justify-center gap-4 w-full">
                {orbAiFeatures.map((feature, index) => (
                  <div
                    key={`orb-feature-${index}`}
                    className="flex items-center gap-2 w-full"
                  >
                    <CheckIcon className="w-[15px] h-[15px] opacity-50 flex-shrink-0" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm tracking-[0] leading-[22.4px] opacity-80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                className="w-full h-auto inline-flex items-center justify-center pt-[11px] pb-3 px-6 bg-wwwsightfulcomblack rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.5px_#00000026,0px_13.65px_13.65px_-2.92px_#00000042,0px_6.87px_6.87px_-2.33px_#0000004c,0px_3.62px_3.62px_-1.75px_#00000054,0px_1.81px_1.81px_-1.17px_#00000057,0px_0.71px_0.71px_-0.58px_#00000059,0px_10px_18px_-3.75px_#3d3d3d40,0px_2.29px_4.12px_-2.5px_#3d3d3da3] hover:bg-wwwsightfulcomblack/90 transition-colors"
                asChild
              >
                <a
                  href="/signup"
                  className="flex items-center justify-center gap-2 w-full"
                >
                  <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomwhite text-sm tracking-[0] leading-[22.4px]">
                    Get Started
                  </span>
                  <ArrowRightIcon className="w-5 h-5 text-wwwsightfulcomwhite" />
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="flex-1 max-w-[440px] w-full bg-orbai-templateframerwebsitewild-sand rounded-2xl shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
            <CardContent className="flex flex-col items-start justify-center gap-6 p-6">
              <div className="flex items-end h-[50.39px]">
                <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[33.5px] text-center tracking-[0] leading-[50.4px]">
                  Others
                </h3>
              </div>

              <div className="w-full h-0.5 rounded-lg bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-40">
                <div className="h-1.5 rounded-lg border-[3px] border-dashed border-[#00000066]" />
              </div>

              <div className="flex flex-col items-start justify-center gap-4 w-full">
                {othersFeatures.map((feature, index) => (
                  <div
                    key={`others-feature-${index}`}
                    className="flex items-center gap-2 w-full"
                  >
                    <CheckIcon className="w-[15px] h-[15px] opacity-50 flex-shrink-0" />
                    <span className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm tracking-[0] leading-[22.4px] opacity-80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
