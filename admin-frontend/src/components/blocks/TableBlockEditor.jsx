import { Plus, Trash2 } from 'lucide-react';

export default function TableBlockEditor({ data, onChange }) {
  const headers = data.headers || [];
  const rows = data.rows || [];

  const updateHeader = (colIndex, value) => {
    onChange({ ...data, headers: headers.map((h, i) => (i === colIndex ? value : h)) });
  };

  const updateCell = (rowIndex, colIndex, value) => {
    onChange({
      ...data,
      rows: rows.map((row, r) => (r === rowIndex ? row.map((cell, c) => (c === colIndex ? value : cell)) : row)),
    });
  };

  const addColumn = () => {
    onChange({
      ...data,
      headers: [...headers, ''],
      rows: rows.map((row) => [...row, '']),
    });
  };

  const removeColumn = (colIndex) => {
    onChange({
      ...data,
      headers: headers.filter((_, i) => i !== colIndex),
      rows: rows.map((row) => row.filter((_, i) => i !== colIndex)),
    });
  };

  const addRow = () => {
    onChange({ ...data, rows: [...rows, headers.map(() => '')] });
  };

  const removeRow = (rowIndex) => {
    onChange({ ...data, rows: rows.filter((_, i) => i !== rowIndex) });
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {headers.map((header, colIndex) => (
                <th key={colIndex} className="border border-surface-border p-1">
                  <div className="flex items-center gap-1">
                    <input
                      value={header}
                      onChange={(e) => updateHeader(colIndex, e.target.value)}
                      placeholder="Header"
                      className="w-full rounded border border-surface-border px-1.5 py-1 text-xs font-medium"
                    />
                    <button type="button" onClick={() => removeColumn(colIndex)} className="text-ink-500 hover:text-red-600">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex} className="border border-surface-border p-1">
                    <input
                      value={cell}
                      onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                      className="w-full rounded border border-surface-border px-1.5 py-1 text-xs"
                    />
                  </td>
                ))}
                <td className="p-1">
                  <button type="button" onClick={() => removeRow(rowIndex)} className="text-ink-500 hover:text-red-600">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={addColumn}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
        >
          <Plus className="h-3.5 w-3.5" />
          Add column
        </button>
        <button
          type="button"
          onClick={addRow}
          disabled={headers.length === 0}
          className="flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 disabled:opacity-40"
        >
          <Plus className="h-3.5 w-3.5" />
          Add row
        </button>
      </div>
    </div>
  );
}
