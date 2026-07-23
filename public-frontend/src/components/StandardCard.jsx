import Link from 'next/link';
import StandardIcon from './StandardIcon';

export default function StandardCard({ standard }) {
  return (
    <div className="border-b border-ink-100 py-8 first:pt-0 last:border-0">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-ink-900">
          <StandardIcon icon={standard.icon} className="h-4 w-4 text-brand-600" />
          {standard.title}
        </h2>
        <Link href={`/standards/${standard.slug}`} className="text-sm text-ink-500 underline hover:text-ink-900">
          Read more
        </Link>
      </div>
      <p className="mt-3 leading-7 text-ink-700">{standard.summary}</p>
    </div>
  );
}
