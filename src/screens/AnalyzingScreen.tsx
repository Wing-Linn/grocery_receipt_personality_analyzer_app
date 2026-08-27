import { useEffect, useState } from 'react';
import { Brain, TrendingUp, Palette, MessageSquareText } from 'lucide-react';

interface Props {
  onDone: () => void;
}

const PHASES = [
  { icon: Brain, label: '分析消费结构', color: 'text-accent-500' },
  { icon: TrendingUp, label: '计算人格维度', color: 'text-fresh-500' },
  { icon: Palette, label: '匹配人格原型', color: 'text-pink-500' },
  { icon: MessageSquareText, label: '生成专属报告', color: 'text-blue-500' },
];

export function AnalyzingScreen({ onDone }: Props) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => {
        if (p >= PHASES.length - 1) {
          clearInterval(interval);
          setTimeout(onDone, 700);
          return p;
        }
        return p + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      {/* Animated brain */}
      <div className="relative mb-10">
        <div className="absolute inset-0 rounded-full bg-accent-400/20 animate-pulseRing" />
        <div className="absolute inset-0 rounded-full bg-accent-400/10 animate-pulseRing" style={{ animationDelay: '0.4s' }} />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center shadow-pop">
          <Brain className="w-12 h-12 text-white animate-wiggle" strokeWidth={1.5} />
        </div>
      </div>

      <h2 className="font-display text-2xl text-ink-800 mb-2">正在分析你的购物人格…</h2>
      <p className="text-sm text-ink-400 mb-8">AI 正在阅读你的购物车</p>

      {/* Phase progress */}
      <div className="w-full max-w-xs space-y-3">
        {PHASES.map((p, i) => {
          const Icon = p.icon;
          const done = i < phase;
          const active = i === phase;
          return (
            <div
              key={i}
              className={`flex items-center gap-3 transition-all duration-400 ${
                i <= phase ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  done ? 'bg-fresh-100' : active ? 'bg-accent-50 scale-110' : 'bg-ink-100'
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors ${done ? 'text-fresh-600' : active ? p.color : 'text-ink-300'}`}
                  strokeWidth={active ? 2.5 : 2}
                />
              </div>
              <span
                className={`text-sm transition-colors ${
                  active ? 'text-ink-800 font-semibold' : done ? 'text-ink-500' : 'text-ink-300'
                }`}
              >
                {p.label}
                {active && <span className="inline-block w-1 ml-1 animate-pulse">▋</span>}
              </span>
            </div>
          );
        })}
      </div>

      {/* Loading bar */}
      <div className="w-full max-w-xs mt-8 h-1.5 rounded-full bg-ink-100 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent-400 to-accent-600 rounded-full transition-all duration-800 ease-out"
          style={{ width: `${((phase + 1) / PHASES.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
