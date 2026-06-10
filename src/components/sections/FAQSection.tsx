"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FAQSection() {
    const t = useTranslations('FAQSection');
  
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: t("canIBookATransferFromJeddahAirportDirect"),
      a: t("yesWeProvideDirectTransferServicesFromKi")
    },
    {
      q: t("areTheDisplayedPricesFixedOrDoTheyChange"),
      a: t("allOurPricesAreFixedAndInclusiveOfAllTax")
    },
    {
      q: t("doYouProvideChildSeats"),
      a: t("yesAbsolutelyWeProvideComplimentaryChild")
    },
    {
      q: t("whatHappensIfMyFlightIsDelayed"),
      a: t("donTWorryOurTeamMonitorsFlightSchedulesI")
    },
    {
      q: t("howCanIPayForTheTrip"),
      a: t("weAcceptCashToTheDriverAdvanceBankTransf")
    },
    {
      q: t("doTheDriversSpeakEnglish"),
      a: t("yesWeProvideDriversWhoAreFluentInBothEng")
    }
  ];

  return (
    <section className="py-24 bg-accent/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[800px]">
        
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <HelpCircle className="w-6 h-6 text-secondary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            {t("frequentlyAskedQuestions")}
          </h2>
          <p className="text-muted-foreground">
            {t("comprehensiveAnswersToTheMostCommonQuest")}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-secondary/30 shadow-md' : 'border-slate-100 shadow-sm'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-start focus:outline-none"
                >
                  <span className={`font-bold pr-8 rtl:pr-0 rtl:pl-8 ${isOpen ? 'text-secondary' : 'text-primary'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-secondary' : 'text-muted-foreground'}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
