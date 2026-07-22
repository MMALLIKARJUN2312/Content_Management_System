import { cn } from '@/lib/cn';

const variants = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  outline: 'border border-ink-300 text-ink-900 hover:bg-ink-100',
  ghost: 'text-ink-700 hover:bg-ink-100',
};

const sizes = {
  sm: 'text-sm px-4 py-1.5',
  md: 'text-sm px-5 py-2.5',
};

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  return (
    <Component
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-pill font-medium transition-colors disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
