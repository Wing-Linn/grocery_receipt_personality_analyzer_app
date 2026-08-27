import type { GroceryCategory, GroceryItem } from '@/types';

interface MockItemSeed {
  name: string;
  price: number;
  category: GroceryCategory;
}

const MOCK_RECEIPTS: MockItemSeed[][] = [
  [
    { name: '有机菠菜 250g', price: 8.8, category: 'fresh' },
    { name: '进口香蕉 1kg', price: 12.9, category: 'fresh' },
    { name: '蓝莓 125g', price: 19.9, category: 'fresh' },
    { name: '牛油果 2个', price: 15.8, category: 'fresh' },
    { name: '有机鸡蛋 10枚', price: 18.8, category: 'protein' },
    { name: '希腊酸奶 4杯', price: 25.9, category: 'protein' },
    { name: '全麦面包 1袋', price: 12.0, category: 'staple' },
    { name: '气泡水 330ml×6', price: 19.9, category: 'drinks' },
  ],
  [
    { name: '可乐 2L', price: 12.5, category: 'drinks' },
    { name: '乐事薯片 大包', price: 9.9, category: 'snacks' },
    { name: '奥利奥饼干', price: 11.5, category: 'snacks' },
    { name: '卫龙辣条', price: 6.9, category: 'snacks' },
    { name: '自热火锅 1盒', price: 19.9, category: 'instant' },
    { name: '泡面 5连包', price: 12.9, category: 'instant' },
    { name: '火腿肠 1袋', price: 9.9, category: 'protein' },
    { name: '冰红茶 1L', price: 5.5, category: 'drinks' },
  ],
  [
    { name: '五花肉 500g', price: 32.8, category: 'protein' },
    { name: '肋排 400g', price: 45.0, category: 'protein' },
    { name: '活虾 300g', price: 39.9, category: 'protein' },
    { name: '番茄 500g', price: 6.9, category: 'fresh' },
    { name: '土豆 1kg', price: 4.5, category: 'fresh' },
    { name: '大蒜 1头', price: 2.5, category: 'fresh' },
    { name: '东北大米 5kg', price: 39.9, category: 'staple' },
    { name: '金龙鱼油 2L', price: 29.9, category: 'staple' },
    { name: '生抽 500ml', price: 8.9, category: 'household' },
    { name: '抽纸 10包', price: 19.9, category: 'household' },
  ],
  [
    { name: '进口牛奶 1L', price: 22.9, category: 'protein' },
    { name: '婴儿奶粉 3段', price: 289.0, category: 'baby' },
    { name: '纸尿裤 L码', price: 89.9, category: 'baby' },
    { name: '婴儿湿巾 80片', price: 15.9, category: 'baby' },
    { name: '苹果 1kg', price: 9.9, category: 'fresh' },
    { name: '西蓝花 1颗', price: 5.9, category: 'fresh' },
    { name: '鸡胸肉 500g', price: 19.9, category: 'protein' },
    { name: '洗衣液 2kg', price: 29.9, category: 'household' },
  ],
  [
    { name: '蛋糕卷 1盒', price: 28.0, category: 'dessert' },
    { name: '马卡龙 6枚', price: 38.0, category: 'dessert' },
    { name: '冰淇淋 1L', price: 19.9, category: 'dessert' },
    { name: '咖啡豆 250g', price: 68.0, category: 'drinks' },
    { name: '气泡水 750ml', price: 8.8, category: 'drinks' },
    { name: '巧克力礼盒', price: 88.0, category: 'snacks' },
    { name: '牛排 200g', price: 58.0, category: 'protein' },
    { name: '车厘子 500g', price: 59.9, category: 'fresh' },
  ],
  [
    { name: '方便面 1箱', price: 49.9, category: 'instant' },
    { name: '速冻水饺 1袋', price: 19.9, category: 'instant' },
    { name: '速冻包子 1袋', price: 12.9, category: 'instant' },
    { name: '火腿肠 1箱', price: 39.9, category: 'protein' },
    { name: '可乐 1箱', price: 45.0, category: 'drinks' },
    { name: '抽纸 1箱', price: 49.9, category: 'household' },
    { name: '洗洁精 1瓶', price: 12.9, category: 'household' },
    { name: '大米 10kg', price: 59.9, category: 'staple' },
  ],
];

const STORE_NAMES = ['永辉超市', '盒马鲜生', '大润发', '沃尔玛', '山姆会员店', '联华超市', '华润万家', 'Costco开市客'];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export interface OcrResult {
  storeName: string;
  items: GroceryItem[];
}

export function mockOcrRecognize(): OcrResult {
  const baseList = pick(MOCK_RECEIPTS);
  const shuffled = shuffle(baseList);
  const count = Math.min(shuffled.length, 5 + Math.floor(Math.random() * 4));
  const items: GroceryItem[] = shuffled.slice(0, count).map((seed, idx) => ({
    id: `item-${idx}-${Math.random().toString(36).slice(2, 8)}`,
    name: seed.name,
    price: seed.price,
    quantity: 1,
    category: seed.category,
  }));

  return {
    storeName: pick(STORE_NAMES),
    items,
  };
}
