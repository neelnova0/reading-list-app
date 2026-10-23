export type ReadingStatus = 'want-to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  status: ReadingStatus;
  addedAt: number;
}

export const STATUS_META: Record<
  ReadingStatus,
  { label: string; short: string; color: string; ring: string; dot: string }
> = {
  'want-to-read': {
    label: 'Want to Read',
    short: 'Want to Read',
    color: 'bg-amber-100 text-amber-800 border-amber-300',
    ring: 'focus-visible:ring-amber-400',
    dot: 'bg-amber-500',
  },
  reading: {
    label: 'Reading',
    short: 'Reading',
    color: 'bg-sky-100 text-sky-800 border-sky-300',
    ring: 'focus-visible:ring-sky-400',
    dot: 'bg-sky-500',
  },
  finished: {
    label: 'Finished',
    short: 'Finished',
    color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    ring: 'focus-visible:ring-emerald-400',
    dot: 'bg-emerald-500',
  },
};

export const STATUS_ORDER: ReadingStatus[] = ['want-to-read', 'reading', 'finished'];

export const FILTER_TABS = [
  { key: 'all', label: 'All' },
  { key: 'want-to-read', label: 'Want to Read' },
  { key: 'reading', label: 'Reading' },
  { key: 'finished', label: 'Finished' },
] as const;

export type FilterKey = (typeof FILTER_TABS)[number]['key'];
