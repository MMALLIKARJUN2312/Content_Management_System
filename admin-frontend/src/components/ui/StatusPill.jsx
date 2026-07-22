import { cn } from '@/lib/cn';

const STATUS_CONFIG = {
  certified: {
    label: 'Certified',
    dot: 'bg-status-certified',
    text: 'text-status-certified',
    bg: 'bg-status-certified-bg',
  },
  public_consultation: {
    label: 'Public consultation',
    dot: 'bg-status-consultation',
    text: 'text-status-consultation',
    bg: 'bg-status-consultation-bg',
  },
  draft: {
    label: 'Draft',
    dot: 'bg-status-draft',
    text: 'text-status-draft',
    bg: 'bg-status-draft-bg',
  },
};

export default function StatusPill({ status, className }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-xs font-medium',
        config.bg,
        config.text,
        className,
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}
