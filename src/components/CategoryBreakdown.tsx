import type { PersonalityReport } from '@/types';
import { CATEGORY_META } from '@/types';

interface Props {
  report: PersonalityReport;
}

export function CategoryBreakdown({ report }: Props) {
  const maxAmount = Math.max(...report.categoryBreakdown.map((c) => c.amount), 1);

  return (
    <div className="space-y-3">
      {report.categoryBreakdown.map((c, idx) => {
        const meta = CATEGORY_META[c.category];
        const pct = (c.amount / maxAmount) * 100;
        return (
          <div
            key={c.category}
            className="flex items-center gap-3 animate-floatUp"
            style={{ animationDelay: `${idx * 60}ms` }}
          >
            <span className="text-xl w-7 text-center">{meta.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-ink-700">{meta.label}</span>
                <span className="text-xs text-ink-400 tabular-nums">
                  {c.count}件 · ¥{c.amount.toFixed(1)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: meta.color,
                    transitionDelay: `${idx * 60 + 100}ms`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
