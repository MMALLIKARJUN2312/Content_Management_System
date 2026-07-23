'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, FileText, LogOut, X } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/cn';
import { logoutAdmin } from '@/store/slices/authSlice';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Standards', href: '/standards', icon: FileText },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDesktop, setIsDesktop] = useState(false);

  // Drives the mobile slide-in/out directly via inline style rather than
  // Tailwind's translate-x-* utilities — avoids relying on a media query to
  // override an already-applied transform, which inline styles can't do.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    router.push('/login');
  };

  return (
    <>
      {open && !isDesktop && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className="fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-surface-border bg-surface-card px-4 py-6 transition-transform duration-200 md:static md:z-auto"
        style={isDesktop ? undefined : { translate: open ? '0' : '-100%' }}
      >
        <div className="flex items-center justify-between px-2 pb-6">
          <Logo />
          <button type="button" onClick={onClose} className="text-ink-500 hover:text-ink-900 md:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname?.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  active ? 'bg-brand-50 text-brand-700' : 'text-ink-700 hover:bg-ink-100',
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-100"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </aside>
    </>
  );
}
