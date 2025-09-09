import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

const processSteps = [
  {
    id: "01",
    title: "Workflow Assessment",
    description:
      "We begin by examining your existing workflows to identify where AI can deliver the greatest impact.",
    icon: {
      images: [
        {
          src: "https://c.animaapp.com/mewus0n76JsNvN/img/vector-10.svg",
          className: "absolute w-[42px] h-[23px] top-[9px] left-0",
        },
        {
          src: "https://c.animaapp.com/mewus0n76JsNvN/img/vector-5.svg",
          className: "absolute w-8 h-[15px] top-0 left-0",
        },
      ],
    },
    backgroundImage:
      "https://c.animaapp.com/mewus0n76JsNvN/img/i11kmpyzo5iptyae3lygili1xk-jpeg.png",
    isLarge: true,
    activeStep: 0,
  },
  {
    id: "02",
    title: "Deploy with Confidence",
    description:
      "Our team develops custom AI systems built around your goals, ensuring safe and reliable deployment.",
    icon: {
      images: [
        {
          src: "https://c.animaapp.com/mewus0n76JsNvN/img/vector-1.svg",
          className: "absolute w-[34px] h-[34px] top-1.5 left-[9px]",
        },
      ],
    },
    backgroundImage:
      "https://c.animaapp.com/mewus0n76JsNvN/img/ozpq1n5ntn1inwwim7stpazo2im-jpeg.png",
    isLarge: false,
    activeStep: 1,
  },
  {
    id: "03",
    title: "Ongoing Support & Optimization",
    description:
      "After deployment, we provide support and refine your AI systems to keep them performing at their best.",
    icon: {
      backgroundImage: "https://c.animaapp.com/mewus0n76JsNvN/img/vector.svg",
      images: [
        {
          src: "https://c.animaapp.com/mewus0n76JsNvN/img/vector-2.svg",
          className: "absolute w-1 h-1 top-[17px] left-[11px]",
        },
        {
          src: "https://c.animaapp.com/mewus0n76JsNvN/img/vector-2.svg",
          className: "absolute w-1 h-1 top-[17px] left-[23px]",
        },
        {
          src: "https://c.animaapp.com/mewus0n76JsNvN/img/vector-4.svg",
          className: "absolute w-[23px] h-3 top-1.5 left-2",
        },
      ],
    },
    backgroundImage:
      "https://c.animaapp.com/mewus0n76JsNvN/img/rl2mn1wnvljqhxa5rfsgwqkaxg-png.png",
    isLarge: false,
    activeStep: 2,
  },
];

