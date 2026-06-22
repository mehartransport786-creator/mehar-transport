import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import connectToDatabase from "./db";
import Package from "./models/Package";
import Route from "./models/Route";
import Vehicle from "./models/Vehicle";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const seedPackages = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to MongoDB");

    await Package.deleteMany({});
    console.log("Cleared existing packages");

    const routes = await Route.find();
    const vehicles = await Vehicle.find();

    if (routes.length === 0 || vehicles.length === 0) {
      console.log("No routes or vehicles found. Please run seed-pricing.ts first.");
      process.exit(1);
    }

    // Helper to find route by origin and destination keywords
    const findRoute = (origin: string, dest: string) => {
      return routes.find(r => r.origin.includes(origin) && r.destination.includes(dest))?._id;
    };

    const packages = [
      {
        name: "Essential Umrah Transfer Package",
        nameAr: "باقة نقل العمرة الأساسية",
        slug: "essential-umrah-transfer",
        description: "The most popular package covering your entire journey from the airport to Makkah, Madinah, and back.",
        descriptionAr: "الباقة الأكثر شعبية التي تغطي رحلتك بالكامل من المطار إلى مكة المكرمة والمدينة المنورة والعودة.",
        category: "Umrah",
        idealFor: ["Individuals", "Couples", "Small Families"],
        features: ["Airport Pickup", "Hotel Transfers", "24/7 Support", "Professional Drivers"],
        featuresAr: ["استقبال من المطار", "انتقالات الفنادق", "دعم على مدار الساعة", "سائقون محترفون"],
        images: ["/fleet/staria.png"],
        includedRoutes: [
          findRoute("Jeddah", "Makkah"),
          findRoute("Makkah", "Madinah"),
          findRoute("Madinah", "Jeddah")
        ].filter(Boolean),
        availableVehicles: vehicles.map(v => v._id),
        isActive: true,
        isPopular: true,
        order: 1
      },
      {
        name: "Complete Umrah Transportation Package",
        nameAr: "باقة نقل العمرة الشاملة",
        slug: "complete-umrah-journey",
        description: "A fully comprehensive package including all transfers and dedicated Ziyarat tours in both Holy Cities.",
        descriptionAr: "باقة شاملة بالكامل تتضمن جميع الانتقالات وجولات الزيارات المخصصة في المدينتين المقدستين.",
        category: "Umrah",
        idealFor: ["Families", "Groups", "First-time Pilgrims"],
        features: ["Airport Pickup", "Hotel Transfers", "Makkah Ziyarat", "Madinah Ziyarat", "24/7 Support", "Flight Monitoring"],
        featuresAr: ["استقبال من المطار", "انتقالات الفنادق", "زيارات مكة", "زيارات المدينة", "دعم على مدار الساعة", "مراقبة الرحلات"],
        images: ["/fleet/hiace.png"],
        includedRoutes: [
          findRoute("Jeddah", "Makkah"),
          findRoute("Makkah", "Ziyarat"),
          findRoute("Makkah", "Madinah"),
          findRoute("Madinah", "Ziyarat"),
          findRoute("Madinah", "Jeddah")
        ].filter(Boolean),
        availableVehicles: vehicles.map(v => v._id),
        isActive: true,
        isPopular: false,
        order: 2
      },
      {
        name: "Luxury VIP Umrah Package",
        nameAr: "باقة العمرة الفاخرة لكبار الشخصيات",
        slug: "luxury-vip-umrah",
        description: "Experience ultimate comfort with our premium fleet and dedicated VIP chauffeurs.",
        descriptionAr: "جرب الراحة المطلقة مع أسطولنا المتميز والسائقين المخصصين لكبار الشخصيات.",
        category: "VIP",
        idealFor: ["VIPs", "Business Travelers", "Luxury Seekers"],
        features: ["Meet & Greet", "VIP Chauffeur", "Luxury Vehicle", "Premium Water", "Priority Service", "Dedicated Support"],
        featuresAr: ["استقبال وترحيب", "سائق خاص", "مركبة فاخرة", "مياه فاخرة", "خدمة ذات أولوية", "دعم مخصص"],
        images: ["/fleet/gmc.png"],
        includedRoutes: [
          findRoute("Jeddah", "Makkah"),
          findRoute("Makkah", "Madinah"),
          findRoute("Madinah", "Jeddah")
        ].filter(Boolean),
        // Assume SUV and Luxury Van are VIP
        availableVehicles: vehicles.filter(v => ['SUV', 'Luxury Van', 'Sedan'].includes(v.type)).map(v => v._id),
        isActive: true,
        isPopular: false,
        order: 3
      }
    ];

    await Package.insertMany(packages);
    console.log("Successfully seeded", packages.length, "packages");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding packages:", error);
    process.exit(1);
  }
};

seedPackages();
