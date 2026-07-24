'use client';

import { useEffect } from 'react';
import './globals.css';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled root error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-surface px-6 text-center">
        <h1 className="font-display text-4xl italic text-ink-900">Something went wrong</h1>
        <p className="max-w-md text-ink-500">
          The application ran into an unexpected error. Please try reloading the page.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-pill bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
