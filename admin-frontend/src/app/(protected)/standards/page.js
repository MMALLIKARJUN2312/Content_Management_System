'use client';

import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';
import { useGetAdminStandardsQuery, useDeleteStandardMutation } from '@/store/api/standardsApi';
import StandardIcon from '@/components/StandardIcon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';

export default function AdminStandardsPage() {
  const { data: standards, isLoading, isError } = useGetAdminStandardsQuery();
  const [deleteStandard, { isLoading: isDeleting }] = useDeleteStandardMutation();

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This also deletes all of its versions.`)) return;
    await deleteStandard(id);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">Standards</h1>
          <p className="text-sm text-ink-500">Manage the content behind the public Standards section.</p>
        </div>
        <Button as={Link} href="/standards/new">
          <Plus className="h-4 w-4" />
          New Standard
        </Button>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <Spinner size={16} /> Loading standards…
        </div>
      )}

      {isError && <p className="text-sm text-red-600">Failed to load standards.</p>}

      {standards && standards.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-500">
          No standards yet. Create your first one.
        </Card>
      )}

      {standards && standards.length > 0 && (
        <Card className="overflow-hidden p-0">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-surface-border bg-ink-100/40 text-ink-500">
              <tr>
                <th className="px-4 py-3 font-medium">Standard</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Versions</th>
                <th className="px-4 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {standards.map((standard) => {
                return (
                  <tr key={standard._id} className="border-b border-surface-border last:border-0">
                    <td className="px-4 py-3">
                      <Link
                        href={`/standards/${standard._id}`}
                        className="flex items-center gap-2 font-medium text-ink-900 hover:text-brand-600"
                      >
                        <StandardIcon icon={standard.icon} className="h-4 w-4 text-brand-600" />
                        {standard.title}
                      </Link>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-ink-500">{standard.slug}</td>
                    <td className="px-4 py-3 text-ink-700">{standard.versionCount}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        disabled={isDeleting}
                        onClick={() => handleDelete(standard._id, standard.title)}
                        className="text-ink-500 hover:text-red-600 disabled:opacity-50"
                        aria-label={`Delete ${standard.title}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
