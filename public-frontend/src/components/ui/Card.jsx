import { cn } from '@/lib/cn';

export default function Card({ className, ...props }) {
  return (
    <div
      className={cn('rounded-card border border-ink-100 bg-surface-card shadow-sm', className)}
      {...props}
    />
  );
}
