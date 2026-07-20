/**
 * travelDate Migration — String → Date
 * =====================================
 * Run ONCE against production before or immediately after deploying.
 * Safe to run multiple times (idempotent — skips already-migrated docs).
 *
 * What it does:
 *   Old schema: travelDate: String  (e.g. "2026-07-15")
 *   New schema: travelDate: Date    (e.g. ISODate("2026-07-15T00:00:00Z"))
 *
 * Run with:
 *   node scripts/migrate-travel-dates.js
 *
 * Requires MONGODB_URI in environment:
 *   $env:MONGODB_URI="mongodb+srv://..."    (PowerShell)
 *   set MONGODB_URI=mongodb+srv://...       (cmd)
 *   MONGODB_URI=... node scripts/...        (bash/Linux)
 */

const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌  MONGODB_URI is not set. Export it before running this script.');
  process.exit(1);
}

async function migrate() {
  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 10_000,
  });

  const db = mongoose.connection.db;
  const collection = db.collection('bookings');

  console.log('🔍  Scanning for string travelDate values...');

  // Find all documents where travelDate is a string (not already a Date)
  const cursor = collection.find({ travelDate: { $type: 'string' } });
  const total = await collection.countDocuments({ travelDate: { $type: 'string' } });

  if (total === 0) {
    console.log('✅  Nothing to migrate — all travelDate values are already Date objects.');
    await mongoose.disconnect();
    return;
  }

  console.log(`📋  Found ${total} bookings to migrate. Starting...`);

  let migrated = 0;
  let failed = 0;
  const errors = [];

  while (await cursor.hasNext()) {
    const doc = await cursor.next();
    const raw = doc.travelDate; // e.g. "2026-07-15" or "2026-07-15T10:00:00"

    try {
      // Parse the string — handle both "YYYY-MM-DD" and "YYYY-MM-DDTHH:mm:ss"
      const parsed = new Date(raw);

      if (isNaN(parsed.getTime())) {
        throw new Error(`Cannot parse "${raw}" as a date`);
      }

      await collection.updateOne(
        { _id: doc._id },
        { $set: { travelDate: parsed } }
      );

      migrated++;
      if (migrated % 100 === 0) {
        process.stdout.write(`  ✔  ${migrated}/${total}\r`);
      }
    } catch (err) {
      failed++;
      errors.push({ bookingId: doc.bookingId || doc._id, raw, error: err.message });
    }
  }

  console.log(`\n✅  Migration complete.`);
  console.log(`   Migrated: ${migrated}`);
  console.log(`   Failed:   ${failed}`);

  if (errors.length > 0) {
    console.log('\n⚠️  Bookings that could not be migrated (travelDate left as-is):');
    errors.forEach(e => {
      console.log(`   bookingId=${e.bookingId}  raw="${e.raw}"  reason: ${e.error}`);
    });
    console.log('\n   Fix these manually in Atlas if needed.');
  }

  // Verify
  const remaining = await collection.countDocuments({ travelDate: { $type: 'string' } });
  if (remaining > 0) {
    console.log(`\n⚠️  ${remaining} documents still have string travelDate (see errors above).`);
  } else {
    console.log('\n🎉  All travelDate fields are now Date objects.');
  }

  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('💥  Migration failed:', err);
  process.exit(1);
});
