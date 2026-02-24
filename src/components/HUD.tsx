import { formatTime } from '../utils/formatTime';
import { MAX_LIVES, type Difficulty } from '../config/levels';

interface Props {
  lives: number;
  level: number;
  levelName: string;
  difficulty: Difficulty;
  score: number;
  timeLeft: number;
  isWarning: boolean;
  isCritical: boolean;
  showTimer: boolean;
  foundKoalas: number;
  totalKoalas: number;
  onReset: () => void;
}

export default function HUD({
  lives,
  level,
  levelName,
  difficulty,
  score,
  timeLeft,
  isWarning,
  isCritical,
  showTimer,
  foundKoalas,
  totalKoalas,
  onReset,
}: Props) {
  const timerClass = [
    'hud__val',
    isWarning && 'hud__val--warning',
    isCritical && 'hud__val--critical',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="hud">
      <div className="hud__row hud__row--top">
        <div className="hud__cell">
          <span className="hud__label">LEVEL</span>
          <span className="hud__val hud__val--level">
            {String(level).padStart(2, '0')}
          </span>
        </div>
        <div className="hud__cell hud__cell--lives">
          {Array.from({ length: MAX_LIVES }, (_, i) => (
            <span
              key={i}
              className={i < lives ? 'hud__heart--on' : 'hud__heart--off'}
            >
              ♥
            </span>
          ))}
        </div>
        <div className="hud__cell">
          <span className={`hud__badge hud__badge--${difficulty}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="hud__row hud__row--bottom">
        <div className="hud__cell">
          <span className="hud__label">TIME</span>
          <span className={timerClass}>
            {showTimer ? formatTime(timeLeft) : '--:--'}
          </span>
        </div>
        <div className="hud__cell">
          <span className="hud__label">SAVE</span>
          <span className="hud__val hud__val--save">
            {foundKoalas}/{totalKoalas}
          </span>
        </div>
        <div className="hud__cell">
          <span className="hud__label">SCORE</span>
          <span className="hud__val hud__val--score">
            {String(score).padStart(3, '0')}
          </span>
        </div>
      </div>

      <div className="hud__footer">
        <span className="hud__name">{levelName}</span>
        <button className="hud__reset" onClick={onReset}>RESET</button>
      </div>
    </div>
  );
}
