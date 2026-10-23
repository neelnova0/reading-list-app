import { useCallback, useEffect, useState } from 'react';
import type { Book, ReadingStatus } from '@/types';

const STORAGE_KEY = 'reading-list:books';

function normalizeTitle(title: string): string {
  return title.trim().replace(/\s+/g, ' ').toLowerCase();
}

function loadBooks(): Book[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (b): b is Book =>
        b &&
        typeof b.id === 'string' &&
        typeof b.title === 'string' &&
        typeof b.status === 'string' &&
        typeof b.addedAt === 'number'
    );
  } catch {
    return [];
  }
}

export function useReadingList() {
  const [books, setBooks] = useState<Book[]>(() => loadBooks());

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch {
      /* storage may be unavailable – silently ignore */
    }
  }, [books]);

  const addBook = useCallback(
    (title: string, status: ReadingStatus): 'added' | 'duplicate' => {
      const trimmed = title.trim();
      const normalizedTitle = normalizeTitle(trimmed);
      if (books.some((book) => normalizeTitle(book.title) === normalizedTitle)) {
        return 'duplicate';
      }

      setBooks((prev) => [
        {
          id:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          title: trimmed,
          status,
          addedAt: Date.now(),
        },
        ...prev,
      ]);
      return 'added';
    },
    [books]
  );

  const updateStatus = useCallback((id: string, status: ReadingStatus) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  }, []);

  const removeBook = useCallback((id: string) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { books, addBook, updateStatus, removeBook };
}
