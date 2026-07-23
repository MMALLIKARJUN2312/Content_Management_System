'use client';

import { useEffect, useRef } from 'react';
import { X, Star } from 'lucide-react';
import Card from './ui/Card';
import Spinner from './ui/Spinner';

export default function FeedbackPanel({ feedback, isLoading, isError, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;

      // Minimal focus trap: cycle within the panel's focusable elements.
      const panel = document.querySelector('[role="dialog"]');
      const focusable = panel?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-panel-title"
        className="w-full max-w-md p-6"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="feedback-panel-title" className="text-lg font-semibold text-ink-900">
            Public Consultation Feedback
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="text-ink-500 hover:text-ink-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-ink-500" role="status">
            <Spinner size={16} /> Loading feedback…
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-600" role="alert">
            Unable to load feedback right now. Please try again shortly.
          </p>
        )}

        {!isLoading && !isError && feedback && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-2xl font-semibold text-ink-900">
                <Star className="h-5 w-5 fill-brand-500 text-brand-500" aria-hidden="true" />
                {feedback.averageScore?.toFixed(1) ?? '—'}
                <span className="sr-only"> out of 5 average score</span>
              </div>
              <p className="text-sm text-ink-500">{feedback.totalResponses} responses</p>
            </div>

            <div className="flex flex-col gap-3">
              {(feedback.comments || []).map((comment, i) => (
                <div key={i} className="rounded-lg border border-ink-100 p-3">
                  <div className="flex items-center justify-between text-xs text-ink-500">
                    <span>{comment.author}</span>
                    {comment.score && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-brand-500 text-brand-500" aria-hidden="true" />
                        {comment.score}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-700">{comment.comment}</p>
                </div>
              ))}
              {(!feedback.comments || feedback.comments.length === 0) && (
                <p className="text-sm text-ink-500">No comments yet.</p>
              )}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
