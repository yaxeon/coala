import { useState, useRef, useCallback, useEffect } from 'react';
import { shuffle } from '../utils/shuffle';
import { GRID_SIZE, TREE_SHOW_DURATION, FIRE_SHOW_DURATION } from '../config/levels';

export type CardType = 'koala' | 'tree';
export type CardState = 'idle' | 'found' | 'tempTree' | 'tempFire';
export type ClickResult = 'koala' | 'tree' | 'fire' | null;

export function useBoard() {
  const [boardTypes, setBoardTypes] = useState<CardType[]>([]);
  const [cardStates, setCardStates] = useState<CardState[]>([]);
  const typesRef = useRef<CardType[]>([]);
  const busyRef = useRef(new Set<number>());
  const timeoutsRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const generate = useCallback((koalaCount: number) => {
    Object.values(timeoutsRef.current).forEach(clearTimeout);
    timeoutsRef.current = {};
    busyRef.current.clear();

    const types: CardType[] = [];
    for (let i = 0; i < koalaCount; i++) types.push('koala');
    for (let i = koalaCount; i < GRID_SIZE; i++) types.push('tree');
    const shuffled = shuffle(types);

    typesRef.current = shuffled;
    setBoardTypes(shuffled);
    setCardStates(Array(GRID_SIZE).fill('idle'));
  }, []);

  const handleClick = useCallback((index: number, fireChance: number): ClickResult => {
    if (busyRef.current.has(index)) return null;

    const type = typesRef.current[index];

    if (type === 'koala') {
      busyRef.current.add(index);
      setCardStates((prev) => {
        if (prev[index] !== 'idle') return prev;
        const next = [...prev];
        next[index] = 'found';
        return next;
      });
      return 'koala';
    }

    busyRef.current.add(index);
    const isFire = Math.random() < fireChance;
    const newState: CardState = isFire ? 'tempFire' : 'tempTree';

    setCardStates((prev) => {
      const next = [...prev];
      next[index] = newState;
      return next;
    });

    const delay = isFire ? FIRE_SHOW_DURATION : TREE_SHOW_DURATION;

    if (timeoutsRef.current[index]) clearTimeout(timeoutsRef.current[index]);
    timeoutsRef.current[index] = setTimeout(() => {
      setCardStates((prev) => {
        const next = [...prev];
        if (next[index] === 'tempTree' || next[index] === 'tempFire') {
          next[index] = 'idle';
        }
        return next;
      });
      busyRef.current.delete(index);
      delete timeoutsRef.current[index];
    }, delay);

    return isFire ? 'fire' : 'tree';
  }, []);

  const cleanup = useCallback(() => {
    Object.values(timeoutsRef.current).forEach(clearTimeout);
    timeoutsRef.current = {};
    busyRef.current.clear();
  }, []);

  useEffect(() => cleanup, [cleanup]);

  return { boardTypes, cardStates, generate, handleClick, cleanup };
}
