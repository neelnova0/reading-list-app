import { FILTER_TABS, type FilterKey } from '@/types';

interface FilterTabsProps {
  active: FilterKey;
  counts: Record<string, number>;
  onChange: (key: FilterKey) => void;
}

export function FilterTabs({ active, counts, onChange }: FilterTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTER_TABS.map((tab) => {
        const isActive = active === tab.key;
        const count = counts[tab.key] ?? 0;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400/40 ${
              isActive
                ? 'bg-stone-800 text-white'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'bg-stone-100 text-stone-500'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
