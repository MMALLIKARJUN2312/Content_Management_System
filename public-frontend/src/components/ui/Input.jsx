import { cn } from '@/lib/cn';

export default function Input({ icon: Icon, className, ...props }) {
  return (
    <div className={cn('relative flex items-center', className)}>
      {Icon && <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-ink-500" aria-hidden="true" />}
      <input
        className={cn(
          'w-full rounded-lg border border-ink-300 bg-surface-card py-2 text-sm text-ink-900 placeholder:text-ink-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500',
          Icon ? 'pl-9 pr-3' : 'px-3',
        )}
        {...props}
      />
    </div>
  );
}
