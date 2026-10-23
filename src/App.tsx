import { useMemo, useState } from 'react';
import { Library } from 'lucide-react';
import { useReadingList } from '@/hooks/useReadingList';
import { AddBookForm } from '@/components/AddBookForm';
import { FilterTabs } from '@/components/FilterTabs';
import { BookCard } from '@/components/BookCard';
import { EmptyState } from '@/components/EmptyState';
import {
  FILTER_TABS,
  STATUS_ORDER,
  type FilterKey,
  type ReadingStatus,
} from '@/types';

function App() {
  const { books, addBook, updateStatus, removeBook } = useReadingList();
  const [filter, setFilter] = useState<FilterKey>('all');

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: books.length };
    for (const s of STATUS_ORDER) {
      c[s] = books.filter((b) => b.status === s).length;
    }
    return c;
  }, [books]);

  const visibleBooks = useMemo(() => {
    if (filter === 'all') return books;
    return books.filter((b) => b.status === (filter as ReadingStatus));
  }, [books, filter]);

  const hasBooks = books.length > 0;
  const filterMatches = visibleBooks.length > 0;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-stone-800 text-white">
            <Library className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
              Reading List
            </h1>
            <p className="text-sm text-stone-500">
              Track books you want to read, are reading, and have finished.
            </p>
          </div>
        </header>

        {/* Add form */}
        <div className="mb-6">
          <AddBookForm onAdd={addBook} />
        </div>

        {/* Filters + content */}
        {hasBooks ? (
          <>
            <div className="mb-6">
              <FilterTabs
                active={filter}
                counts={counts}
                onChange={setFilter}
              />
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4 border-y border-stone-200 py-4 text-sm text-stone-500">
              <span className="font-medium text-stone-700">
                Total Books: {counts.all}
              </span>
              <span>Currently Reading: {counts.reading}</span>
              <span>Finished: {counts.finished}</span>
            </div>

            {filterMatches ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {visibleBooks.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={updateStatus}
                    onRemove={removeBook}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
                <p className="text-lg font-medium text-stone-700">
                  No books in "{FILTER_TABS.find((t) => t.key === filter)?.label}".
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Switch filters or add a new book to get started.
                </p>
              </div>
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

export default App;
