'use client';

import { X, Star } from 'lucide-react';
import Card from './ui/Card';
import Spinner from './ui/Spinner';

export default function FeedbackPanel({ feedback, isLoading, isError, onClose }) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
      <Card className="w-full max-w-md p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink-900">Public Consultation Feedback</h2>
          <button type="button" onClick={onClose} className="text-ink-500 hover:text-ink-900" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-ink-500">
            <Spinner size={16} /> Loading feedback…
          </div>
        )}

        {isError && (
          <p className="text-sm text-red-600">Unable to load feedback right now. Please try again shortly.</p>
        )}

        {!isLoading && !isError && feedback && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-2xl font-semibold text-ink-900">
                <Star className="h-5 w-5 fill-brand-500 text-brand-500" />
                {feedback.averageScore?.toFixed(1) ?? '—'}
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
                        <Star className="h-3 w-3 fill-brand-500 text-brand-500" />
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
