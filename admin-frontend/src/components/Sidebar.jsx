'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/cn';
import { logoutAdmin } from '@/store/slices/authSlice';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Standards', href: '/standards', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await dispatch(logoutAdmin());
    router.push('/login');
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-surface-border bg-surface-card px-4 py-6">
      <div className="px-2 pb-6">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
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
  );
}
