const fs = require('fs');

const files = [
  "src/app/[locale]/admin/pricing/audit-logs/page.tsx",
  "src/app/[locale]/admin/pricing/hourly/page.tsx",
  "src/app/[locale]/admin/pricing/page.tsx",
  "src/app/[locale]/admin/pricing/routes/page.tsx",
  "src/app/[locale]/admin/pricing/seasonal/page.tsx",
  "src/app/[locale]/admin/settings/audit-logs/page.tsx",
  "src/app/[locale]/admin/settings/danger-zone/page.tsx",
  "src/app/[locale]/admin/settings/notifications/page.tsx",
  "src/app/[locale]/admin/settings/page.tsx",
  "src/app/[locale]/admin/settings/profile/page.tsx",
  "src/app/[locale]/admin/settings/roles/page.tsx",
  "src/app/[locale]/admin/settings/security/page.tsx",
  "src/app/[locale]/admin/settings/users/page.tsx",
  "src/app/[locale]/routes/page.tsx",
  "src/components/booking-page/layout/BookingFAQ.tsx",
  "src/components/booking-page/layout/ProgressBar.tsx",
  "src/components/booking-page/layout/SafetyCenter.tsx",
  "src/components/booking-page/steps/BookingConfirmation.tsx",
  "src/components/booking-page/steps/ExtraServices.tsx",
  "src/components/booking-page/steps/FleetSelection.tsx",
  "src/components/booking-page/steps/JourneyReview.tsx",
  "src/components/booking-page/steps/PassengerInfo.tsx",
  "src/components/booking-page/steps/PaymentCenter.tsx",
  "src/components/booking-page/steps/RouteBuilder.tsx",
  "src/components/booking-page/steps/TripTypeSelector.tsx",
  "src/components/fleet-page/CinematicHero.tsx",
  "src/components/fleet-page/FleetSEOContent.tsx",
  "src/components/fleet-page/InteractiveComparison.tsx",
  "src/components/fleet-page/PremiumVehicleCollection.tsx",
  "src/components/fleet-page/SafetyQuality.tsx",
  "src/components/fleet-page/VehicleCategoryExperience.tsx",
  "src/components/layout/Navbar.tsx",
  "src/components/sections/AboutSection.tsx",
  "src/components/sections/ContentHubSection.tsx",
  "src/components/sections/CTASection.tsx",
  "src/components/sections/FeaturedRoutes.tsx",
  "src/components/sections/FleetShowcase.tsx",
  "src/components/sections/Hero.tsx",
  "src/components/sections/ServicesSection.tsx",
  "src/components/vehicle-page/FinalCTA.tsx",
  "src/components/vehicle-page/PerfectFor.tsx",
  "src/components/vehicle-page/PopularRoutes.tsx",
  "src/components/vehicle-page/RelatedVehicles.tsx",
  "src/components/vehicle-page/StickyBookingWidget.tsx",
  "src/components/vehicle-page/VehicleComparison.tsx",
  "src/components/vehicle-page/VehicleFAQ.tsx",
  "src/components/vehicle-page/VehicleFeatures.tsx",
  "src/components/vehicle-page/VehicleHero.tsx",
  "src/components/vehicle-page/VehicleReviews.tsx",
  "src/components/vehicle-page/VehicleSEO.tsx",
  "src/components/vehicle-page/VehicleStory.tsx"
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');

  if (f.startsWith('src/app')) {
    if (!content.includes('const isAr =')) {
      if (content.includes('const resolvedParams = await params;')) {
        content = content.replace(/const resolvedParams = await params;/, 'const resolvedParams = await params;\n  const isAr = resolvedParams.locale === "ar";');
      } else if (content.includes('const locale = useLocale();')) {
        content = content.replace(/const locale = useLocale\(\);/, 'const locale = useLocale();\n  const isAr = locale === "ar";');
      } else {
        content = content.replace(/(export default (?:async )?function [^{]+\{\s*)/, '$1const isAr = "ar" === (typeof params !== "undefined" ? (params?.locale || "ar") : "ar");\n  // Using a fallback isAr because locale is passed dynamically\n  ');
      }
    }
  } else {
    // Components
    if (!content.includes('const isAr =')) {
      if (content.includes('const locale = useLocale();')) {
        content = content.replace(/const locale = useLocale\(\);/, 'const locale = useLocale();\n  const isAr = locale === "ar";');
      } else {
        content = content.replace(/(export (?:default )?(?:async )?function [^{]+\{\s*)/, '$1const locale = useLocale();\n  const isAr = locale === "ar";\n  ');
      }
    }
  }

  fs.writeFileSync(f, content);
  console.log('Restored in', f);
});
