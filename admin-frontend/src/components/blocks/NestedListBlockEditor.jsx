import { Plus, Trash2 } from 'lucide-react';

export default function NestedListBlockEditor({ data, onChange }) {
  const items = data.items || [];

  const updateItem = (index, patch) => {
    onChange({ ...data, items: items.map((it, i) => (i === index ? { ...it, ...patch } : it)) });
  };

  const removeItem = (index) => {
    onChange({ ...data, items: items.filter((_, i) => i !== index) });
  };

  const addItem = () => {
    onChange({ ...data, items: [...items, { text: '', children: [] }] });
  };

  const updateChild = (index, childIndex, value) => {
    const children = [...(items[index].children || [])];
    children[childIndex] = value;
    updateItem(index, { children });
  };

  const removeChild = (index, childIndex) => {
    updateItem(index, { children: (items[index].children || []).filter((_, i) => i !== childIndex) });
  };

  const addChild = (index) => {
    updateItem(index, { children: [...(items[index].children || []), ''] });
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, index) => (
        <div key={index} className="rounded-lg border border-surface-border p-2">
          <div className="flex items-center gap-2">
            <span className="text-ink-500">•</span>
            <input
              value={item.text || ''}
              onChange={(e) => updateItem(index, { text: e.target.value })}
              placeholder="Item"
              className="flex-1 rounded-lg border border-surface-border px-2 py-1.5 text-sm"
            />
            <button type="button" onClick={() => removeItem(index)} className="text-ink-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="ml-6 mt-2 flex flex-col gap-1.5">
            {(item.children || []).map((child, childIndex) => (
              <div key={childIndex} className="flex items-center gap-2">
                <span className="text-ink-500">◦</span>
                <input
                  value={child}
                  onChange={(e) => updateChild(index, childIndex, e.target.value)}
                  placeholder="Sub-item"
                  className="flex-1 rounded-lg border border-surface-border px-2 py-1 text-sm"
                />
                <button type="button" onClick={() => removeChild(index, childIndex)} className="text-ink-500 hover:text-red-600">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addChild(index)}
              className="flex w-fit items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              <Plus className="h-3 w-3" />
              Add sub-item
            </button>
          </div>
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
