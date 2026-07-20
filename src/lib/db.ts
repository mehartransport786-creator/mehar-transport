import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

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
 * Key changes from the original (Step 6 of the remediation plan):
 *
 *  maxPoolSize: 5   (was 10) — A serverless instance handles one concurrent
 *    request, so 10 sockets meant 9 sat idle consuming Atlas connection-cap
 *    slots. 5 is the documented sweet spot for Mongoose on serverless.
 *
 *  minPoolSize: 0   — Let idle connections close rather than holding Atlas
 *    slots open between invocations.
 *
 *  maxIdleTimeMS: 60 000  — Release connections that have been idle for 60 s,
 *    matching the typical Vercel function lifecycle.
 *
 *  socketTimeoutMS: 45 000  — Ensures long-running Atlas queries surface as
 *    errors rather than silently keeping the function alive.
 */
async function connectToDatabase(): Promise<mongoose.Mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 5,
      minPoolSize: 0,
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
