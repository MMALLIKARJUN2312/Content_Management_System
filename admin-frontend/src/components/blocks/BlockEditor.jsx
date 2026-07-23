import ParagraphBlockEditor from './ParagraphBlockEditor';
import ListBlockEditor from './ListBlockEditor';
import NestedListBlockEditor from './NestedListBlockEditor';
import TableBlockEditor from './TableBlockEditor';
import EquationBlockEditor from './EquationBlockEditor';

export default function BlockEditor({ block, onChange }) {
  const handleDataChange = (data) => onChange({ ...block, data });

  switch (block.type) {
    case 'paragraph':
      return <ParagraphBlockEditor data={block.data} onChange={handleDataChange} />;
    case 'list':
      return <ListBlockEditor data={block.data} onChange={handleDataChange} />;
    case 'nested_list':
      return <NestedListBlockEditor data={block.data} onChange={handleDataChange} />;
    case 'table':
      return <TableBlockEditor data={block.data} onChange={handleDataChange} />;
    case 'equation':
      return <EquationBlockEditor data={block.data} onChange={handleDataChange} />;
    default:
      return <p className="text-xs text-red-600">Unknown block type: {block.type}</p>;
  }
}
