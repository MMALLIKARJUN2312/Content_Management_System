'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import StatusPill from './ui/StatusPill';
import { formatDate } from '@/lib/formatDate';
import { cn } from '@/lib/cn';

function versionDateLabel(version) {
  if (version.status === 'certified') return formatDate(version.certifiedDate);
  if (version.status === 'public_consultation') {
    const start = formatDate(version.consultationStart);
    const end = formatDate(version.consultationEnd);
    return start && end ? `${start} - ${end}` : start;
  }
  return null;
}

export default function VersionDropdown({ versions, currentVersionId, onSelect, onViewFeedback }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const current = versions.find((v) => v._id === currentVersionId) || versions[0];

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-ink-300 bg-surface-card px-3 py-2 text-left text-sm"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Version: ${current?.versionNumber}. Click to change version.`}
      >
        <span>
          <span className="font-medium text-ink-900">{current?.versionNumber}</span>
          {versionDateLabel(current) && <span className="text-ink-500"> — {versionDateLabel(current)}</span>}
        </span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-ink-500 transition-transform', open && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Versions"
          className="absolute left-0 top-full z-10 mt-2 w-full min-w-[280px] rounded-lg border border-ink-100 bg-surface-card py-1 shadow-lg"
        >
          {versions.map((version) => (
            <div key={version._id} className="group relative">
              <button
                type="button"
                role="option"
                aria-selected={version._id === currentVersionId}
                onClick={() => {
                  onSelect(version._id);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-ink-100',
                  version._id === currentVersionId && 'bg-brand-50',
                )}
              >
                <span className="font-medium text-ink-900">{version.versionNumber}</span>
                <span className="flex items-center gap-2">
                  {versionDateLabel(version) && (
                    <span className="text-xs text-ink-500">{versionDateLabel(version)}</span>
                  )}
                  <StatusPill status={version.status} />
                </span>
              </button>
              {version.status === 'public_consultation' && (
                <button
                  type="button"
                  onClick={() => {
                    onViewFeedback(version._id);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 px-4 pb-2.5 text-xs text-ink-500 hover:text-brand-600"
                >
                  <MessageSquare className="h-3.5 w-3.5" aria-hidden="true" />
                  View Feedback (summary &amp; scores)
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
