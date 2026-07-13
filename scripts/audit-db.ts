/**
 * Day 1 Data Audit Script — Mehar Transport
 * Read-only. Connects to the DB defined in MONGODB_URI and
 * produces a per-collection status report + highlights issues.
 *
 * Run: tsx --env-file=.env.local scripts/audit-db.ts
 */

import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

import mongoose from 'mongoose';
import connectToDatabase from '../src/lib/db';

// ── models ────────────────────────────────────────────────────────────────────
import Vehicle      from '../src/lib/models/Vehicle';
import Route        from '../src/lib/models/Route';
import RoutePricing from '../src/lib/models/RoutePricing';
import BlogPost     from '../src/lib/models/BlogPost';
import BlogCategory from '../src/lib/models/BlogCategory';
// import extras we want to count
import '../src/lib/models/BlogAuthor';  // register model so populate works

// ── known real fleet ──────────────────────────────────────────────────────────
const REAL_FLEET_SLUGS = new Set([
  'toyota-camry',
  'hyundai-staria',
  'hyundai-h1',
  'toyota-hiace',
  'coaster-bus',
  'gmc-denali',
]);

const STALE_MOCK_NAMES = new Set([
  'Kia K5',
  'Mitsubishi Xpander',
  'GMC Yukon',
  'Hyundai Starex',
]);

// ── helpers ───────────────────────────────────────────────────────────────────
function heading(title: string) {
  console.log('\n' + '═'.repeat(60));
  console.log(` ${title}`);
  console.log('═'.repeat(60));
}

function flag(msg: string) {
  console.log('  ⚠️  FLAG: ' + msg);
}

function ok(msg: string) {
  console.log('  ✅ ' + msg);
}

function info(msg: string) {
  console.log('  ℹ️  ' + msg);
}

