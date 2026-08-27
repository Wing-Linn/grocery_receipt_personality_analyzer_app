import type {
  GroceryCategory,
  GroceryItem,
  PersonalityDimension,
  PersonalityReport,
} from '@/types';
import { CATEGORY_META } from '@/types';

interface CategoryStats {
  count: number;
  amount: number;
}

function getCategoryStats(items: GroceryItem[]): Record<GroceryCategory, CategoryStats> {
  const stats = {} as Record<GroceryCategory, CategoryStats>;
  (Object.keys(CATEGORY_META) as GroceryCategory[]).forEach((k) => {
    stats[k] = { count: 0, amount: 0 };
  });
  items.forEach((item) => {
    stats[item.category].count += item.quantity;
    stats[item.category].amount += item.price * item.quantity;
  });
  return stats;
}

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

interface Archetype {
  name: string;
  emoji: string;
  description: string;
  advice: string;
}

function pickArchetype(d: Record<string, number>, stats: Record<GroceryCategory, CategoryStats>): Archetype {
  const topCat = (Object.entries(stats) as [GroceryCategory, CategoryStats][])
    .sort((a, b) => b[1].amount - a[1].amount)[0][0];

  if (stats.baby.amount > 50) {
    return {
      name: '超级奶爸/辣妈',
      emoji: '🍼',
      description: '购物车里装满了对家人的爱。奶粉、纸尿裤是主角，偶尔给自己塞一盒牛奶——你已经把"自己"排在了第N位。',
      advice: '别忘了给自己也买点喜欢的东西。照顾好自己，才能更好地照顾TA。',
    };
  }
  if (stats.fresh.amount > 80 && stats.protein.amount > 30 && d.instant < 25) {
    return {
      name: '自律美食家',
      emoji: '🥗',
      description: '你的购物车像一本健康食谱：新鲜蔬果、优质蛋白，几乎看不到加工食品。你大概率会做饭，而且做得还不错。',
      advice: '偶尔放纵一下也没关系，生活需要一点甜。试试给自己买一块好巧克力？',
    };
  }
  if (d.instant > 55 || (stats.instant.count >= 3 && stats.fresh.count <= 1)) {
    return {
      name: '效率至上主义者',
      emoji: '⚡',
      description: '速食、泡面、自热锅——你的购物车写满了"快"字。可能不是不会做饭，而是觉得有更重要的事要做。',
      advice: '忙归忙，身体是革命的本钱。这周试试至少做一顿饭？哪怕只是煎个蛋。',
    };
  }
  if (stats.snacks.amount + stats.dessert.amount > 60 && stats.fresh.amount < 30) {
    return {
      name: '快乐至上派',
      emoji: '🍫',
      description: '薯片、饼干、冰淇淋、巧克力……你的购物车是一场多巴胺派对。你信奉"人生苦短，及时行乐"。',
      advice: '快乐很重要，但血糖也很重要。试着把一半零食换成水果，快乐和健康可以兼得。',
    };
  }
  if (stats.dessert.amount > 40 && stats.drinks.amount > 30) {
    return {
      name: '精致生活家',
      emoji: '✨',
      description: '蛋糕、马卡龙、咖啡豆、气泡水——你的购物车散发着"仪式感"。你买的不是食物，是生活情调。',
      advice: '仪式感很美，但别让账单也仪式感十足。留意一下那些"精致溢价"。',
    };
  }
  if (stats.protein.amount > 80 && stats.fresh.count >= 3) {
    return {
      name: '家庭大厨',
      emoji: '👨‍🍳',
      description: '五花肉、排骨、活虾、蔬菜、大米、油盐酱醋——这是一次认真的"做饭采购"。你大概率在喂一整个家。',
      advice: '大厨辛苦了！下次采购可以列个清单，避免冲动消费，还能省下不少。',
    };
  }
  if (stats.household.amount > 50 && stats.fresh.amount < 30) {
    return {
      name: '囤货达人',
      emoji: '📦',
      description: '洗衣液、抽纸、大米按箱买——你在为未来做打算。实用主义是你的信条，"反正都要用"是你的口头禅。',
      advice: '囤货确实划算，但注意保质期和收纳空间。别让"划算"变成"浪费"。',
    };
  }
  if (topCat === 'drinks' && stats.drinks.amount > 40) {
    return {
      name: '快乐水信徒',
      emoji: '🥤',
      description: '可乐、气泡水、冰红茶、咖啡——你的购物车里液体含量超标。你可能靠饮料续命，或者正在筹备一场派对。',
      advice: '多喝点水吧，真的。无糖气泡水也是不错的过渡选择。',
    };
  }
  return {
    name: '随性购物者',
    emoji: '🛒',
    description: '你的购物车品类丰富，什么都来一点。没有特别的偏好，也没有特别的执念——主打一个随心所欲。',
    advice: '随性挺好，但偶尔给自己定个预算，也许会有惊喜。',
  };
}

