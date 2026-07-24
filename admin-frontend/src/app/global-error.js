'use client';

import { useEffect } from 'react';
import './globals.css';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled root error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <h1 className="text-2xl font-semibold text-ink-900">Something went wrong</h1>
        <p className="max-w-md text-sm text-ink-500">
          The application ran into an unexpected error. Please try reloading the page.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-700"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
