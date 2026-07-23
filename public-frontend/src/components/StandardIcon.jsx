import { Zap, Flame, Wind, Sun, Leaf } from 'lucide-react';

export default function StandardIcon({ icon, className }) {
  switch (icon) {
    case 'Zap':
      return <Zap className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    default:
      return <Leaf className={className} />;
  }
}
