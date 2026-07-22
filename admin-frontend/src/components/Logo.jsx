import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-1.5 text-lg font-semibold">
      <CheckCircle2 className="h-4 w-4 text-brand-500" />
      <span className="text-ink-900">Renew</span>
      <span className="text-brand-500">Cred</span>
    </Link>
  );
}
