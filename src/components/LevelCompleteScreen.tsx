import Overlay from './Overlay';
import type { LevelResult } from '../hooks/useGameState';

interface Props {
  level: number;
  levelResult: LevelResult | null;
  score: number;
  lives: number;
  onNext: () => void;
}

export default function LevelCompleteScreen({
  level,
  levelResult,
  score,
  lives,
  onNext,
}: Props) {
  if (!levelResult) return null;

  const { found, misses, timeLeft, totalTime, bonusScore, bonusLife } = levelResult;
  const timeUsed = totalTime - timeLeft;

  return (
    <Overlay variant="success">
      <h2 className="overlay__title">Level {level} Complete!</h2>

      <div className="overlay__stats">
        <div className="overlay__stat">
          <span className="overlay__stat-label">Koalas Saved</span>
          <span className="overlay__stat-value">{found} 🐨</span>
        </div>
        <div className="overlay__stat">
          <span className="overlay__stat-label">Misses</span>
          <span className="overlay__stat-value">{misses}</span>
        </div>
        <div className="overlay__stat">
          <span className="overlay__stat-label">Time</span>
          <span className="overlay__stat-value">
            {Math.floor(timeUsed / 60)}:{String(timeUsed % 60).padStart(2, '0')}
          </span>
        </div>
      </div>

      {bonusScore > 0 && (
        <div className="overlay__bonuses">
          {timeLeft > totalTime / 2 && (
            <div className="overlay__bonus">⚡ Speed bonus: +1 koala</div>
          )}
          {misses === 0 && (
            <div className="overlay__bonus">✨ Perfect level: +2 koalas</div>
          )}
        </div>
      )}

      {bonusLife && (
        <div className="overlay__bonus overlay__bonus--life">
          💚 Bonus life! (❤️ {lives})
        </div>
      )}

      <div className="overlay__total">
        Total score: <strong>{score}</strong> 🐨
      </div>

      <button className="btn btn--primary" onClick={onNext}>
        Next Level
      </button>
    </Overlay>
  );
}
