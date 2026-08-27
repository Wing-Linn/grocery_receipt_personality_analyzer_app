import { useState } from 'react';
import { ChevronLeft, Trash2, Calendar, ShoppingBag } from 'lucide-react';
import type { PersonalityReport } from '@/types';

interface Props {
  history: PersonalityReport[];
  onBack: () => void;
  onOpenReport: (report: PersonalityReport) => void;
  onDelete: (id: string) => void;
}

function formatDate(ts: number): string {
  const d = new Date(ts);
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const h = d.getHours().toString().padStart(2, '0');
  const m = d.getMinutes().toString().padStart(2, '0');
  return `${month}月${day}日 ${h}:${m}`;
}

export function HistoryScreen({ history, onBack, onOpenReport, onDelete }: Props) {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center gap-3 px-4 py-3 bg-paper-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-ink-100">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink-100 transition-colors tap-highlight-none"
        >
          <ChevronLeft className="w-5 h-5 text-ink-600" />
        </button>
        <h1 className="font-display text-lg text-ink-800">历史报告</h1>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-4 space-y-3">
        {history.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag className="w-12 h-12 text-ink-200 mb-3" strokeWidth={1.5} />
            <p className="text-sm text-ink-400">还没有分析记录</p>
            <p className="text-xs text-ink-300 mt-1">上传一张小票开始第一次分析</p>
          </div>
        )}

        {history.map((report, idx) => (
          <div
            key={report.id}
            className="receipt-paper receipt-edge rounded-2xl shadow-receipt p-4 animate-floatUp"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onOpenReport(report)}
                className="flex-1 flex items-start gap-3 text-left tap-highlight-none"
              >
                <div className="text-3xl shrink-0">{report.archetypeEmoji}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base text-ink-800 truncate">{report.archetype}</h3>
                  <div className="flex items-center gap-2 text-xs text-ink-400 mt-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(report.createdAt)}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-ink-500">
                    <span>{report.storeName}</span>
                    <span>·</span>
                    <span>{report.itemCount}件</span>
                    <span>·</span>
                    <span className="tabular-nums">¥{report.totalAmount.toFixed(1)}</span>
                  </div>
                </div>
              </button>
              {confirmDelete === report.id ? (
                <div className="flex gap-1 shrink-0">
                  <button
                    onClick={() => {
                      onDelete(report.id);
                      setConfirmDelete(null);
                    }}
                    className="px-2 py-1 rounded-lg bg-danger-500 text-white text-xs tap-highlight-none"
                  >
                    删除
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="px-2 py-1 rounded-lg bg-ink-100 text-ink-500 text-xs tap-highlight-none"
                  >
                    取消
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(report.id)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-ink-300 hover:text-danger-500 hover:bg-danger-50 transition-colors shrink-0 tap-highlight-none"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mini dimension chips */}
            <div className="flex gap-1.5 flex-wrap mt-3">
              {report.dimensions.map((d) => (
                <span
                  key={d.key}
                  className="px-2 py-0.5 rounded-full text-xs bg-paper-100 text-ink-500"
                >
                  {d.emoji} {d.score}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
