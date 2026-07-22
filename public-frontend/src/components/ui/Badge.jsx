import { cn } from '@/lib/cn';

const tones = {
  neutral: 'bg-surface-card text-ink-700 border border-ink-300',
  brand: 'bg-brand-50 text-brand-700 border border-brand-200',
};

export default function Badge({ className, tone = 'neutral', children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
