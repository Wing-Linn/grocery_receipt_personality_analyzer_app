import { useRef, useState } from 'react';
import { Upload, ImagePlus, Sparkles, History, ShoppingBag } from 'lucide-react';

interface Props {
  onImageSelected: (file: File) => void;
  onShowHistory: () => void;
  historyCount: number;
}

export function LandingScreen({ onImageSelected, onShowHistory, historyCount }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function handleFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith('image/')) return;
    onImageSelected(file);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-6 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-accent-500 flex items-center justify-center shadow-pop">
            <ShoppingBag className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="font-display text-lg text-ink-800">小票读心术</span>
        </div>
        {historyCount > 0 && (
          <button
            onClick={onShowHistory}
            className="flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700 transition-colors tap-highlight-none"
          >
            <History className="w-4 h-4" />
            历史 ({historyCount})
          </button>
        )}
      </header>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="text-center mb-8 animate-floatUp">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            AI 购物人格分析
          </div>
          <h1 className="font-display text-3xl text-ink-800 mb-3 leading-tight text-balance">
            你的购物车<br />暴露了什么？
          </h1>
          <p className="text-sm text-ink-500 leading-relaxed max-w-xs mx-auto">
            上传一张超市小票，AI 不只告诉你买了什么，<br />还要大胆猜猜你是一个什么样的人。
          </p>
        </div>

        {/* Upload zone */}
        <div
          className={`w-full max-w-sm transition-all ${dragging ? 'scale-[1.02]' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            handleFile(e.dataTransfer.files[0]);
          }}
        >
          <button
            onClick={() => inputRef.current?.click()}
            className="w-full receipt-paper receipt-edge rounded-2xl p-8 shadow-receipt border-2 border-dashed border-ink-200 hover:border-accent-400 hover:shadow-card transition-all duration-300 tap-highlight-none group"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-accent-50 flex items-center justify-center group-hover:bg-accent-100 transition-colors">
                  <ImagePlus className="w-9 h-9 text-accent-500 group-hover:scale-110 transition-transform" strokeWidth={1.8} />
                </div>
                <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-fresh-500 flex items-center justify-center shadow-pop">
                  <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
                </div>
              </div>
              <div className="text-center">
                <p className="text-base font-semibold text-ink-700 mb-1">上传小票照片</p>
                <p className="text-xs text-ink-400">点击拍照或从相册选择 · 支持 JPG/PNG</p>
              </div>
            </div>
          </button>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {/* Feature bullets */}
        <div className="mt-8 w-full max-w-sm space-y-2.5">
          {[
            { emoji: '🔍', text: '智能识别小票商品和价格' },
            { emoji: '🧠', text: '6大维度分析你的购物人格' },
            { emoji: '📊', text: '生成可分享的人格卡片' },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/60 backdrop-blur-sm animate-floatUp"
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <span className="text-lg">{f.emoji}</span>
              <span className="text-sm text-ink-600">{f.text}</span>
            </div>
          ))}
        </div>
      </div>

      <footer className="px-6 pb-6 text-center">
        <p className="text-xs text-ink-300">仅供娱乐 · AI 分析结果不代表真实人格判断</p>
      </footer>
    </div>
  );
}
