'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';
import {
  useGetVersionQuery,
  useUpdateSectionsMutation,
  useTransitionVersionMutation,
} from '@/store/api/standardsApi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import StatusPill from '@/components/ui/StatusPill';
import Spinner from '@/components/ui/Spinner';

const parseNumbering = (text) =>
  text
    .split('.')
    .map((part) => Number(part.trim()))
    .filter((n) => Number.isInteger(n) && n >= 0);

export default function VersionEditorPage() {
  const { id, versionId } = useParams();
  const { data: version, isLoading, isError } = useGetVersionQuery(versionId);
  const [updateSections, { isLoading: isSaving, error: saveError }] = useUpdateSectionsMutation();
  const [transitionVersion, { isLoading: isTransitioning }] = useTransitionVersionMutation();

  const [sections, setSections] = useState(null);
  const [status, setStatus] = useState('draft');
  const [consultationStart, setConsultationStart] = useState('');
  const [consultationEnd, setConsultationEnd] = useState('');
  const [certifiedDate, setCertifiedDate] = useState('');

  // Hydrating a local editable draft from an async server fetch (not deriving
  // render output), so effect-driven setState is the correct tool here.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!version) return;
    setSections(
      version.sections.map((s) => ({
        _id: s._id,
        numberingText: s.numbering.join('.'),
        title: s.title,
        blocks: s.blocks,
      })),
    );
    setStatus(version.status);
    setConsultationStart(version.consultationStart?.slice(0, 10) || '');
    setConsultationEnd(version.consultationEnd?.slice(0, 10) || '');
    setCertifiedDate(version.certifiedDate?.slice(0, 10) || '');
  }, [version]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (isLoading || !sections) {
    return (
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Spinner size={16} /> Loading version…
      </div>
    );
  }

  if (isError || !version) {
    return <p className="text-sm text-red-600">Failed to load version.</p>;
  }

  const updateSection = (index, patch) => {
    setSections((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const moveSection = (index, direction) => {
    setSections((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const removeSection = (index) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const addSection = () => {
    setSections((prev) => [...prev, { numberingText: '', title: '', blocks: [] }]);
  };

  const handleSaveSections = async (e) => {
    e.preventDefault();
    const payload = sections.map((s, index) => ({
      numbering: parseNumbering(s.numberingText),
      title: s.title,
      order: index,
      blocks: s.blocks.map((b, bi) => ({ type: b.type, data: b.data, order: bi })),
    }));
    await updateSections({ versionId, sections: payload });
  };

  const handleTransition = async (e) => {
    e.preventDefault();
    await transitionVersion({
      versionId,
      status,
      ...(status === 'public_consultation' && {
        consultationStart: consultationStart ? new Date(consultationStart).toISOString() : undefined,
        consultationEnd: consultationEnd ? new Date(consultationEnd).toISOString() : undefined,
      }),
      ...(status === 'certified' && {
        certifiedDate: certifiedDate ? new Date(certifiedDate).toISOString() : undefined,
      }),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href={`/standards/${id}`} className="text-sm text-ink-500 hover:text-ink-900">
          ← Back to standard
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-ink-900">{version.versionNumber}</h1>
          <StatusPill status={version.status} />
        </div>
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-ink-900">Status</h2>
        <form className="flex flex-wrap items-end gap-3" onSubmit={handleTransition}>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink-700">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="rounded-lg border border-surface-border bg-surface-card px-3 py-2 text-sm text-ink-900"
            >
              <option value="draft">Draft</option>
              <option value="public_consultation">Public consultation</option>
              <option value="certified">Certified</option>
            </select>
          </div>

          {status === 'public_consultation' && (
            <>
              <Input
                id="consultationStart"
                label="Consultation start"
                type="date"
                value={consultationStart}
                onChange={(e) => setConsultationStart(e.target.value)}
              />
              <Input
                id="consultationEnd"
                label="Consultation end"
                type="date"
                value={consultationEnd}
                onChange={(e) => setConsultationEnd(e.target.value)}
              />
            </>
          )}

          {status === 'certified' && (
            <Input
              id="certifiedDate"
              label="Certified date"
              type="date"
              value={certifiedDate}
              onChange={(e) => setCertifiedDate(e.target.value)}
            />
          )}

          <Button type="submit" size="sm" disabled={isTransitioning}>
            Update Status
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink-900">Sections</h2>
          <Button type="button" size="sm" variant="outline" onClick={addSection}>
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSaveSections}>
          {sections.length === 0 && (
            <p className="text-sm text-ink-500">No sections yet — add the first one above.</p>
          )}

          {sections.map((section, index) => (
            <div
              key={section._id || index}
              className="flex items-center gap-3 rounded-lg border border-surface-border p-3"
            >
              <input
                value={section.numberingText}
                onChange={(e) => updateSection(index, { numberingText: e.target.value })}
                placeholder="2.1.1"
                className="w-24 rounded-lg border border-surface-border px-2 py-1.5 text-sm font-mono"
              />
              <input
                value={section.title}
                onChange={(e) => updateSection(index, { title: e.target.value })}
                placeholder="Section title"
                className="flex-1 rounded-lg border border-surface-border px-2 py-1.5 text-sm"
              />
              <span className="whitespace-nowrap text-xs text-ink-500">
                {section.blocks.length} block{section.blocks.length === 1 ? '' : 's'}
              </span>
              <button
                type="button"
                onClick={() => moveSection(index, -1)}
                disabled={index === 0}
                className="text-ink-500 hover:text-ink-900 disabled:opacity-30"
                aria-label="Move up"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => moveSection(index, 1)}
                disabled={index === sections.length - 1}
                className="text-ink-500 hover:text-ink-900 disabled:opacity-30"
                aria-label="Move down"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => removeSection(index)}
                className="text-ink-500 hover:text-red-600"
                aria-label="Remove section"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}

          {saveError && <p className="text-sm text-red-600">{saveError.data?.message || 'Failed to save.'}</p>}

          <div>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving…' : 'Save Sections'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
