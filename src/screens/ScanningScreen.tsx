import { useEffect, useState } from 'react';
import { ScanLine, Check } from 'lucide-react';

interface Props {
  imageUrl: string;
  onDone: () => void;
}

const STEPS = [
  '正在检测小票边缘…',
  '识别文字区域…',
  '提取商品名称…',
  '解析价格信息…',
  '整理购物清单…',
];

export function ScanningScreen({ imageUrl, onDone }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length - 1) {
          clearInterval(interval);
          setTimeout(onDone, 600);
          return s;
        }
        return s + 1;
      });
    }, 900);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Receipt preview with scan line */}
        <div className="relative rounded-2xl overflow-hidden shadow-card bg-ink-900 mb-6">
          <img
            src={imageUrl}
            alt="小票预览"
            className="w-full max-h-[420px] object-contain opacity-90"
          />
          {/* Scan line */}
          <div className="absolute inset-x-0 top-0 h-[3px] bg-accent-400 shadow-[0_0_20px_4px_rgba(255,122,15,0.6)] animate-scan" />
          {/* Corner brackets */}
          <div className="absolute top-3 left-3 w-8 h-8 border-l-2 border-t-2 border-accent-400 rounded-tl-lg" />
          <div className="absolute top-3 right-3 w-8 h-8 border-r-2 border-t-2 border-accent-400 rounded-tr-lg" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-l-2 border-b-2 border-accent-400 rounded-bl-lg" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-r-2 border-b-2 border-accent-400 rounded-br-lg" />
        </div>

        {/* Steps */}
        <div className="space-y-2.5">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <div
                key={i}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  i <= step ? 'opacity-100' : 'opacity-30'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    done
                      ? 'bg-fresh-500 text-white'
                      : active
                        ? 'bg-accent-500 text-white'
                        : 'bg-ink-100 text-ink-300'
                  }`}
                >
                  {done ? (
                    <Check className="w-3.5 h-3.5" strokeWidth={3} />
                  ) : active ? (
                    <ScanLine className="w-3.5 h-3.5 animate-pulse" />
                  ) : (
                    <span className="text-xs font-bold">{i + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm transition-colors ${
                    active ? 'text-ink-800 font-medium' : done ? 'text-ink-500' : 'text-ink-300'
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
