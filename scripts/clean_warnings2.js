const fs = require('fs');

const targets = [
  { path: 'src/components/fleet-page/FleetFAQ.tsx', rules: [/const flatFaqs = [^;]+;\n?/g] },
  { path: 'src/components/sections/FeaturedRoutes.tsx', rules: [/CreditCard,\s?/g] },
  { path: 'src/components/sections/Hero.tsx', rules: [/\s*const router = useRouter\(\);/g] },
  { path: 'src/components/layout/Footer.tsx', rules: [/getLocale,\s?/g, /useTranslations,\s?/g, /import \{ useTranslations \} from "next-intl";\n?/g] },
  { path: 'src/lib/db.ts', rules: [/\s*\/\/ eslint-disable-next-line no-var/g] },
  { path: 'src/lib/db/mongodb.ts', rules: [/\s*\/\/ eslint-disable-next-line no-var/g] }
];

targets.forEach(t => {
  try {
    let content = fs.readFileSync(t.path, 'utf8');
    t.rules.forEach(r => content = content.replace(r, ''));
    fs.writeFileSync(t.path, content);
    console.log("Updated", t.path);
  } catch(e) { console.error(e) }
});

const globFiles = [
  "src/components/fleet-page/FleetFAQ.tsx",
  "src/components/fleet-page/FleetOverview.tsx",
  "src/components/fleet-page/FleetSEOContent.tsx",
  "src/components/fleet-page/InteractiveComparison.tsx",
  "src/components/fleet-page/InteriorExperience.tsx",
  "src/components/fleet-page/PilgrimExperience.tsx",
  "src/components/fleet-page/PremiumVehicleCollection.tsx",
  "src/components/fleet-page/SafetyQuality.tsx",
  "src/components/fleet-page/VehicleCategoryExperience.tsx",
  "src/components/sections/AboutSection.tsx",
  "src/components/sections/CTASection.tsx",
  "src/components/sections/ContentHubSection.tsx",
  "src/components/sections/FAQSection.tsx",
  "src/components/sections/FeaturedRoutes.tsx",
  "src/components/sections/FleetShowcase.tsx",
  "src/components/sections/GallerySection.tsx",
  "src/components/sections/Hero.tsx",
  "src/components/sections/ReviewsSection.tsx",
  "src/components/sections/SafetySection.tsx",
  "src/components/sections/ServicesSection.tsx",
  "src/components/sections/TrustBar.tsx",
  "src/components/vehicle-page/ComfortExperience.tsx",
  "src/components/vehicle-page/FinalCTA.tsx",
  "src/components/vehicle-page/PerfectFor.tsx",
  "src/components/vehicle-page/PopularRoutes.tsx",
  "src/components/vehicle-page/PremiumGallery.tsx",
  "src/components/vehicle-page/RelatedVehicles.tsx",
  "src/components/vehicle-page/StickyBookingWidget.tsx",
  "src/components/vehicle-page/VehicleComparison.tsx",
  "src/components/vehicle-page/VehicleFAQ.tsx",
  "src/components/vehicle-page/VehicleFeatures.tsx",
  "src/components/vehicle-page/VehicleHero.tsx",
  "src/components/vehicle-page/VehicleReviews.tsx",
  "src/components/vehicle-page/VehicleSEO.tsx",
  "src/components/vehicle-page/VehicleSafety.tsx",
  "src/components/vehicle-page/VehicleStory.tsx"
];

globFiles.forEach(f => {
  try {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/\s*const locale = useLocale\(\);/g, '');
    fs.writeFileSync(f, content);
  } catch(e) { console.error("Error with", f, e) }
});
