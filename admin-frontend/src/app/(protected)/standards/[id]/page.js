'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import {
  useGetStandardVersionsQuery,
  useCreateVersionMutation,
  useDeleteStandardMutation,
} from '@/store/api/standardsApi';
import StandardIcon from '@/components/StandardIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import StatusPill from '@/components/ui/StatusPill';
import Spinner from '@/components/ui/Spinner';

export default function StandardDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading, isError } = useGetStandardVersionsQuery(id);
  const [createVersion, { isLoading: isCreatingVersion }] = useCreateVersionMutation();
  const [deleteStandard, { isLoading: isDeleting }] = useDeleteStandardMutation();
  const [versionNumber, setVersionNumber] = useState('');

  const handleCreateVersion = async (e) => {
    e.preventDefault();
    if (!versionNumber.trim()) return;
    const result = await createVersion({ standardId: id, versionNumber: versionNumber.trim() });
    if (result.data) {
      setVersionNumber('');
      router.push(`/standards/${id}/versions/${result.data.data.version._id}`);
    }
  };

  const handleDeleteStandard = async () => {
    if (!data) return;
    if (!window.confirm(`Delete "${data.standard.title}"? This also deletes all of its versions.`)) return;
    const result = await deleteStandard(id);
    if (!result.error) router.push('/standards');
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-ink-500">
        <Spinner size={16} /> Loading standard…
      </div>
    );
  }

  if (isError || !data) {
    return <p className="text-sm text-red-600">Failed to load standard.</p>;
  }

  const { standard, versions } = data;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <StandardIcon icon={standard.icon} className="mt-1 h-6 w-6 text-brand-600" />
          <div>
            <h1 className="text-2xl font-semibold text-ink-900">{standard.title}</h1>
            <p className="text-sm text-ink-500">/{standard.slug}</p>
            <p className="mt-2 max-w-xl text-sm text-ink-700">{standard.summary}</p>
          </div>
        </div>
        <Button variant="danger" size="sm" onClick={handleDeleteStandard} disabled={isDeleting}>
          Delete Standard
        </Button>
      </div>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold text-ink-900">Versions</h2>

        {versions.length === 0 && (
          <p className="mb-4 text-sm text-ink-500">No versions yet — create the first one below.</p>
        )}

        <div className="flex flex-col gap-2">
          {versions.map((version) => (
            <Link
              key={version._id}
              href={`/standards/${id}/versions/${version._id}`}
              className="flex items-center justify-between rounded-lg border border-surface-border px-4 py-3 hover:bg-ink-100/40"
            >
              <span className="font-medium text-ink-900">{version.versionNumber}</span>
              <StatusPill status={version.status} />
            </Link>
          ))}
        </div>

        <form className="mt-4 flex items-end gap-3 border-t border-surface-border pt-4" onSubmit={handleCreateVersion}>
          <Input
            id="versionNumber"
            label="New version number"
            placeholder="e.g. v1.1.0"
            value={versionNumber}
            onChange={(e) => setVersionNumber(e.target.value)}
            className="max-w-xs"
          />
          <Button type="submit" size="sm" disabled={isCreatingVersion}>
            <Plus className="h-4 w-4" />
            Add Version
          </Button>
        </form>
      </Card>
    </div>
  );
}
