import { MailIcon } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../../components/ui/accordion";
import { Badge } from "../../../../components/ui/badge";

const faqData = [
  {
    id: "item-1",
    question: "What services do you offer?",
    answer:
      "We specialize in AI solutions, including machine learning models, automation, chatbots, predictive analytics, and consulting tailored to your business needs",
  },
  {
    id: "item-2",
    question: "How long does it take to develop an AI solution?",
    answer: "",
  },
  {
    id: "item-3",
    question: "Do I need technical expertise to work with you?",
    answer: "",
  },
  {
    id: "item-4",
    question: "Is my data safe when working with your agency?",
    answer: "",
  },
  {
    id: "item-5",
    question: "Can AI really help my business grow?",
    answer: "",
  },
];

export const DesktopViewSection = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center px-4 md:px-[360px] py-[100px] bg-orbai-templateframerwebsitewild-sand rounded-[0px_0px_50px_50px] overflow-hidden shadow-[1px_20px_30px_-12px_#00000033]">
      <div className="flex flex-col max-w-[1200px] items-center gap-[43.99px] w-full">
        <header className="flex flex-col min-w-[700px] max-w-[700px] items-center justify-center gap-[15px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <div className="flex flex-col items-start">
            <Badge className="h-8 bg-orbai-templateframerwebsitewild-sand rounded-[60px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-3.25px_#0000000d,0px_13.65px_13.65px_-2.71px_#00000014,0px_6.87px_6.87px_-2.17px_#00000017,0px_3.62px_3.62px_-1.62px_#00000017,0px_1.81px_1.81px_-1.08px_#00000017,0px_0.71px_0.71px_-0.54px_#0000001a] border border-solid border-neutral-100">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <img
                  className="w-[13px] h-[13px]"
                  alt="Group"
                  src="https://c.animaapp.com/mewus0n76JsNvN/img/group-15.png"
                />
                <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.6px] tracking-[0] leading-[14.4px]">
                  FAQS
                </span>
              </div>
            </Badge>
          </div>

          <div className="flex flex-col items-center w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
            <h1 className="bg-[linear-gradient(0deg,rgba(0,0,0,1)_34%,rgba(255,255,255,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Inter',Helvetica] font-medium text-transparent text-[51.8px] text-center tracking-[-0.56px] leading-[67.2px] whitespace-nowrap">
              Questions? Answers!
            </h1>
          </div>

          <div className="flex flex-col max-w-[500px] w-[500px] items-center pt-[0.99px] pb-0 px-0 opacity-80 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
            <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6">
              Find Some quick answers to the most common questions.
            </p>
          </div>
        </header>

        <main className="flex flex-col max-w-[1000px] items-center justify-center gap-[32.01px] px-[200px] py-0 w-full translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <div className="flex flex-col max-w-[600px] w-[600px] items-start">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="flex flex-col max-w-[600px] items-center justify-center gap-4 w-full"
            >
              {faqData.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="w-[600px] bg-orbai-templateframerwebsitewild-sand rounded-[10px] overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border-none"
                >
                  <AccordionTrigger className="flex items-center justify-between gap-2.5 px-4 py-3 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="flex-1 text-left [font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-6">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  {faq.answer && (
                    <AccordionContent className="px-4 pb-3 pt-0">
                      <div className="opacity-80">
                        <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-sm tracking-[0] leading-[22.4px]">
                          {faq.answer}
                        </p>
                      </div>
                    </AccordionContent>
                  )}
                  <div className="w-[437px] h-[306px] left-0 [background:radial-gradient(50%_50%_at_7%_6%,rgba(184,199,217,0.5)_0%,rgba(184,199,217,0)_100%)] opacity-10 absolute top-0 pointer-events-none" />
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg overflow-hidden translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
            <MailIcon className="w-[25px] h-[25px]" />
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center gap-0">
                <span className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 whitespace-nowrap">
                  Feel free to mail us for any enquiries :
                </span>
                <a
                  className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6 underline whitespace-nowrap ml-1"
                  href="mailto:support@biz365.com"
                >
                  support@biz365.com
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};
