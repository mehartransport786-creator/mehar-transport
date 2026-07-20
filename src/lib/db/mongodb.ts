/**
 * PR-5 new finding: This file previously maintained its own Mongoose connection
 * cache on `global.mongooseDb`, separate from the primary cache on `global.mongoose`
 * in `lib/db.ts`. Two independent caches = two connection pools = up to 20 open
 * sockets per serverless instance instead of 10.
 *
 * Now a thin re-export of the canonical connection module so all 21 call sites
 * share a single pool. `lib/db/mongodb.ts` can be deleted once all importers
 * have been updated to use `@/lib/db` directly, but this shim prevents a
 * breaking change during the migration window.
 */
export { default } from '@/lib/db';
