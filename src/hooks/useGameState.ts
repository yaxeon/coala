import { useReducer, useCallback } from 'react';
import { LEVELS, INITIAL_LIVES } from '../config/levels';

export type GameScreen =
  | 'menu'
  | 'playing'
  | 'levelComplete'
  | 'timeUp'
  | 'gameOver'
  | 'victory';

export interface LevelResult {
  found: number;
  misses: number;
  timeLeft: number;
  totalTime: number;
  bonusScore: number;
  bonusLife: boolean;
}

export interface GameState {
  screen: GameScreen;
  level: number;
  lives: number;
  score: number;
  levelKoalas: number;
  levelMisses: number;
  gameId: number;
  levelResult: LevelResult | null;
  totalLivesUsed: number;
  perfectLevels: number;
}

type Action =
  | { type: 'START_GAME' }
  | { type: 'FIND_KOALA' }
  | { type: 'MISS' }
  | { type: 'HIT_FIRE' }
  | { type: 'LEVEL_WON'; payload: { timeLeft: number; totalTime: number } }
  | { type: 'TIME_UP' }
  | { type: 'NEXT_LEVEL' }
  | { type: 'RETRY_LEVEL' }
  | { type: 'RETRY_WITH_LIVES' }
  | { type: 'RESTART' };

const initialState: GameState = {
  screen: 'menu',
  level: 1,
  lives: INITIAL_LIVES,
  score: 0,
  levelKoalas: 0,
  levelMisses: 0,
  gameId: 0,
  levelResult: null,
  totalLivesUsed: 0,
  perfectLevels: 0,
};

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...initialState, screen: 'playing', gameId: state.gameId + 1 };

    case 'FIND_KOALA':
      return { ...state, levelKoalas: state.levelKoalas + 1 };

    case 'MISS':
      return { ...state, levelMisses: state.levelMisses + 1 };

    case 'HIT_FIRE': {
      const newLives = state.lives - 1;
      if (newLives <= 0) {
        return {
          ...state,
          lives: 0,
          totalLivesUsed: state.totalLivesUsed + 1,
          screen: 'gameOver',
        };
      }
      return { ...state, lives: newLives, totalLivesUsed: state.totalLivesUsed + 1 };
    }

    case 'LEVEL_WON': {
      const { timeLeft, totalTime } = action.payload;
      const config = LEVELS[state.level - 1];

      let bonusScore = 0;
      if (timeLeft > totalTime / 2) bonusScore += 1;
      const isPerfect = state.levelMisses === 0;
      if (isPerfect) bonusScore += 2;

      let lives = state.lives;
      let bonusLife = false;
      if (config.bonusLife && lives < 5) {
        lives += 1;
        bonusLife = true;
      }

      const screen: GameScreen = state.level >= 20 ? 'victory' : 'levelComplete';

      return {
        ...state,
        screen,
        score: state.score + state.levelKoalas + bonusScore,
        lives,
        perfectLevels: state.perfectLevels + (isPerfect ? 1 : 0),
        levelResult: { found: state.levelKoalas, misses: state.levelMisses, timeLeft, totalTime, bonusScore, bonusLife },
      };
    }

    case 'TIME_UP':
      return { ...state, screen: 'timeUp' };

    case 'NEXT_LEVEL':
      return {
        ...state,
        screen: 'playing',
        level: state.level + 1,
        levelKoalas: 0,
        levelMisses: 0,
        gameId: state.gameId + 1,
        levelResult: null,
      };

    case 'RETRY_LEVEL':
      return {
        ...state,
        screen: 'playing',
        levelKoalas: 0,
        levelMisses: 0,
        gameId: state.gameId + 1,
        levelResult: null,
      };

    case 'RETRY_WITH_LIVES':
      return {
        ...state,
        screen: 'playing',
        lives: INITIAL_LIVES,
        levelKoalas: 0,
        levelMisses: 0,
        gameId: state.gameId + 1,
        levelResult: null,
      };

    case 'RESTART':
      return { ...initialState, gameId: state.gameId + 1 };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    startGame: useCallback(() => dispatch({ type: 'START_GAME' }), []),
    findKoala: useCallback(() => dispatch({ type: 'FIND_KOALA' }), []),
    miss: useCallback(() => dispatch({ type: 'MISS' }), []),
    hitFire: useCallback(() => dispatch({ type: 'HIT_FIRE' }), []),
    levelWon: useCallback(
      (timeLeft: number, totalTime: number) =>
        dispatch({ type: 'LEVEL_WON', payload: { timeLeft, totalTime } }),
      [],
    ),
    timeUp: useCallback(() => dispatch({ type: 'TIME_UP' }), []),
    nextLevel: useCallback(() => dispatch({ type: 'NEXT_LEVEL' }), []),
    retryLevel: useCallback(() => dispatch({ type: 'RETRY_LEVEL' }), []),
    retryWithLives: useCallback(() => dispatch({ type: 'RETRY_WITH_LIVES' }), []),
    restart: useCallback(() => dispatch({ type: 'RESTART' }), []),
  };

  return { ...state, ...actions };
}
