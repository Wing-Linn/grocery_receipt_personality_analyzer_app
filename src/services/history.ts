import type { PersonalityReport } from '@/types';

const KEY = 'receipt-personality-history';
const MAX = 50;

export function loadHistory(): PersonalityReport[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as PersonalityReport[];
    return Array.isArray(arr) ? arr.sort((a, b) => b.createdAt - a.createdAt) : [];
  } catch {
    return [];
  }
}

export function saveReport(report: PersonalityReport): PersonalityReport[] {
  const history = loadHistory();
  history.unshift(report);
  const trimmed = history.slice(0, MAX);
  try {
    localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    // storage full or unavailable — silently ignore
  }
  return trimmed;
}

export function deleteReport(id: string): PersonalityReport[] {
  const history = loadHistory().filter((r) => r.id !== id);
  try {
    localStorage.setItem(KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
  return history;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
