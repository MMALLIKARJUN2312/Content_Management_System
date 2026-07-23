import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

function ParagraphBlock({ data }) {
  return <p className="leading-7 text-ink-700">{data.text}</p>;
}

function ListBlock({ data }) {
  return (
    <ul className="list-disc space-y-1.5 pl-6 text-ink-700">
      {(data.items || []).map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function NestedListBlock({ data }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-ink-700">
      {(data.items || []).map((item, i) => (
        <li key={i}>
          {item.text}
          {item.children?.length > 0 && (
            <ul className="mt-1.5 list-[circle] space-y-1 pl-6">
              {item.children.map((child, ci) => (
                <li key={ci}>{child}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

function TableBlock({ data }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-ink-100">
      <table className="w-full min-w-full divide-y divide-ink-100 text-left text-sm">
        <thead className="bg-ink-100/40">
          <tr>
            {(data.headers || []).map((header, i) => (
              <th key={i} className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-100">
          {(data.rows || []).map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-ink-700">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EquationBlock({ data }) {
  const Math = data.displayMode ? BlockMath : InlineMath;
  return (
    <div className="overflow-x-auto rounded-lg bg-ink-100/40 p-4">
      <Math math={data.equation || ''} errorColor="#dc2626" />
    </div>
  );
}

export default function BlockRenderer({ blocks = [] }) {
  return (
    <div className="flex flex-col gap-4">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'paragraph':
            return <ParagraphBlock key={block._id || i} data={block.data} />;
          case 'list':
            return <ListBlock key={block._id || i} data={block.data} />;
          case 'nested_list':
            return <NestedListBlock key={block._id || i} data={block.data} />;
          case 'table':
            return <TableBlock key={block._id || i} data={block.data} />;
          case 'equation':
            return <EquationBlock key={block._id || i} data={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
