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
      "We specialize in comprehensive AI solutions including machine learning models, intelligent automation, advanced chatbots, predictive analytics, computer vision, natural language processing, and strategic AI consulting tailored to your specific business needs and industry requirements.",
  },
  {
    id: "item-2",
    question: "How long does it take to develop an AI solution?",
    answer:
      "Development timelines vary based on complexity and scope. Simple chatbots typically take 2-4 weeks, while comprehensive AI systems can take 3-6 months. We provide detailed project timelines during our initial consultation and maintain agile development practices to ensure timely delivery without compromising quality.",
  },
  {
    id: "item-3",
    question: "Do I need technical expertise to work with you?",
    answer:
      "Not at all! Our team handles all technical aspects of AI implementation. We provide comprehensive training, documentation, and ongoing support to ensure your team can effectively use and manage the AI solutions. We believe in making AI accessible to businesses of all technical backgrounds.",
  },
  {
    id: "item-4",
    question: "Is my data safe when working with your agency?",
    answer:
      "Absolutely. We implement enterprise-grade security measures including end-to-end encryption, secure data transmission protocols, regular security audits, and compliance with GDPR, CCPA, and other data protection regulations. Your data privacy and security are our top priorities, and we never share your information with third parties.",
  },
  {
    id: "item-5",
    question: "Can AI really help my business grow?",
    answer:
      "Yes! AI can significantly boost your business growth through improved efficiency (up to 40% productivity gains), enhanced customer experiences, data-driven decision making, automated processes, predictive insights, and cost reduction. Our clients typically see 25-60% improvement in key performance metrics within the first 6 months of implementation.",
  },
];

export const DesktopViewSection = () => {
  return (
    <section className="flex flex-col w-full items-center justify-center px-4 md:px-8 lg:px-16 xl:px-24 py-[100px] bg-orbai-templateframerwebsitewild-sand rounded-[0px_0px_50px_50px] overflow-hidden shadow-[1px_20px_30px_-12px_#00000033] relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-tl from-gray-300/15 to-transparent rounded-full blur-xl animate-pulse-subtle" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-r from-gray-100/25 to-transparent rounded-full blur-lg animate-float" />
      </div>

      <div className="flex flex-col max-w-6xl items-center gap-12 w-full relative z-10">
        <header className="flex flex-col items-center justify-center gap-6 text-center animate-fade-in">
          <div className="flex flex-col items-center">
            <Badge variant="premium" className="h-8 rounded-[60px] overflow-hidden group">
              <div className="flex items-center gap-2 px-3 py-1.5">
                <img
                  className="w-[18px] h-[15px]"
                  alt="Group"
                  src="https://cdn1.genspark.ai/user-upload-image/gpt_image_generated/23fcf73e-a6e0-4fd6-8fdd-a1f04b72dc48"
                />
                <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-[11.6px] tracking-[0] leading-[14.4px]">
                  FAQS
                </span>
              </div>
            </Badge>
          </div>

          <div className="flex flex-col items-center w-full animate-fade-up">
            <h1 className="bg-gradient-to-r from-wwwsightfulcomblack via-gray-600 to-wwwsightfulcomblack bg-clip-text text-transparent [font-family:'Inter',Helvetica] font-bold text-4xl md:text-5xl lg:text-6xl text-center tracking-tight leading-tight animate-shimmer">
              Questions? Answers!
            </h1>
          </div>

          <div className="flex flex-col max-w-2xl items-center animate-fade-up [--animation-delay:200ms]">
            <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-lg text-center tracking-[0] leading-7 opacity-80">
              Find quick answers to the most common questions about our AI solutions and services.
            </p>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center gap-8 w-full max-w-4xl animate-fade-up [--animation-delay:400ms]">
          <div className="flex flex-col w-full items-center">
            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="flex flex-col w-full max-w-3xl items-center justify-center gap-6"
            >
              {faqData.map((faq, index) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="w-full bg-gradient-to-r from-orbai-templateframerwebsitewild-sand to-white rounded-2xl overflow-hidden shadow-[inset_0px_3px_1px_#ffffff,0px_30px_30px_-4px_#00000005,0px_13.65px_13.65px_-3.33px_#0000000d,0px_6.87px_6.87px_-2.67px_#00000012,0px_3.62px_3.62px_-2px_#00000012,0px_1.81px_1.81px_-1.33px_#00000014,0px_0.71px_0.71px_-0.67px_#00000014] border border-gray-100/50 hover:border-gray-300/70 transition-all duration-500 hover:shadow-[0px_40px_40px_-8px_#00000010,0px_20px_20px_-6px_#00000015] hover:scale-[1.02] hover:-translate-y-1 group relative animate-fade-up"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <AccordionTrigger className="flex items-center justify-between gap-4 px-6 py-5 hover:no-underline [&[data-state=open]>svg]:rotate-180 transition-all duration-300 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-transparent rounded-t-2xl group-hover:shadow-inner">
                    <span className="flex-1 text-left [font-family:'Inter',Helvetica] font-semibold text-wwwsightfulcomblack text-lg tracking-[0] leading-7 group-hover:text-black transition-colors duration-300">
                      {faq.question}
                    </span>
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300 group-hover:scale-110">
                      <svg
                        className="w-4 h-4 text-gray-600 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6 pt-4 transition-all duration-500">
                    <div className="opacity-90 animate-fade-in">
                      <p className="[font-family:'Inter',Helvetica] font-normal text-wwwsightfulcomblack text-base tracking-[0] leading-7">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                  
                  {/* Decorative gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-50/20 via-transparent to-gray100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                  
                  {/* Animated border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-300/0 via-gray-400/20 to-gray-300/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none animate-shimmer" />
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200/50 hover:border-gray-300/70 transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-1 animate-fade-up [--animation-delay:1000ms] group">
            <MailIcon className="w-6 h-6 text-gray-600 group-hover:text-gray-700 transition-colors duration-300" />
            <div className="flex flex-col items-start">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <span className="[font-family:'Inter',Helvetica] font-medium text-wwwsightfulcomblack text-base text-center tracking-[0] leading-6">
                  Feel free to mail us for any enquiries:
                </span>
                <a
                  className="[font-family:'Inter',Helvetica] font-semibold text-gray-600 text-base text-center tracking-[0] leading-6 underline hover:text-gray-700 hover:no-underline transition-all duration-300 hover:scale-105"
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
