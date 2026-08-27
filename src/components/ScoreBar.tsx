import type { PersonalityDimension } from '@/types';

interface Props {
  dimension: PersonalityDimension;
  index: number;
}

export function ScoreBar({ dimension, index }: Props) {
  const pct = dimension.score;
  const barColor =
    pct >= 70 ? '#22c55e' : pct >= 40 ? '#ff7a0f' : '#f87171';

  return (
    <div
      className="animate-floatUp"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-700 flex items-center gap-1.5">
          <span className="text-base">{dimension.emoji}</span>
          {dimension.label}
        </span>
        <span
          className="text-sm font-bold tabular-nums"
          style={{ color: barColor }}
        >
          {pct}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: barColor,
            transitionDelay: `${index * 80 + 100}ms`,
          }}
        />
      </div>
      <p className="text-xs text-ink-400 mt-1 leading-relaxed">{dimension.description}</p>
    </div>
  );
}
