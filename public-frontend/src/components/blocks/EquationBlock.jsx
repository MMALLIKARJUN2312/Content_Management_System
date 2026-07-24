import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function EquationBlock({ data }) {
  const Math = data.displayMode ? BlockMath : InlineMath;
  return (
    <div className="overflow-x-auto rounded-lg bg-ink-100/40 p-4">
      <Math math={data.equation || ''} errorColor="#dc2626" />
    </div>
  );
}
