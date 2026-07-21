"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "@/lib/motion";
import { Plus, Minus } from "lucide-react";

export function FleetFAQ() {
    const t = useTranslations('FleetFAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // A comprehensive list covering all requested topics
  const faqs = [
    {
      category: t("vehiclesCapacity"),
      questions: [
        { q: t("whatTypesOfVehiclesAreAvailable"), a: t("weOfferAWideRangeIncludingExecutiveSedan") },

        { q: t("areChildSeatsAvailable"), a: t("yesChildSeatsAreAvailableUponRequestDuri") },
        { q: t("canIChooseTheColorOfTheVehicle"), a: t("ourLuxuryFleetPrimarilyFeaturesBlackExte") },
      ]
    },
    {
      category: t("luggageStorage"),
      questions: [
        { q: t("whatIsTheLuggageCapacityForSedans"), a: t("sedansTypicallyAccommodate3LargeSuitcase") },
        { q: t("whatIfIHaveExtraLuggage"), a: t("ifYouHaveOversizedOrExtraLuggageWeRecomm") },
        { q: t("canWheelchairsBeTransported"), a: t("yesAllOurFamilyVansAndGroupVehiclesCanCo") }
      ]
    },
    {
      category: t("umrahAirportTransfers"),
      questions: [
        { q: t("willTheDriverWaitForUsInTheArrivalsHall"), a: t("yesWeProvideVipMeetGreetServicesTheChauf") },
        { q: t("whatIfMyFlightIsDelayed"), a: t("weMonitorAllFlightTimes247YourPickupTime") },
        { q: t("doYouOfferTransfersBetweenMakkahAndMadin"), a: t("yesWeProvideHighlyComfortablePremiumTran") },
        { q: t("areDriversFamiliarWithHaramHotelLocation"), a: t("absolutelyOurChauffeursAreExpertsAndHave") }
      ]
    },
    {
      category: t("vipServices"),
      questions: [
        { q: t("whatDoesVipTransportInclude"), a: t("itIncludesUltraLuxuryVehiclesAUniformedC") },

        { q: t("isPrivacyGuaranteed"), a: t("privacyIsTheCoreOfOurEliteServiceAllVipV") }
      ]
    },
    {
      category: t("pricingBooking"),
      questions: [
        { q: t("arePricesFixedOrMetered"), a: t("allOurPricesAreFixedAllInclusiveWithAbso") },
        { q: t("whatPaymentMethodsAreAccepted"), a: t("weAcceptCreditCardsVisaMastercardMadaApp") },
        { q: t("howCanICancelABooking"), a: t("youCanCancelFreeOfChargeUpTo24HoursBefor") },
        { q: t("areThereWaitingCharges"), a: t("weProvide60MinutesOfComplimentaryWaiting") }
      ]
    },
    {
      category: t("safetyQuality"),
      questions: [
        { q: t("areAllDriversLicensed"), a: t("yesAllChauffeursHoldProfessionalLicenses") },
        { q: t("areTheVehiclesInsured"), a: t("yesAllOurPassengersAndVehiclesAreFullyCo") },
        { q: t("howOftenAreVehiclesMaintained"), a: t("allVehiclesUndergoADailyComprehensiveChe") },
        { q: t("areVehiclesSanitized"), a: t("yesEveryVehicleIsThoroughlySanitizedAfte") }
      ]
    }
  ];

  // Flatten the FAQs to give them a single continuous index for the accordion state
  
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[800px]">
        
        <div className="text-center mb-16 space-y-4">
          <span className="text-secondary font-bold uppercase tracking-[0.2em] text-sm block">
            {t("faq")}
          </span>
          <h2 className="text-4xl font-bold text-primary">
            {t("everythingYouNeedToKnow")}
          </h2>
        </div>

        <div className="space-y-12">
          {faqs.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-2xl font-bold text-primary mb-6 pb-2 border-b border-border">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, qIdx) => {
                  const globalIdx = catIdx * 100 + qIdx; // Unique key logic
                  const isOpen = openIndex === globalIdx;
                  
                  return (
                    <div 
                      key={globalIdx}
                      className={`border rounded-2xl transition-all duration-300 ${isOpen ? 'border-secondary bg-muted' : 'border-border hover:border-primary/30 bg-background'}`}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIdx)}
                        className="w-full px-6 py-5 flex items-center justify-between text-left"
                      >
                        <span className="font-bold text-primary pr-8 rtl:pr-0 rtl:pl-8">{faq.q}</span>
                        <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}>
                          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 pt-1 text-muted-foreground leading-relaxed font-medium">
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
          ))}
        </div>

      </div>
    </section>
  );
}
