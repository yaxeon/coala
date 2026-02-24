import { useState, useCallback } from 'react';

const STORAGE_KEY = 'wilds-of-australia';

interface StorageData {
  bestScore: number;
  bestLevel: number;
}

function loadData(): StorageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { bestScore: 0, bestLevel: 0 };
    return JSON.parse(raw) as StorageData;
  } catch {
    return { bestScore: 0, bestLevel: 0 };
  }
}

function saveData(data: StorageData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable */
  }
}

export function useStorage() {
  const [data, setData] = useState<StorageData>(loadData);

  const updateBest = useCallback((score: number, level: number) => {
    setData((prev) => {
      const next: StorageData = {
        bestScore: Math.max(prev.bestScore, score),
        bestLevel: Math.max(prev.bestLevel, level),
      };
      saveData(next);
      return next;
    });
  }, []);

  return { bestScore: data.bestScore, bestLevel: data.bestLevel, updateBest };
}