function buildDimensions(stats: Record<GroceryCategory, CategoryStats>, total: number, count: number): PersonalityDimension[] {
  const freshAmt = stats.fresh.amount;
  const proteinAmt = stats.protein.amount;
  const snackAmt = stats.snacks.amount + stats.dessert.amount;
  const instantAmt = stats.instant.amount;
  const drinkAmt = stats.drinks.amount;
  const householdAmt = stats.household.amount;
  const babyAmt = stats.baby.amount;

  const healthScore = clamp(50 + (freshAmt + proteinAmt) * 0.8 - snackAmt * 0.6 - instantAmt * 0.5);
  const efficiencyScore = clamp(20 + instantAmt * 1.2 + stats.snacks.count * 4);
  const indulgenceScore = clamp(snackAmt * 1.2 + drinkAmt * 0.5);
  const budgetScore = clamp(100 - (total / Math.max(count, 1)) * 3 - householdAmt * 0.3);
  const familyScore = clamp(babyAmt * 0.5 + householdAmt * 0.4 + proteinAmt * 0.3 + count * 2);
  const ritualScore = clamp(stats.dessert.amount * 1.5 + drinkAmt * 0.6 + freshAmt * 0.2);

  return [
    {
      key: 'health',
      label: '健康指数',
      emoji: '🥬',
      score: Math.round(healthScore),
      description: '生鲜、蛋白质占比越高，这项越高；零食速食会拉低它。',
    },
    {
      key: 'efficiency',
      label: '效率指数',
      emoji: '⚡',
      score: Math.round(efficiencyScore),
      description: '速食和即食食品越多，效率指数越高——你更愿意把时间花在别处。',
    },
    {
      key: 'indulgence',
      label: '享乐指数',
      emoji: '🍫',
      score: Math.round(indulgenceScore),
      description: '零食、甜品、饮料的占比，反映你对"即时快乐"的投入。',
    },
    {
      key: 'budget',
      label: '精打细算',
      emoji: '💰',
      score: Math.round(budgetScore),
      description: '单品均价越低、日用品占比越高，这项越高。',
    },
    {
      key: 'family',
      label: '顾家指数',
      emoji: '🏠',
      score: Math.round(familyScore),
      description: '母婴用品、家庭装日用品和做饭食材越多，这项越高。',
    },
    {
      key: 'ritual',
      label: '仪式感',
      emoji: '✨',
      score: Math.round(ritualScore),
      description: '甜品、精品饮品、进口食材——你对生活品质有追求。',
    },
  ];
}

function buildHighlights(dims: PersonalityDimension[], stats: Record<GroceryCategory, CategoryStats>): string[] {
  const out: string[] = [];
  const sorted = [...dims].sort((a, b) => b.score - a.score);
  const top = sorted[0];
  const bottom = sorted[sorted.length - 1];

  out.push(`你的「${top.label}」高达 ${top.score} 分，${top.emoji} 这是本次购物最鲜明的标签。`);
  if (bottom.score < 35) {
    out.push(`「${bottom.label}」只有 ${bottom.score} 分——也许你压根不在乎这一项，那也挺好的。`);
  }

  const topCat = (Object.entries(stats) as [GroceryCategory, CategoryStats][])
    .sort((a, b) => b[1].amount - a[1].amount)[0];
  if (topCat[1].count > 0) {
    out.push(`花钱最多的品类是${CATEGORY_META[topCat[0]].emoji}「${CATEGORY_META[topCat[0]].label}」，花了 ¥${topCat[1].amount.toFixed(1)}。`);
  }

  const freshCount = stats.fresh.count;
  const snackCount = stats.snacks.count + stats.dessert.count + stats.instant.count;
  if (freshCount > snackCount && freshCount > 0) {
    out.push('生鲜数量超过了零食+速食的总和——你大概率是个会照顾自己的人。');
  } else if (snackCount > freshCount * 2) {
    out.push('零食和速食的数量远超生鲜——今晚的快乐，明天的卡路里。');
  }

  return out;
}

function buildObservations(items: GroceryItem[], stats: Record<GroceryCategory, CategoryStats>, total: number): string[] {
  const out: string[] = [];
  const avg = total / Math.max(items.length, 1);

  if (avg > 40) {
    out.push(`单品均价 ¥${avg.toFixed(1)}，属于"高客单价"购物——你买的不是量，是品质。`);
  } else if (avg < 12) {
    out.push(`单品均价仅 ¥${avg.toFixed(1)}，你是精打细算的高手，每一块钱都花在了刀刃上。`);
  }

  if (stats.drinks.count >= 3) {
    out.push('饮料买了3件以上——冰箱可能已经塞不下了，或者你真的很爱喝。');
  }
  if (stats.household.count >= 3) {
    out.push('日用品买了不少——你正在认真经营一个"家"，而不是随便活着。');
  }
  if (stats.fresh.count === 0) {
    out.push('购物车里没有一样生鲜——蔬菜水果摊对你来说，可能是个陌生的区域。');
  }
  if (stats.protein.count >= 3) {
    out.push('蛋白质来源丰富——肉蛋奶齐全，你大概率是个认真吃饭的人。');
  }

  return out;
}

export function analyzePersonality(
  storeName: string,
  items: GroceryItem[],
): PersonalityReport {
  const stats = getCategoryStats(items);
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  const dims = buildDimensions(stats, total, count);
  const dimMap: Record<string, number> = {};
  dims.forEach((d) => (dimMap[d.key] = d.score));

  const archetype = pickArchetype(dimMap, stats);
  const highlights = buildHighlights(dims, stats);
  const observations = buildObservations(items, stats, total);

  const categoryBreakdown = (Object.entries(stats) as [GroceryCategory, CategoryStats][])
    .map(([category, s]) => ({ category, count: s.count, amount: s.amount }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.amount - a.amount);

  return {
    id: `report-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
    storeName,
    totalAmount: total,
    itemCount: count,
    items,
    dimensions: dims,
    archetype: archetype.name,
    archetypeEmoji: archetype.emoji,
    archetypeDescription: archetype.description,
    highlights,
    observations,
    advice: archetype.advice,
    categoryBreakdown,
  };
}