export const ProcessSection = () => {
  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-[100px] w-full bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center justify-center gap-[43.99px] w-full">
        {/* Header Section */}
        <header className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms] flex flex-col min-w-[700px] max-w-[700px] items-center justify-center gap-[15px]">
          <Badge className="inline-flex flex-col items-start bg-orbai-templateframerwebsitewild-sand rounded-[60px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border border-solid border-neutral-100 h-8 px-0 py-0">
          <Badge 
            variant="premium"
            className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border-neutral-100"
          >
              <div className="flex flex-col w-4 h-5 items-start">
                <div className="relative w-full h-5">
                  <img
                    className="absolute w-[15px] h-2.5 top-[5px] left-0"
                    alt="Group"
                    src="https://c.animaapp.com/mewus0n76JsNvN/img/group-12.png"
                  />
                </div>
              </div>
              <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.6px] tracking-[0] leading-[14.4px]">
                PROCESS
              </span>
          </Badge>
          </Badge>

          <div className="flex flex-col items-center w-full">
            <h2 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-[52.9px] text-center tracking-[-0.56px] leading-[67.2px]">
              Simple &amp; Scalable
            </h2>
          </div>

          <div className="flex flex-col max-w-[500px] w-full items-center pt-[0.99px] opacity-80">
            <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6">
              A transparent process of collaboration and feedback
            </p>
          </div>
        </header>

        {/* Process Cards */}
        <div className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms] flex flex-wrap items-start justify-center gap-6 w-full">
          {/* Large Card */}
          <Card className="flex flex-col w-[588px] bg-orbai-templateframerwebsitewild-sand rounded-[20px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] overflow-hidden border-0">
            <CardContent className="flex flex-col items-start pt-[30px] pb-11 px-[30px] gap-6">
              <div className="flex flex-col items-center justify-center gap-6 w-full">
                <div className="flex flex-col items-start justify-center gap-6 w-full">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center px-2.5 py-2 rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.25px_#ababab59,0px_13.65px_13.65px_-2.71px_#ababab82,0px_6.87px_6.87px_-2.17px_#ababab94,0px_3.62px_3.62px_-1.62px_#ababab9c,0px_1.81px_1.81px_-1.08px_#abababa1,0px_0.71px_0.71px_-0.54px_#abababa3] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_100%)]">
                    <div className="flex flex-col w-[52px] items-start pt-0 pb-[3px] px-0">
                      <div className="relative w-full h-[45.5px]">
                        <div className="relative w-[42px] h-8 top-1.5 left-[5px]">
                          {processSteps[0].icon.images.map((image, index) => (
                            <img
                              key={index}
                              className={image.className}
                              alt="Vector"
                              src={image.src}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col items-center justify-center gap-[11px] w-full">
                    <div className="flex flex-col items-start w-full">
                      <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[18.4px] tracking-[-0.20px] leading-6">
                        {processSteps[0].title}
                      </h3>
                    </div>

                    <div className="flex flex-col items-start w-full opacity-80">
                      <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-6">
                        {processSteps[0].description}
                      </p>
                    </div>
                  </div>

                  {/* Step Indicator */}
                  <div className="flex flex-col min-w-[528px] items-center justify-center gap-[23px] w-full">
                    <div className="w-full h-0.5 bg-orbai-templateframerwebsiteblack-40 opacity-15" />

                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <div className="flex flex-col items-center pt-0 pb-[0.8px] px-0">
                          <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[41.2px] text-center tracking-[-0.44px] leading-[52.8px]">
                            {processSteps[0].id}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-center gap-1.5">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className={`w-2.5 h-2.5 bg-wwwsightfulcomblack rounded-[13px] ${
                              index !== processSteps[0].activeStep
                                ? "opacity-35"
                                : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Background Image */}
                <div className="flex-1 w-full bg-wwwsightfulcomwhite-02 rounded-2xl overflow-hidden shadow-[0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
                  <div className="flex flex-col w-[528px] items-start rounded-2xl">
                    <div
                      className="w-full h-[819.7px] rounded-2xl bg-cover bg-[50%_50%]"
                      style={{
                        backgroundImage: `url(${processSteps[0].backgroundImage})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Small Cards Column */}
          <div className="flex flex-col items-center justify-center gap-6">
            {processSteps.slice(1).map((step, index) => (
              <Card
                key={step.id}
                className="flex flex-col h-[584px] bg-orbai-templateframerwebsitewild-sand rounded-[20px] shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] overflow-hidden border-0"
              >
                <CardContent className="flex flex-col items-start pt-[30px] pb-11 px-[30px] gap-6 flex-1">
                  <div className="flex flex-col items-center justify-center gap-6 flex-1 w-full">
                    <div className="flex flex-col items-start justify-center gap-6">
                      {/* Icon */}
                      <div className="inline-flex items-center justify-center px-2.5 py-2 rounded-[10px] overflow-hidden shadow-[0px_30px_30px_-3.25px_#ababab59,0px_13.65px_13.65px_-2.71px_#ababab82,0px_6.87px_6.87px_-2.17px_#ababab94,0px_3.62px_3.62px_-1.62px_#ababab9c,0px_1.81px_1.81px_-1.08px_#abababa1,0px_0.71px_0.71px_-0.54px_#abababa3] bg-[linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(255,255,255,1)_100%)]">
                        <div className="flex flex-col w-[52px] items-start pt-0 pb-[3px] px-0">
                          <div className="relative w-full h-[45.5px]">
                            {step.icon.backgroundImage ? (
                              <div
                                className="relative w-[38px] h-[34px] top-1.5 left-[7px] bg-[100%_100%]"
                                style={{
                                  backgroundImage: `url(${step.icon.backgroundImage})`,
                                }}
                              >
                                {step.icon.images?.map((image, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    className={image.className}
                                    alt="Vector"
                                    src={image.src}
                                  />
                                ))}
                              </div>
                            ) : (
                              step.icon.images?.map((image, imgIndex) => (
                                <img
                                  key={imgIndex}
                                  className={image.className}
                                  alt="Vector"
                                  src={image.src}
                                />
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex flex-col items-center justify-center gap-[11px] w-full">
                        <div className="flex flex-col min-w-[528px] items-start">
                          <h3 className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[18.9px] tracking-[-0.20px] leading-6">
                            {step.title}
                          </h3>
                        </div>

                        <div className="flex flex-col min-w-[528px] items-start opacity-80">
                          <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-6">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Step Indicator */}
                      <div className="flex flex-col items-center justify-center gap-[23px] w-full">
                        <div className="w-[528px] h-0.5 bg-orbai-templateframerwebsiteblack-40 opacity-15" />

                        <div className="flex items-center justify-between">
                          <div className="flex flex-col items-start">
                            <div className="flex flex-col items-center pt-0 pb-[0.8px] px-0">
                              <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[44px] text-center tracking-[-0.44px] leading-[52.8px]">
                                {step.id}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-1.5">
                            {[0, 1, 2].map((dotIndex) => (
                              <div
                                key={dotIndex}
                                className={`w-2.5 h-2.5 bg-wwwsightfulcomblack rounded-[13px] ${
                                  dotIndex !== step.activeStep
                                    ? "opacity-35"
                                    : ""
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Background Image */}
                    <div className="flex-1 w-[528px] bg-wwwsightfulcomwhite-02 rounded-2xl overflow-hidden shadow-[0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
                      <div className="flex flex-col w-[528px] items-start rounded-2xl">
                        <div
                          className="w-full h-[211.7px] rounded-2xl bg-cover bg-[50%_50%]"
                          style={{
                            backgroundImage: `url(${step.backgroundImage})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
