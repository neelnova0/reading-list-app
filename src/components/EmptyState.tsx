import { BookOpenText } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-white/60 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-300">
        <BookOpenText className="h-7 w-7" />
      </div>
      <p className="text-lg font-medium text-stone-700">
        Your reading list is empty. Add your first book.
      </p>
    </div>
  );
}
