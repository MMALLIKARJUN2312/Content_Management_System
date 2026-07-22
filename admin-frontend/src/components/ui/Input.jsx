import { cn } from '@/lib/cn';

export default function Input({ label, error, icon: Icon, className, id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && <Icon className="pointer-events-none absolute left-3 h-4 w-4 text-ink-500" />}
        <input
          id={id}
          className={cn(
            'w-full rounded-lg border bg-surface-card py-2 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-100',
            error ? 'border-red-400 focus:border-red-500' : 'border-surface-border focus:border-brand-500',
            Icon ? 'pl-9 pr-3' : 'px-3',
            className,
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
