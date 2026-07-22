import { cn } from '@/lib/cn';

export default function Container({ className, ...props }) {
  return <div className={cn('mx-auto w-full max-w-7xl px-6', className)} {...props} />;
}
