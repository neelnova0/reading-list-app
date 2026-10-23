import { useState } from 'react';
import { Plus } from 'lucide-react';
import { STATUS_META, STATUS_ORDER, type ReadingStatus } from '@/types';

interface AddBookFormProps {
  onAdd: (title: string, status: ReadingStatus) => 'added' | 'duplicate';
}

export function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ReadingStatus>('want-to-read');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) {
      setError('Please enter a book title.');
      return;
    }
    if (trimmed.length > 60) {
      setError('Book title must be 60 characters or fewer.');
      return;
    }
    if (onAdd(trimmed, status) === 'duplicate') {
      setError('This book is already in your reading list.');
      return;
    }
    setTitle('');
    setError('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        <div className="flex-1">
          <label htmlFor="book-title" className="sr-only">
            Book title
          </label>
          <input
            id="book-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter a book title…"
            aria-describedby={error ? 'book-title-error' : undefined}
            className="w-full rounded-xl border border-stone-300 bg-stone-50 px-4 py-2.5 text-sm text-stone-800 placeholder:text-stone-400 focus:border-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-stone-300/40"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ReadingStatus)}
            className={`rounded-xl border border-stone-300 bg-stone-50 px-3 py-2.5 text-sm font-medium text-stone-700 focus:outline-none focus:ring-2 ${STATUS_META[status].ring}`}
          >
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-stone-800 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-500/40 active:bg-stone-950"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add Book</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
      {error && (
        <p id="book-title-error" className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}
