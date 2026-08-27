export type Screen = 'landing' | 'scanning' | 'confirm' | 'analyzing' | 'report' | 'history';

export interface GroceryItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: GroceryCategory;
}

export type GroceryCategory =
  | 'fresh'
  | 'protein'
  | 'snacks'
  | 'drinks'
  | 'staple'
  | 'household'
  | 'instant'
  | 'dessert'
  | 'baby'
  | 'other';

export interface CategoryMeta {
  key: GroceryCategory;
  label: string;
  emoji: string;
  color: string;
}

export interface PersonalityDimension {
  key: string;
  label: string;
  emoji: string;
  score: number; // 0-100
  description: string;
}

export interface PersonalityReport {
  id: string;
  createdAt: number;
  storeName: string;
  totalAmount: number;
  itemCount: number;
  items: GroceryItem[];
  dimensions: PersonalityDimension[];
  archetype: string;
  archetypeEmoji: string;
  archetypeDescription: string;
  highlights: string[];
  observations: string[];
  advice: string;
  categoryBreakdown: { category: GroceryCategory; count: number; amount: number }[];
}

export const CATEGORY_META: Record<GroceryCategory, CategoryMeta> = {
  fresh: { key: 'fresh', label: '生鲜果蔬', emoji: '🥬', color: '#22c55e' },
  protein: { key: 'protein', label: '肉蛋奶', emoji: '🥩', color: '#ef4444' },
  snacks: { key: 'snacks', label: '零食', emoji: '🍫', color: '#f59e0b' },
  drinks: { key: 'drinks', label: '饮品', emoji: '🥤', color: '#3b82f6' },
  staple: { key: 'staple', label: '主食粮油', emoji: '🍚', color: '#d97706' },
  household: { key: 'household', label: '日用', emoji: '🧻', color: '#6b7280' },
  instant: { key: 'instant', label: '速食', emoji: '🍜', color: '#ec4899' },
  dessert: { key: 'dessert', label: '甜品糕点', emoji: '🍰', color: '#f97316' },
  baby: { key: 'baby', label: '母婴', emoji: '🍼', color: '#a855f7' },
  other: { key: 'other', label: '其他', emoji: '📦', color: '#78716c' },
};
