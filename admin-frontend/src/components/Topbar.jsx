import { UserCircle2 } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="flex items-center justify-end border-b border-surface-border bg-surface-card px-6 py-4">
      <div className="flex items-center gap-2 text-sm text-ink-700">
        <UserCircle2 className="h-6 w-6 text-ink-500" />
        Admin
      </div>
    </header>
  );
}
