'use client';

import { useState } from 'react';
import { ArrowUp, Link2 } from 'lucide-react';
import Badge from './ui/Badge';
import Container from './Container';
import Spinner from './ui/Spinner';
import TocSidebar from './TocSidebar';
import VersionDropdown from './VersionDropdown';
import FeedbackPanel from './FeedbackPanel';
import BlockRenderer from './blocks/BlockRenderer';
import { getJSON } from '@/lib/api';

export default function StandardDetailClient({ standard, versions, initialVersion }) {
  const [currentVersion, setCurrentVersion] = useState(initialVersion);
  const [loadingVersion, setLoadingVersion] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [feedbackVersionId, setFeedbackVersionId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  const handleSelectVersion = async (versionId) => {
    if (versionId === currentVersion?._id) return;
    setLoadingVersion(true);
    const data = await getJSON(`/standards/${standard.slug}/versions/${versionId}`);
    setCurrentVersion(data?.version || null);
    setLoadingVersion(false);
  };

  const handleViewFeedback = async (versionId) => {
    setFeedbackVersionId(versionId);
    setFeedbackLoading(true);
    const data = await getJSON(`/standards/${standard.slug}/versions/${versionId}/feedback`);
    setFeedback(data?.feedback || null);
    setFeedbackLoading(false);
  };

  const handleNavigate = (id) => {
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const copySectionLink = (id) => {
    const url = `${window.location.origin}${window.location.pathname}#${id}`;
    navigator.clipboard?.writeText(url);
  };

  const sortedSections = [...(currentVersion?.sections || [])].sort((a, b) => a.order - b.order);

  return (
    <main className="flex-1">
      <Container className="flex flex-col gap-8 py-16">
        <div className="flex flex-col gap-3">
          <Badge tone="brand">✓ Standards</Badge>
          <h1 className="font-display text-5xl italic text-ink-900">{standard.title}</h1>
          <p className="max-w-2xl text-ink-500">{standard.summary}</p>
        </div>

        {!currentVersion && (
          <p className="text-sm text-ink-500">No published version available yet.</p>
        )}

        {currentVersion && (
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
            <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
              <VersionDropdown
                versions={versions}
                currentVersionId={currentVersion._id}
                onSelect={handleSelectVersion}
                onViewFeedback={handleViewFeedback}
              />
              <TocSidebar sections={sortedSections} activeId={activeId} onNavigate={handleNavigate} />
            </aside>

            <div className="flex flex-col gap-10">
              {loadingVersion && (
                <div className="flex items-center gap-2 text-sm text-ink-500">
                  <Spinner size={16} /> Loading version…
                </div>
              )}

              {!loadingVersion &&
                sortedSections.map((section) => {
                  const id = `section-${section.numbering.join('-')}`;
                  return (
                    <section key={section._id || id} id={id} className="scroll-mt-24">
                      <div className="mb-3 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-ink-900">
                          {section.numbering.join('.')} {section.title}
                        </h2>
                        <button
                          type="button"
                          onClick={() => copySectionLink(id)}
                          className="text-ink-400 hover:text-brand-600"
                          title="Copy link to this section"
                          aria-label="Copy link to this section"
                        >
                          <Link2 className="h-4 w-4" />
                        </button>
                      </div>
                      <BlockRenderer blocks={[...section.blocks].sort((a, b) => a.order - b.order)} />
                    </section>
                  );
                })}
            </div>
          </div>
        )}
      </Container>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full border border-ink-300 bg-surface-card text-ink-500 shadow-lg hover:text-ink-900"
        aria-label="Back to top"
      >
        <ArrowUp className="h-4 w-4" />
      </button>

      {feedbackVersionId && (
        <FeedbackPanel
          feedback={feedback}
          isLoading={feedbackLoading}
          onClose={() => {
            setFeedbackVersionId(null);
            setFeedback(null);
          }}
        />
      )}
    </main>
  );
}
