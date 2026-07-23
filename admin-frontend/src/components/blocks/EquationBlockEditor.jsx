'use client';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function EquationBlockEditor({ data, onChange }) {
  const { equation = '', displayMode = true } = data;
  const Preview = displayMode ? BlockMath : InlineMath;

  return (
    <div className="flex flex-col gap-2">
      <input
        value={equation}
        onChange={(e) => onChange({ ...data, equation: e.target.value })}
        placeholder="LaTeX, e.g. E = mc^2"
        className="w-full rounded-lg border border-surface-border px-3 py-2 font-mono text-sm"
      />
      <label className="flex w-fit items-center gap-2 text-xs text-ink-700">
        <input
          type="checkbox"
          checked={displayMode}
          onChange={(e) => onChange({ ...data, displayMode: e.target.checked })}
        />
        Display as block equation
      </label>
      <div className="rounded-lg bg-ink-100/40 p-3">
        {equation ? (
          <Preview math={equation} errorColor="#dc2626" />
        ) : (
          <span className="text-xs text-ink-500">Preview will appear here</span>
        )}
      </div>
    </div>
  );
}
