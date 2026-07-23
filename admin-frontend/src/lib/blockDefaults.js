export const BLOCK_TYPES = ['paragraph', 'list', 'nested_list', 'table', 'equation'];

export const BLOCK_TYPE_LABELS = {
  paragraph: 'Paragraph',
  list: 'List',
  nested_list: 'Nested list',
  table: 'Table',
  equation: 'Equation',
};

export function createDefaultBlockData(type) {
  switch (type) {
    case 'paragraph':
      return { text: '' };
    case 'list':
      return { items: [] };
    case 'nested_list':
      return { items: [] };
    case 'table':
      return { headers: ['Column 1'], rows: [] };
    case 'equation':
      return { equation: '', displayMode: true };
    default:
      return {};
  }
}
