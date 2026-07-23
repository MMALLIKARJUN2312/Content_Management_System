'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { UserCircle2, Menu } from 'lucide-react';
import { fetchCurrentAdmin } from '@/store/slices/authSlice';

export default function Topbar({ onToggleSidebar }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { admin, isAuthenticated, sessionChecked } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(fetchCurrentAdmin()).then((result) => {
        if (fetchCurrentAdmin.rejected.match(result)) {
          router.replace('/login');
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-surface-border bg-surface-card px-4 py-4 md:justify-end md:px-6">
      <button
        type="button"
        onClick={onToggleSidebar}
        className="text-ink-500 hover:text-ink-900 md:hidden"
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex items-center gap-2 text-sm text-ink-700">
        <UserCircle2 className="h-6 w-6 text-ink-500" />
        {!sessionChecked && !admin ? 'Loading…' : admin?.username || 'Admin'}
      </div>
    </header>
  );
}
