/**
 * PR-0 Data Coverage Audit
 * ========================
 * Run this in MongoDB Atlas → "mongosh" tab, or paste into mongosh locally.
 *
 * BEFORE YOU RUN:
 *   use your_database_name   ← replace with your actual DB name (check MONGODB_URI)
 *
 * These 5 queries tell you exactly what must exist before you deploy.
 * The new pricing engine returns 422 (not 500) for missing rows, so gaps
 * cause vehicles to silently disappear from the booking form, not crash it.
 * Fix gaps FIRST, deploy SECOND.
 */

// ─────────────────────────────────────────────────────────────────────────────
// QUERY 1 — Is every mockFleet vehicle in the DB?
// Expected: 6 documents, one per slug below.
// Missing slugs = vehicle won't appear in booking form after deploy.
// ─────────────────────────────────────────────────────────────────────────────

db.vehicles.find(
  { slug: { $in: [
    "toyota-camry",
    "hyundai-staria",
    "hyundai-h1",
    "toyota-hiace",
    "coaster-bus",
    "gmc-denali"
  ] } },
  { slug: 1, name: 1, active: 1, _id: 1 }
).sort({ slug: 1 });

// ─────────────────────────────────────────────────────────────────────────────
// QUERY 2 — Are all 6 vehicles marked active?
// Any with active: false will be excluded from GET /api/vehicles response.
// ─────────────────────────────────────────────────────────────────────────────

db.vehicles.find(
  { slug: { $in: [
    "toyota-camry", "hyundai-staria", "hyundai-h1",
    "toyota-hiace", "coaster-bus", "gmc-denali"
  ], }, active: { $ne: true } },
  { slug: 1, name: 1, active: 1 }
);
// Expected: 0 documents. If any appear here, run:
// db.vehicles.updateOne({ slug: "<slug>" }, { $set: { active: true } })

// ─────────────────────────────────────────────────────────────────────────────
// QUERY 3 — Does RoutePricing have rows for all vehicle × route combinations?
// The engine needs ONE row per (routeId, vehicleId) pair.
// ─────────────────────────────────────────────────────────────────────────────

db.routepricings.aggregate([
  { $match: { isActive: true } },
  {
    $lookup: {
      from: "vehicles",
      localField: "vehicleId",
      foreignField: "_id",
      as: "vehicle"
    }
  },
  {
    $lookup: {
      from: "routes",
      localField: "routeId",
      foreignField: "_id",
      as: "route"
    }
  },
  {
    $project: {
      vehicleSlug: { $arrayElemAt: ["$vehicle.slug", 0] },
      routeSlug: { $arrayElemAt: ["$route.slug", 0] },
      basePrice: 1,
      currentPrice: 1,
      isActive: 1
    }
  },
  { $sort: { routeSlug: 1, vehicleSlug: 1 } }
]);
// What to look for:
//   - Every active route should have a row for every vehicle you want to offer on it.
//   - Missing combinations = 422 from pricing engine = that vehicle is hidden.

// ─────────────────────────────────────────────────────────────────────────────
// QUERY 4 — Does HourlyPricing have rows for all vehicles?
// One row per vehicle. Missing = vehicle hidden on the hourly tab.
// ─────────────────────────────────────────────────────────────────────────────

db.hourlypricings.aggregate([
  { $match: { isActive: true } },
  {
    $lookup: {
      from: "vehicles",
      localField: "vehicleId",
      foreignField: "_id",
      as: "vehicle"
    }
  },
  {
    $project: {
      vehicleSlug: { $arrayElemAt: ["$vehicle.slug", 0] },
      hourlyRate: 1,
      minimumHours: 1,
      isActive: 1
    }
  },
  { $sort: { vehicleSlug: 1 } }
]);

// ─────────────────────────────────────────────────────────────────────────────
// QUERY 5 — Seasonal pricing: are there any priority ties?
// Ties = non-deterministic rule selection (one rule wins arbitrarily).
// Fix by assigning distinct priorities before deploying PR-3.
// ─────────────────────────────────────────────────────────────────────────────

db.seasonalpricings.aggregate([
  { $match: { isActive: true } },
  {
    $group: {
      _id: "$priority",
      count: { $sum: 1 },
      seasons: { $push: { name: "$seasonName", start: "$startDate", end: "$endDate" } }
    }
  },
  { $match: { count: { $gt: 1 } } },
  { $sort: { _id: -1 } }
]);
// Expected: 0 documents. If any appear, check whether those seasons overlap in date.
// If they do overlap, assign them distinct priority values.
