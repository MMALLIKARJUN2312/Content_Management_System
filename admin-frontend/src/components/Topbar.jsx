'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { UserCircle2 } from 'lucide-react';
import { fetchCurrentAdmin } from '@/store/slices/authSlice';

export default function Topbar() {
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
    <header className="flex items-center justify-end border-b border-surface-border bg-surface-card px-6 py-4">
      <div className="flex items-center gap-2 text-sm text-ink-700">
        <UserCircle2 className="h-6 w-6 text-ink-500" />
        {!sessionChecked && !admin ? 'Loading…' : admin?.username || 'Admin'}
      </div>
    </header>
  );
}
