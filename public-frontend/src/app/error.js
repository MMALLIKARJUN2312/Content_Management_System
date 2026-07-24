'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import Container from '@/components/Container';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Unhandled render error:', error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center">
      <Container className="flex flex-col items-start gap-4 py-24">
        <Badge>Error</Badge>
        <h1 className="font-display text-4xl italic text-ink-900">Something went wrong</h1>
        <p className="max-w-md text-ink-500">
          An unexpected error occurred while loading this page. You can try again, or head back
          to the Standards list.
        </p>
        <div className="flex gap-3">
          <Button onClick={() => reset()}>Try again</Button>
          <Button as={Link} href="/standards" variant="outline">
            Browse Standards
          </Button>
        </div>
      </Container>
    </main>
  );
}
