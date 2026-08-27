import { useRef, useState } from 'react';
import {
  ChevronLeft,
  Share2,
  Download,
  Home,
  Lightbulb,
  Eye,
  TrendingUp,
} from 'lucide-react';
import type { PersonalityReport } from '@/types';
import { RadarChart } from '@/components/RadarChart';
import { ScoreBar } from '@/components/ScoreBar';
import { CategoryBreakdown } from '@/components/CategoryBreakdown';

interface Props {
  report: PersonalityReport;
  onBack: () => void;
  onHome: () => void;
}

export function ReportScreen({ report, onBack, onHome }: Props) {
  const [showShareCard, setShowShareCard] = useState(false);
  const shareCardRef = useRef<HTMLDivElement>(null);

  function handleShare() {
    setShowShareCard(true);
  }

  function handleDownload() {
    // For now, just trigger share which shows the card
    handleShare();
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-paper-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-ink-100">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink-100 transition-colors tap-highlight-none"
        >
          <ChevronLeft className="w-5 h-5 text-ink-600" />
        </button>
        <h1 className="font-display text-base text-ink-700">人格分析报告</h1>
        <button
          onClick={handleShare}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-accent-50 transition-colors tap-highlight-none"
        >
          <Share2 className="w-5 h-5 text-accent-500" />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-5 space-y-5">
        {/* Archetype card */}
        <div className="receipt-paper receipt-edge rounded-2xl shadow-card p-6 text-center animate-floatUp">
          <p className="text-xs text-ink-400 mb-1">{report.storeName} · {report.itemCount}件商品 · ¥{report.totalAmount.toFixed(1)}</p>
          <div className="text-6xl mb-3">{report.archetypeEmoji}</div>
          <h2 className="font-display text-2xl text-ink-800 mb-3">{report.archetype}</h2>
          <p className="text-sm text-ink-500 leading-relaxed text-balance">{report.archetypeDescription}</p>
        </div>

        {/* Radar chart */}
        <div className="bg-white rounded-2xl shadow-receipt p-5 animate-floatUp" style={{ animationDelay: '100ms' }}>
          <h3 className="text-sm font-semibold text-ink-700 mb-3 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent-500" />
            人格维度雷达
          </h3>
          <RadarChart dimensions={report.dimensions} />
        </div>

        {/* Score bars */}
        <div className="bg-white rounded-2xl shadow-receipt p-5 space-y-4">
          <h3 className="text-sm font-semibold text-ink-700 mb-1">六维评分</h3>
          {report.dimensions.map((d, i) => (
            <ScoreBar key={d.key} dimension={d} index={i} />
          ))}
        </div>

        {/* Highlights */}
        {report.highlights.length > 0 && (
          <div className="bg-white rounded-2xl shadow-receipt p-5">
            <h3 className="text-sm font-semibold text-ink-700 mb-3 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-accent-500" />
              AI 的一手观察
            </h3>
            <ul className="space-y-2.5">
              {report.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-600 leading-relaxed">
                  <span className="text-accent-400 shrink-0 mt-0.5">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Observations */}
        {report.observations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-receipt p-5">
            <h3 className="text-sm font-semibold text-ink-700 mb-3">更多细节</h3>
            <ul className="space-y-2.5">
              {report.observations.map((o, i) => (
                <li key={i} className="flex gap-2 text-sm text-ink-600 leading-relaxed">
                  <span className="text-ink-300 shrink-0 mt-0.5">·</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Category breakdown */}
        <div className="bg-white rounded-2xl shadow-receipt p-5">
          <h3 className="text-sm font-semibold text-ink-700 mb-3">消费品类分布</h3>
          <CategoryBreakdown report={report} />
        </div>

        {/* Advice */}
        <div className="rounded-2xl bg-gradient-to-br from-accent-50 to-accent-100 p-5 border border-accent-200">
          <h3 className="text-sm font-semibold text-accent-700 mb-2 flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4" />
            AI 的一点小建议
          </h3>
          <p className="text-sm text-ink-600 leading-relaxed">{report.advice}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pb-2">
          <button
            onClick={onHome}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white text-ink-600 font-medium shadow-receipt hover:bg-paper-50 transition-colors tap-highlight-none"
          >
            <Home className="w-5 h-5" />
            再测一次
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-accent-500 text-white font-semibold shadow-pop hover:bg-accent-600 active:scale-[0.98] transition-all tap-highlight-none"
          >
            <Download className="w-5 h-5" />
            保存卡片
          </button>
        </div>
      </div>

      {/* Share Card Modal */}
      {showShareCard && (
        <ShareCardModal
          report={report}
          cardRef={shareCardRef}
          onClose={() => setShowShareCard(false)}
        />
      )}
    </div>
  );
}

function ShareCardModal({
  report,
  cardRef,
  onClose,
}: {
  report: PersonalityReport;
  cardRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-floatUp">
      <div className="w-full max-w-sm">
        <div ref={cardRef} className="receipt-paper receipt-edge rounded-3xl shadow-2xl overflow-hidden">
          {/* Top banner */}
          <div className="bg-gradient-to-br from-accent-500 to-accent-600 px-6 pt-6 pb-8 text-white text-center">
            <p className="text-xs text-accent-100 mb-1">超市小票分析器</p>
            <p className="font-display text-lg">我的购物人格</p>
          </div>

          {/* Body */}
          <div className="px-6 py-6 text-center">
            <div className="text-5xl mb-2">{report.archetypeEmoji}</div>
            <h2 className="font-display text-xl text-ink-800 mb-1">{report.archetype}</h2>
            <p className="text-xs text-ink-400 mb-5">
              {report.storeName} · {report.itemCount}件 · ¥{report.totalAmount.toFixed(1)}
            </p>

            {/* Mini scores */}
            <div className="grid grid-cols-3 gap-2 mb-5">
              {report.dimensions.slice(0, 6).map((d) => (
                <div key={d.key} className="bg-paper-100 rounded-xl py-2">
                  <div className="text-lg">{d.emoji}</div>
                  <div className="text-xs text-ink-400 mt-0.5">{d.label}</div>
                  <div className="font-bold text-ink-700 text-sm">{d.score}</div>
                </div>
              ))}
            </div>

            {/* Top highlight */}
            {report.highlights[0] && (
              <p className="text-xs text-ink-500 leading-relaxed bg-paper-100 rounded-xl p-3 text-left">
                {report.highlights[0]}
              </p>
            )}

            <p className="text-xs text-ink-300 mt-4">扫码测测你的购物人格 →</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-2xl bg-white/20 text-white font-medium backdrop-blur-sm tap-highlight-none"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
