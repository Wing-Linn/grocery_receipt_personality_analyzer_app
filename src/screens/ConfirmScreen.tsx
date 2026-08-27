import { useState } from 'react';
import { Plus, Trash2, ChevronLeft, ArrowRight, Store, Pencil } from 'lucide-react';
import type { GroceryCategory, GroceryItem } from '@/types';
import { CATEGORY_META } from '@/types';

interface Props {
  storeName: string;
  items: GroceryItem[];
  onBack: () => void;
  onConfirm: (storeName: string, items: GroceryItem[]) => void;
}

const CATEGORIES = Object.values(CATEGORY_META);

export function ConfirmScreen({ storeName, items: initialItems, onBack, onConfirm }: Props) {
  const [store, setStore] = useState(storeName);
  const [items, setItems] = useState<GroceryItem[]>(initialItems);
  const [editingId, setEditingId] = useState<string | null>(null);

  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  function updateItem(id: string, patch: Partial<GroceryItem>) {
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }

  function deleteItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function addItem() {
    const newItem: GroceryItem = {
      id: `new-${Date.now()}`,
      name: '',
      price: 0,
      quantity: 1,
      category: 'other',
    };
    setItems((prev) => [...prev, newItem]);
    setEditingId(newItem.id);
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 bg-paper-50/80 backdrop-blur-sm sticky top-0 z-10 border-b border-ink-100">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-ink-100 transition-colors tap-highlight-none"
        >
          <ChevronLeft className="w-5 h-5 text-ink-600" />
        </button>
        <h1 className="font-display text-lg text-ink-800">确认购物清单</h1>
      </header>

      <div className="flex-1 px-4 py-4 overflow-y-auto scrollbar-thin">
        {/* Store name */}
        <div className="flex items-center gap-2 mb-4 px-1">
          <Store className="w-4 h-4 text-accent-500" />
          <input
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder="超市名称"
            className="flex-1 bg-transparent text-sm font-medium text-ink-700 outline-none border-b border-transparent focus:border-accent-400 transition-colors py-1"
          />
        </div>

        {/* Items list */}
        <div className="receipt-paper receipt-edge rounded-2xl shadow-receipt p-4 space-y-2">
          {items.length === 0 && (
            <p className="text-center text-sm text-ink-300 py-8">清单为空，点下方添加商品</p>
          )}
          {items.map((item) => {
            const isEditing = editingId === item.id || item.name === '';
            const meta = CATEGORY_META[item.category];
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 py-2 border-b border-dashed border-ink-100 last:border-0"
              >
                {isEditing ? (
                  <ItemEditRow
                    item={item}
                    onUpdate={(patch) => updateItem(item.id, patch)}
                    onDone={() => setEditingId(null)}
                  />
                ) : (
                  <>
                    <span className="text-lg w-7 text-center shrink-0">{meta.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-ink-700 truncate">{item.name}</p>
                      <p className="text-xs text-ink-400">
                        {meta.label} · ×{item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-ink-700 tabular-nums shrink-0">
                      ¥{(item.price * item.quantity).toFixed(1)}
                    </span>
                    <button
                      onClick={() => setEditingId(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-ink-300 hover:text-accent-500 hover:bg-accent-50 transition-colors tap-highlight-none"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="w-7 h-7 rounded-full flex items-center justify-center text-ink-300 hover:text-danger-500 hover:bg-danger-50 transition-colors tap-highlight-none"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>
            );
          })}
          <button
            onClick={addItem}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm text-accent-600 hover:bg-accent-50 rounded-lg transition-colors tap-highlight-none"
          >
            <Plus className="w-4 h-4" />
            添加商品
          </button>
        </div>

        {/* Total */}
        <div className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-ink-800 text-paper-50">
          <span className="text-sm text-ink-100">共 {items.length} 件商品</span>
          <span className="font-display text-xl">¥{total.toFixed(1)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-4 bg-paper-50/80 backdrop-blur-sm border-t border-ink-100">
        <button
          onClick={() => onConfirm(store, items.filter((i) => i.name.trim() !== ''))}
          disabled={items.filter((i) => i.name.trim() !== '').length === 0}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-accent-500 text-white font-semibold shadow-pop hover:bg-accent-600 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed tap-highlight-none"
        >
          开始分析人格
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ItemEditRow({
  item,
  onUpdate,
  onDone,
}: {
  item: GroceryItem;
  onUpdate: (patch: Partial<GroceryItem>) => void;
  onDone: () => void;
}) {
  return (
    <div className="flex-1 space-y-2">
      <div className="flex gap-2">
        <input
          value={item.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          onBlur={onDone}
          autoFocus
          placeholder="商品名称"
          className="flex-1 text-sm bg-paper-100 rounded-lg px-3 py-1.5 outline-none focus:ring-2 ring-accent-400"
        />
        <input
          type="number"
          value={item.price || ''}
          onChange={(e) => onUpdate({ price: parseFloat(e.target.value) || 0 })}
          placeholder="价格"
          className="w-20 text-sm bg-paper-100 rounded-lg px-3 py-1.5 outline-none focus:ring-2 ring-accent-400 tabular-nums"
        />
        <input
          type="number"
          value={item.quantity}
          min={1}
          onChange={(e) => onUpdate({ quantity: parseInt(e.target.value) || 1 })}
          className="w-12 text-sm bg-paper-100 rounded-lg px-2 py-1.5 outline-none focus:ring-2 ring-accent-400 tabular-nums text-center"
        />
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            onClick={() => onUpdate({ category: c.key as GroceryCategory })}
            className={`px-2 py-0.5 rounded-full text-xs transition-all tap-highlight-none ${
              item.category === c.key
                ? 'bg-ink-800 text-paper-50'
                : 'bg-ink-100 text-ink-400'
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