// ── main audit ────────────────────────────────────────────────────────────────
async function runAudit() {
  console.log('Connecting to MongoDB…');
  await connectToDatabase();
  console.log(`Connected. URI prefix: ${process.env.MONGODB_URI?.substring(0, 40)}…`);

  const auditRows: { collection: string; docCount: number; realData: string; issues: string[] }[] = [];

  // ─────────────────────────────────────────────────────────────────────────
  // 1. VEHICLE
  // ─────────────────────────────────────────────────────────────────────────
  heading('1. Vehicle Collection');
  const vehicles = await Vehicle.find({}).lean();
  const vehicleCount = vehicles.length;
  info(`Total documents: ${vehicleCount}`);

  const vehicleIssues: string[] = [];

  if (vehicleCount === 0) {
    flag('Collection is EMPTY — site will show fallback vehicles to ALL visitors');
    vehicleIssues.push('EMPTY — fallback active');
  } else {
    vehicles.forEach((v: any) => {
      const line = `  slug="${v.slug}"  name="${v.name}"  type="${v.type}"  pax=${v.passengers}  luggage=${v.luggage}  basePrice=${v.basePrice}  active=${v.active}  image="${v.image}"`;
      console.log(line);
      if (!REAL_FLEET_SLUGS.has(v.slug)) {
        flag(`"${v.name}" (slug: ${v.slug}) is NOT in the real fleet — possible stale mock`);
        vehicleIssues.push(`Unexpected vehicle: ${v.name} (${v.slug})`);
      }
      if (STALE_MOCK_NAMES.has(v.name)) {
        flag(`"${v.name}" is a known stale mock name — should be removed`);
        vehicleIssues.push(`Stale mock name in DB: ${v.name}`);
      }
      if (!v.image) {
        flag(`"${v.name}" has NO image field`);
        vehicleIssues.push(`Missing image: ${v.name}`);
      }
      if (v.basePrice == null || v.basePrice === 0) {
        flag(`"${v.name}" has zero/missing basePrice`);
        vehicleIssues.push(`Missing/zero basePrice: ${v.name}`);
      }
      if (v.active === false) {
        flag(`"${v.name}" is marked active=false — won't appear in fleet listings`);
        vehicleIssues.push(`inactive: ${v.name}`);
      }
    });

    const dbSlugs = new Set(vehicles.map((v: any) => v.slug));
    const missingSlugs = [...REAL_FLEET_SLUGS].filter(s => !dbSlugs.has(s));
    if (missingSlugs.length > 0) {
      flag(`Real fleet vehicles MISSING from DB: ${missingSlugs.join(', ')}`);
      vehicleIssues.push(`Missing real vehicles: ${missingSlugs.join(', ')}`);
    }
    if (vehicleCount === REAL_FLEET_SLUGS.size && missingSlugs.length === 0) {
      ok(`Count matches real fleet size (${vehicleCount}/${REAL_FLEET_SLUGS.size}) and all slugs match`);
    }
  }

  auditRows.push({
    collection: 'Vehicle',
    docCount: vehicleCount,
    realData: vehicleCount > 0 && vehicleIssues.filter(i => i.includes('Unexpected') || i.includes('EMPTY')).length === 0 ? 'YES' : 'PARTIAL / NO',
    issues: vehicleIssues,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 2. ROUTE
  // ─────────────────────────────────────────────────────────────────────────
  heading('2. Route Collection');
  const routes = await Route.find({}).lean();
  const routeCount = routes.length;
  const activeRoutes = routes.filter((r: any) => r.status === 'active' && r.isActive !== false);
  info(`Total documents: ${routeCount} | Active: ${activeRoutes.length}`);

  const routeIssues: string[] = [];

  if (routeCount === 0) {
    flag('Collection is EMPTY — /api/pricing/routes is serving mock data with fake IDs (r1–r15) to all visitors');
    routeIssues.push('EMPTY — fallback active, all visitors see mock routes');
  } else {
    routes.forEach((r: any) => {
      const hasRealId = r._id?.toString().length === 24 && /^[a-f0-9]{24}$/i.test(r._id.toString());
      const status = r.status === 'active' ? 'active' : r.status;
      console.log(`  slug="${r.slug}"  from="${r.origin}" → "${r.destination}"  dist=${r.distanceKm}km  status=${status}  isActive=${r.isActive}  realId=${hasRealId}`);
      if (!hasRealId) {
        flag(`Route "${r.name}" has non-ObjectId _id — may be a leftover mock`);
        routeIssues.push(`Non-ObjectId _id: ${r.slug}`);
      }
      if (r.status !== 'active') {
        flag(`Route "${r.name}" status="${r.status}" — not active, won't appear in listings`);
        routeIssues.push(`Non-active route: ${r.slug} (${r.status})`);
      }
    });

    if (activeRoutes.length === 0 && routeCount > 0) {
      flag('Routes exist but NONE are active — site is serving mock pricing data');
      routeIssues.push('Routes exist but none are active');
    } else if (activeRoutes.length > 0) {
      ok(`${activeRoutes.length} active routes found`);
    }
  }

  auditRows.push({
    collection: 'Route',
    docCount: routeCount,
    realData: routeCount > 0 && activeRoutes.length > 0 ? 'YES' : 'NO',
    issues: routeIssues,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 3. ROUTE PRICING
  // ─────────────────────────────────────────────────────────────────────────
  heading('3. RoutePricing Collection');
  const pricings = await RoutePricing.find({}).lean();
  const pricingCount = pricings.length;
  info(`Total documents: ${pricingCount}`);

  const pricingIssues: string[] = [];

  if (pricingCount === 0) {
    flag('RoutePricing is EMPTY — booking flow will show no prices to users');
    pricingIssues.push('EMPTY — no route pricing in DB');
  } else {
    // Verify every active route has pricing
    const routeIdsWithPricing = new Set(pricings.map((p: any) => p.routeId?.toString()));
    const activeRouteIds = activeRoutes.map((r: any) => r._id?.toString());
    const routesWithoutPricing = activeRouteIds.filter(id => !routeIdsWithPricing.has(id));
    
    if (routesWithoutPricing.length > 0) {
      flag(`${routesWithoutPricing.length} active routes have NO RoutePricing entries — their pages will show broken/empty pricing`);
      pricingIssues.push(`${routesWithoutPricing.length} active routes missing pricing`);
    } else if (activeRouteIds.length > 0) {
      ok(`All ${activeRouteIds.length} active routes have at least one RoutePricing entry`);
    }

    // Sample 5 prices
    const sample = pricings.slice(0, 5);
    info('Sample currentPrice values:');
    sample.forEach((p: any) => {
      console.log(`    routeId=${p.routeId}  vehicleId=${p.vehicleId}  base=${p.basePrice}  current=${p.currentPrice}  active=${p.isActive}`);
      if (!p.currentPrice || p.currentPrice <= 0) {
        flag(`RoutePricing entry has zero/invalid currentPrice`);
        pricingIssues.push(`Zero/invalid currentPrice in pricing entry`);
      }
    });
  }

  auditRows.push({
    collection: 'RoutePricing',
    docCount: pricingCount,
    realData: pricingCount > 0 ? 'YES' : 'NO',
    issues: pricingIssues,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 4. BLOG POST
  // ─────────────────────────────────────────────────────────────────────────
  heading('4. BlogPost Collection');
  const allPosts = await BlogPost.find({}).lean();
  const publishedPosts = allPosts.filter((p: any) => p.status === 'Published');
  info(`Total documents: ${allPosts.length} | Published: ${publishedPosts.length}`);

  const blogPostIssues: string[] = [];

  if (allPosts.length === 0) {
    flag('BlogPost collection is EMPTY — Knowledge Hub section shows nothing');
    blogPostIssues.push('EMPTY — no blog posts at all');
  } else if (publishedPosts.length === 0) {
    flag('No PUBLISHED posts — Knowledge Hub section will render empty (0 posts shown to visitors)');
    blogPostIssues.push('No Published posts — all are in Draft/other status');
    allPosts.forEach((p: any) => {
      console.log(`  title="${p.title}"  status="${p.status}"  lang="${p.language}"`);
    });
  } else {
    publishedPosts.forEach((p: any) => {
      const hasFeaturedImage = !!p.featuredImage;
      const hasCategoryId = !!p.categoryId;
      console.log(`  title="${p.title}"  slug="${p.slug}"  lang="${p.language}"  cat=${hasCategoryId ? p.categoryId : 'MISSING'}  image=${hasFeaturedImage ? '✓' : '⚠️ MISSING'}  publishedAt=${p.publishedAt}`);
      if (!hasFeaturedImage) {
        flag(`Published post "${p.title}" has NO featuredImage`);
        blogPostIssues.push(`Missing featuredImage: ${p.slug}`);
      }
      if (!hasCategoryId) {
        flag(`Published post "${p.title}" has NO categoryId`);
        blogPostIssues.push(`Missing categoryId: ${p.slug}`);
      }
    });
  }

  auditRows.push({
    collection: 'BlogPost',
    docCount: allPosts.length,
    realData: publishedPosts.length > 0 ? 'YES' : 'NO',
    issues: blogPostIssues,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // 5. BLOG CATEGORY
  // ─────────────────────────────────────────────────────────────────────────
  heading('5. BlogCategory Collection');
  const categories = await BlogCategory.find({}).lean();
  info(`Total documents: ${categories.length}`);

  const categoryIssues: string[] = [];

  if (categories.length === 0) {
    flag('BlogCategory is EMPTY — any posts with categoryId will have broken/un-populated categories');
    categoryIssues.push('EMPTY — no categories');
  } else {
    categories.forEach((c: any) => {
      console.log(`  name="${c.name}"  slug="${c.slug}"`);
    });

    // Check for orphaned categoryIds in published posts
    const catIds = new Set(categories.map((c: any) => c._id?.toString()));
    const orphaned = publishedPosts.filter((p: any) => p.categoryId && !catIds.has(p.categoryId.toString()));
    if (orphaned.length > 0) {
      flag(`${orphaned.length} published posts reference a categoryId that doesn't exist in BlogCategory`);
      categoryIssues.push(`${orphaned.length} orphaned categoryId references`);
    } else if (publishedPosts.length > 0) {
      ok('All published posts have valid categoryId references');
    }
  }

  auditRows.push({
    collection: 'BlogCategory',
    docCount: categories.length,
    realData: categories.length > 0 ? 'YES' : 'NO',
    issues: categoryIssues,
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SUMMARY TABLE
  // ─────────────────────────────────────────────────────────────────────────
  heading('AUDIT SUMMARY TABLE');
  console.log('\n| Collection   | Doc Count | Real Data?      | Issues Found');
  console.log('|--------------|-----------|-----------------|----------------------------------------------');
  auditRows.forEach(row => {
    const issueStr = row.issues.length === 0 ? 'None' : row.issues.join('; ');
    console.log(`| ${row.collection.padEnd(12)} | ${String(row.docCount).padEnd(9)} | ${row.realData.padEnd(15)} | ${issueStr}`);
  });

  // ─────────────────────────────────────────────────────────────────────────
  // SEED SCRIPT ANALYSIS
  // ─────────────────────────────────────────────────────────────────────────
  heading('SEED SCRIPT ANALYSIS (code review, not live query)');
  console.log(`
  seed-pricing.ts:
    - Defines 7 vehicles (includes Kia K5, Mitsubishi Xpander, GMC Yukon, Hyundai Starex)
    - These are STALE MOCK names NOT in the real fleet
    - The script does Vehicle.deleteMany({}) before inserting — if run, it would WIPE the
      real fleet and replace it with 7 mock vehicles
    - WARNING: Do NOT run seed-pricing.ts without reviewing/updating vehiclesData first

  seed-rich-vehicles.ts:
    - Reads from src/lib/data.ts (mockFleet) which contains the CORRECT 6 real vehicles:
      Toyota Camry, Hyundai Staria, Hyundai H1, Toyota Hiace, Coaster Bus, GMC Denali
    - Uses upsert by slug — safe to run without wiping existing data
    - RECOMMENDED seed script for vehicles if fleet is missing/wrong

  data.ts mockFleet (6 vehicles — CORRECT real fleet):
    toyota-camry, hyundai-staria, hyundai-h1, toyota-hiace, coaster-bus, gmc-denali
  `);

  // ─────────────────────────────────────────────────────────────────────────
  // PLAIN-LANGUAGE STATUS
  // ─────────────────────────────────────────────────────────────────────────
  heading('PLAIN-LANGUAGE STATUS');
  const totalIssues = auditRows.reduce((sum, r) => sum + r.issues.length, 0);
  if (totalIssues === 0) {
    console.log(`
  ✅ DATABASE IS PRODUCTION-READY
  All collections have real data. No fallbacks are currently being served.
    `);
  } else {
    console.log(`
  ⚠️  DATABASE HAS GAPS — here is exactly what's missing:
    `);
    auditRows.filter(r => r.issues.length > 0).forEach(r => {
      console.log(`  [${r.collection}]`);
      r.issues.forEach(i => console.log(`    - ${i}`));
    });
    console.log(`
  To fix:
    1. Confirm which gaps need closing with the owner
    2. For vehicles: run seed-rich-vehicles (NOT seed-pricing — it has stale mock vehicles)
    3. For routes + pricing: update routesData in seed-pricing.ts to use real vehicle slugs,
       then run it against a confirmed target
    4. For blog: create posts via the admin panel or a seed-blog.ts script
    `);
  }

  await mongoose.disconnect();
  console.log('\nAudit complete. Disconnected from MongoDB.\n');
  process.exit(0);
}

runAudit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
