import { useState } from 'react';
import { Trash2, ChevronDown, BookOpen } from 'lucide-react';
import {
  STATUS_META,
  STATUS_ORDER,
  type Book,
  type ReadingStatus,
} from '@/types';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: ReadingStatus) => void;
  onRemove: (id: string) => void;
}

export function BookCard({ book, onStatusChange, onRemove }: BookCardProps) {
  const [open, setOpen] = useState(false);
  const meta = STATUS_META[book.status];

  return (
    <div className="group relative flex flex-col gap-3 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-stone-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-stone-400">
            <BookOpen className="h-5 w-5" />
          </div>
          <h3 className="text-base font-semibold leading-snug text-stone-800">
            {book.title}
          </h3>
        </div>
        <button
          onClick={() => onRemove(book.id)}
          aria-label={`Delete ${book.title}`}
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-stone-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-300/40"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 ${meta.color} ${meta.ring}`}
        >
          <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
          {meta.label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          />
        </button>

        {open && (
          <div className="absolute left-0 top-full z-10 mt-1.5 w-44 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
            {STATUS_ORDER.map((s) => (
              <button
                key={s}
                onClick={() => {
                  onStatusChange(book.id, s);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-stone-50 ${
                  s === book.status
                    ? 'font-semibold text-stone-900'
                    : 'text-stone-600'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${STATUS_META[s].dot}`}
                />
                {STATUS_META[s].label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
