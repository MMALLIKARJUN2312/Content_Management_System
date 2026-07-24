import dynamic from 'next/dynamic';
import ParagraphBlockEditor from './ParagraphBlockEditor';
import ListBlockEditor from './ListBlockEditor';
import NestedListBlockEditor from './NestedListBlockEditor';
import TableBlockEditor from './TableBlockEditor';
import Skeleton from '@/components/ui/Skeleton';

// KaTeX (~270KB) is only needed when an admin actually opens an equation
// block's editor, so it's code-split out of the main admin bundle.
const EquationBlockEditor = dynamic(() => import('./EquationBlockEditor'), {
  loading: () => <Skeleton className="h-24 w-full" />,
});

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
