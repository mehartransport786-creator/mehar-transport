import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <div className="text-center max-w-lg px-6">
        <div className="mb-8">
          <div className="text-8xl font-black text-primary mb-2">404</div>
          <div className="w-24 h-1.5 bg-secondary mx-auto rounded-full" />
        </div>
        <h1 className="text-3xl font-bold text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="px-8 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary/80 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/booking"
            className="px-8 py-3 bg-secondary text-white font-bold rounded-xl hover:bg-secondary/80 transition-colors"
          >
            Book a Ride
          </Link>
        </div>
        <p className="mt-12 text-sm text-gray-400">
          © {new Date().getFullYear()} Mehar Transport. All rights reserved.
        </p>
      </div>
    </div>
  );
}
