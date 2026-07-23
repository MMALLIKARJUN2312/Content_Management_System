'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { ICON_OPTIONS } from '@/lib/icons';
import StandardIcon from '@/components/StandardIcon';
import { useCreateStandardMutation } from '@/store/api/standardsApi';

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function NewStandardPage() {
  const router = useRouter();
  const [createStandard, { isLoading, error }] = useCreateStandardMutation();
  const [form, setForm] = useState({ title: '', slug: '', icon: 'Leaf', summary: '' });
  const [slugTouched, setSlugTouched] = useState(false);

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({ ...prev, title, slug: slugTouched ? prev.slug : slugify(title) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await createStandard(form);
    if (result.data) {
      router.push(`/standards/${result.data.data.standard._id}`);
    }
  };

  const errorMessage = error?.data?.message;
  const fieldErrors = error?.data?.details || {};

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">New Standard</h1>
        <p className="text-sm text-ink-500">Create a new standard shown on the public Standards page.</p>
      </div>

      <Card className="max-w-xl p-6">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            id="title"
            label="Title"
            placeholder="e.g. EV"
            value={form.title}
            onChange={handleTitleChange}
            required
          />
          <Input
            id="slug"
            label="Slug"
            placeholder="e.g. ev"
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm((prev) => ({ ...prev, slug: e.target.value }));
            }}
            error={fieldErrors.slug?.[0]}
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-ink-700">Icon</label>
            <div className="flex gap-2">
              {ICON_OPTIONS.map((name) => {
                const selected = form.icon === name;
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, icon: name }))}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg border transition-colors ${
                      selected
                        ? 'border-brand-500 bg-brand-50 text-brand-600'
                        : 'border-surface-border text-ink-500 hover:bg-ink-100'
                    }`}
                    aria-label={name}
                    aria-pressed={selected}
                  >
                    <StandardIcon icon={name} className="h-4 w-4" />
                  </button>
                );
              })}
            </div>
          </div>

          <Textarea
            id="summary"
            label="Summary"
            placeholder="Short description shown on the standard's card"
            rows={4}
            value={form.summary}
            onChange={(e) => setForm((prev) => ({ ...prev, summary: e.target.value }))}
            error={fieldErrors.summary?.[0]}
            required
          />

          {errorMessage && !Object.keys(fieldErrors).length && (
            <p className="text-sm text-red-600">{errorMessage}</p>
          )}

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating…' : 'Create Standard'}
            </Button>
            <Button as="a" href="/standards" variant="ghost">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
