import mongoose from 'mongoose';

// NOTE: Do NOT read or validate MONGODB_URI at module level.
// This file is imported by every API route. Next.js evaluates all modules
// during the build ("Collecting page data" phase) where env vars are absent.
// Any top-level throw here crashes the build for every route that uses it.
// The guard is moved inside connectToDatabase() so it only runs at request time.

declare global {
  // eslint-disable-next-line no-var
  var mongoose: { conn: mongoose.Mongoose | null; promise: Promise<mongoose.Mongoose> | null };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Singleton Mongoose connection with serverless-optimised pool settings.
 *
 *  maxPoolSize: 5   — sweet spot for Mongoose on serverless.
 *  minPoolSize: 0   — let idle connections close between invocations.
 *  maxIdleTimeMS: 60_000  — release connections idle > 60 s.
 *  socketTimeoutMS: 45_000 — surface long queries as errors.
 */
async function connectToDatabase(): Promise<mongoose.Mongoose> {
  // Validate env var at REQUEST time, not module evaluation time.
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      'MONGODB_URI environment variable is not set. Configure it in Vercel project settings.'
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 5,
      minPoolSize: 1,       // keep 1 connection alive — eliminates cold-start re-handshake (~200-400ms)
      serverSelectionTimeoutMS: 5_000,
      socketTimeoutMS: 45_000,
      maxIdleTimeMS: 60_000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
