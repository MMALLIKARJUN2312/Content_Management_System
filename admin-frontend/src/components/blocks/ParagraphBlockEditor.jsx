export default function ParagraphBlockEditor({ data, onChange }) {
  return (
    <textarea
      value={data.text || ''}
      onChange={(e) => onChange({ ...data, text: e.target.value })}
      rows={3}
      placeholder="Paragraph text"
      className="w-full rounded-lg border border-surface-border px-3 py-2 text-sm"
    />
  );
}
