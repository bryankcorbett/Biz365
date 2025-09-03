import React, { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const ProjectsSection = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: "01",
      title: "MedixCare — AI Triage Assistant for Healthcare",
      image:
        "https://c.animaapp.com/mewus0n76JsNvN/img/n22bvojydo38s0koivyogspk7ie-png.png",
      metrics: [
        {
          value: "0",
          unit: "%",
          description: "Reduced average wait",
          opacity: "opacity-20",
        },
        {
          value: "0",
          unit: "%",
          description: "Rise in patient satisfaction",
          opacity: "opacity-[0.0]",
        },
      ],
    },
  ];

  const projectTabs = [
    { label: "PROJECT 1", active: true },
    { label: "PROJECT 2", active: false },
    { label: "PROJECT 3", active: false },
  ];

  return (
    <section className="flex flex-col items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-[100px] w-full bg-orbai-templateframerwebsitewild-sand">
      <div className="flex flex-col max-w-[1200px] items-center justify-center gap-11 w-full">
        {/* Header Section */}
        <header className="flex flex-col min-w-0 max-w-[700px] items-center justify-center gap-[15px] w-full translate-y-[-1rem] animate-fade-in opacity-0">
          <Badge className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-orbai-templateframerwebsitewild-sand rounded-[60px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border border-solid border-neutral-100">
            <div className="flex flex-col w-4 h-5 items-start">
              <div className="relative self-stretch w-full h-5">
                <img
                  className="absolute w-3 h-3 top-1 left-0.5"
                  alt="Group"
                  src="https://c.animaapp.com/mewus0n76JsNvN/img/group-13.png"
                />
              </div>
            </div>
            <span className="font-medium text-[11.4px] leading-[14.4px] [font-family:'Inter',Helvetica] text-wwwsightfulcomblack tracking-[0] whitespace-nowrap">
              PROJECTS
            </span>
          </Badge>

          <div className="flex flex-col items-center w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-[52.7px] text-center tracking-[-0.56px] leading-[67.2px] whitespace-nowrap">
              Proven Impact &amp; Results
            </h1>
          </div>

          <div className="flex flex-col max-w-[500px] w-full items-center pt-px pb-0 px-0 opacity-80 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6">
              Explore Projects that reflect our AI expertise &amp; real world
              impact
            </p>
          </div>
        </header>

        {/* Project Content */}
        <div className="flex flex-col max-w-[1200px] w-full items-start translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <Card className="flex flex-col max-w-[1200px] items-start justify-center gap-5 p-5 w-full bg-orbai-templateframerwebsitewild-sand rounded-[20px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
            <CardContent className="p-0 w-full">
              {/* Project Tabs */}
              <div className="flex flex-wrap items-center gap-4 mb-5">
                {projectTabs.map((tab, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`h-11 px-[157px] py-[13.8px] bg-orbai-templateframerwebsitewild-sand rounded-lg overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] ${!tab.active ? "opacity-50" : ""}`}
                    onClick={() => setActiveProject(index)}
                  >
                    <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.4px] tracking-[0] leading-[14.4px] whitespace-nowrap">
                      {tab.label}
                    </span>
                  </Button>
                ))}
              </div>

              {/* Project Showcase */}
              <div className="flex items-center justify-center gap-3.5 w-full">
                {/* Project Image */}
                <div className="flex flex-col items-start justify-center p-3 rounded-2xl">
                  <div className="flex items-center w-full rounded-[23px]">
                    <div className="flex-1 bg-wwwsightfulcomwhite-02 rounded-2xl overflow-hidden shadow-[0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
                      <div className="flex flex-col w-[551px] items-start rounded-2xl">
                        <div
                          className="w-full h-[448.09px] rounded-2xl bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${projects[activeProject].image})`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="w-[571px] h-[272.39px] relative">
                  {/* Project Number */}
                  <div className="w-[551px] absolute top-[9px] left-2.5">
                    <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-sm tracking-[0] leading-[22.4px]">
                      {projects[activeProject].id}
                    </span>
                  </div>

                  {/* Project Title */}
                  <div className="w-[551px] absolute top-[42px] left-2.5">
                    <div className="flex items-start gap-[5.3px] pt-[5px] pb-0 px-0">
                      {projects[activeProject].title
                        .split(" ")
                        .map((word, index) => (
                          <span
                            key={index}
                            className="opacity-[0.0] [font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[18.8px] tracking-[-0.20px] leading-6 whitespace-nowrap"
                          >
                            {word}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Empty Space */}
                  <div className="w-[551px] absolute top-[76px] left-2.5 opacity-80">
                    <div className="w-full h-12" />
                  </div>

                  {/* Metrics Cards */}
                  <div className="flex flex-wrap w-[561px] items-center justify-center gap-[21.63px] pl-0 pr-3 pt-2.5 pb-0 absolute top-[134px] left-0">
                    {projects[activeProject].metrics.map((metric, index) => (
                      <Card
                        key={index}
                        className={`flex flex-col min-w-[100px] items-start flex-1 ${metric.opacity}`}
                      >
                        <CardContent className="flex flex-col items-center justify-center gap-2 p-5 w-full bg-orbai-templateframerwebsitewild-sand rounded-xl overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014]">
                          <div className="flex items-center justify-center gap-1">
                            <span className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-[28px] tracking-[0] leading-7 whitespace-nowrap">
                              {metric.value}
                            </span>
                            <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-2xl tracking-[0] leading-9 whitespace-nowrap">
                              {metric.unit}
                            </span>
                          </div>
                          <div className="min-w-[223.5px] opacity-80">
                            <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                              {metric.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
