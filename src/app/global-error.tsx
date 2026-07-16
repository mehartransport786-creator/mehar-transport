'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F8F9FC',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          <div style={{ textAlign: 'center', maxWidth: '480px', padding: '24px' }}>
            <div style={{ fontSize: '64px', fontWeight: 900, color: '#1B1E4F', marginBottom: '16px' }}>
              Oops!
            </div>
            <div style={{ width: '96px', height: '6px', background: '#df9a26', margin: '0 auto 24px', borderRadius: '999px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1B1E4F', marginBottom: '16px' }}>
              Something went wrong
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '32px', lineHeight: 1.6 }}>
              We apologize for the inconvenience. Please try again or contact our support team.
            </p>
            <button
              onClick={() => reset()}
              style={{
                padding: '12px 32px',
                background: '#1B1E4F',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                marginRight: '12px',
              }}
            >
              Try Again
            </button>
            <a
              href="/"
              style={{
                padding: '12px 32px',
                background: '#df9a26',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                fontSize: '14px',
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Go Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
