import { Plus, Trash2 } from 'lucide-react';

export default function ListBlockEditor({ data, onChange }) {
  const items = data.items || [];

  const updateItem = (index, value) => {
    onChange({ ...data, items: items.map((it, i) => (i === index ? value : it)) });
  };

  const removeItem = (index) => {
    onChange({ ...data, items: items.filter((_, i) => i !== index) });
  };

  const addItem = () => {
    onChange({ ...data, items: [...items, ''] });
  };

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <span className="text-ink-500">•</span>
          <input
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            placeholder="List item"
            className="flex-1 rounded-lg border border-surface-border px-2 py-1.5 text-sm"
          />
          <button type="button" onClick={() => removeItem(index)} className="text-ink-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex w-fit items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
      >
        <Plus className="h-3.5 w-3.5" />
        Add item
      </button>
    </div>
  );
}
