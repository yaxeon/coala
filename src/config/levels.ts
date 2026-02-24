export type Difficulty =
  | 'Rookie'
  | 'Easy'
  | 'Medium'
  | 'Hard'
  | 'Extreme'
  | 'Insane'
  | 'Impossible';

export interface LevelConfig {
  level: number;
  koalas: number;
  showTime: number;
  fireChance: number;
  timeLimit: number;
  bonusLife: boolean;
  name: string;
  difficulty: Difficulty;
}

export const LEVELS: LevelConfig[] = [
  { level: 1,  koalas: 3,  showTime: 2.0, fireChance: 0.20, timeLimit: 60,  bonusLife: false, name: 'First Steps',         difficulty: 'Rookie' },
  { level: 2,  koalas: 3,  showTime: 2.0, fireChance: 0.25, timeLimit: 55,  bonusLife: false, name: 'Recon',               difficulty: 'Rookie' },
  { level: 3,  koalas: 4,  showTime: 2.0, fireChance: 0.25, timeLimit: 55,  bonusLife: false, name: 'More Friends',        difficulty: 'Rookie' },
  { level: 4,  koalas: 4,  showTime: 1.5, fireChance: 0.30, timeLimit: 50,  bonusLife: false, name: 'Rising Heat',         difficulty: 'Easy' },
  { level: 5,  koalas: 4,  showTime: 1.5, fireChance: 0.35, timeLimit: 50,  bonusLife: true,  name: 'Eucalyptus Forest',   difficulty: 'Easy' },
  { level: 6,  koalas: 5,  showTime: 1.5, fireChance: 0.40, timeLimit: 45,  bonusLife: false, name: 'Dry Season',          difficulty: 'Easy' },
  { level: 7,  koalas: 5,  showTime: 1.5, fireChance: 0.40, timeLimit: 45,  bonusLife: false, name: 'Call of the Wild',    difficulty: 'Medium' },
  { level: 8,  koalas: 5,  showTime: 1.0, fireChance: 0.45, timeLimit: 40,  bonusLife: false, name: 'Smoke on the Horizon', difficulty: 'Medium' },
  { level: 9,  koalas: 6,  showTime: 1.0, fireChance: 0.45, timeLimit: 40,  bonusLife: false, name: 'In the Thick of It',  difficulty: 'Medium' },
  { level: 10, koalas: 6,  showTime: 2.0, fireChance: 0.45, timeLimit: 35,  bonusLife: true,  name: 'Fire Line',           difficulty: 'Medium' },
  { level: 11, koalas: 7,  showTime: 2.0, fireChance: 0.50, timeLimit: 35,  bonusLife: false, name: 'Red Zone',            difficulty: 'Hard' },
  { level: 12, koalas: 7,  showTime: 2.0, fireChance: 0.50, timeLimit: 32,  bonusLife: false, name: 'Ring of Fire',        difficulty: 'Hard' },
  { level: 13, koalas: 8,  showTime: 2.0, fireChance: 0.50, timeLimit: 30,  bonusLife: false, name: 'Ash Trail',           difficulty: 'Hard' },
  { level: 14, koalas: 8,  showTime: 2.0, fireChance: 0.50, timeLimit: 28,  bonusLife: false, name: 'Trial by Fire',       difficulty: 'Extreme' },
  { level: 15, koalas: 9,  showTime: 2.5, fireChance: 0.60, timeLimit: 28,  bonusLife: true,  name: 'Wall of Fire',        difficulty: 'Extreme' },
  { level: 16, koalas: 9,  showTime: 2.5, fireChance: 0.60, timeLimit: 25,  bonusLife: false, name: 'Inferno',             difficulty: 'Extreme' },
  { level: 17, koalas: 9,  showTime: 2.5, fireChance: 0.60, timeLimit: 23,  bonusLife: false, name: 'Hellfire',            difficulty: 'Insane' },
  { level: 18, koalas: 10, showTime: 1.5, fireChance: 0.65, timeLimit: 22,  bonusLife: false, name: 'Last Stand',          difficulty: 'Insane' },
  { level: 19, koalas: 10, showTime: 1.5, fireChance: 0.67, timeLimit: 20,  bonusLife: false, name: 'Scorched Earth',      difficulty: 'Insane' },
  { level: 20, koalas: 10, showTime: 1.0, fireChance: 0.70, timeLimit: 18,  bonusLife: false, name: 'Saving Australia',    difficulty: 'Impossible' },
];

export const GRID_SIZE = 20;
export const GRID_COLS = 4;
export const MAX_LIVES = 5;
export const INITIAL_LIVES = 3;
export const FLIP_DURATION = 600;
export const TREE_SHOW_DURATION = 1000;
export const FIRE_SHOW_DURATION = 1500;
