'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import Input from './ui/Input';
import { cn } from '@/lib/cn';

export default function TocSidebar({ sections, activeId, onNavigate }) {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? sections.filter((s) => s.title.toLowerCase().includes(search.trim().toLowerCase()))
    : sections;

  return (
    <div className="flex flex-col gap-4">
      <Input icon={Search} placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
      <nav className="flex flex-col gap-1 text-sm">
        {filtered.map((section) => {
          const id = `section-${section.numbering.join('-')}`;
          const depth = section.numbering.length;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              className={cn(
                'text-left text-ink-500 hover:text-ink-900',
                activeId === id && 'font-semibold text-brand-600',
              )}
              style={{ paddingLeft: `${(depth - 1) * 12}px` }}
            >
              {section.numbering.join('.')} {section.title}
            </button>
          );
        })}
        {filtered.length === 0 && <p className="text-xs text-ink-500">No matching sections.</p>}
      </nav>
    </div>
  );
}
