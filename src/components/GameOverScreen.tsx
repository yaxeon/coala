import Overlay from './Overlay';

interface Props {
  score: number;
  level: number;
  onRestart: () => void;
  onRetry: () => void;
}

export default function GameOverScreen({ score, level, onRestart, onRetry }: Props) {
  return (
    <Overlay variant="danger">
      <h2 className="overlay__title">Game Over</h2>
      <p className="overlay__message">The fire destroyed the forest...</p>

      <div className="overlay__stats">
        <div className="overlay__stat">
          <span className="overlay__stat-label">Koalas Saved</span>
          <span className="overlay__stat-value">{score} 🐨</span>
        </div>
        <div className="overlay__stat">
          <span className="overlay__stat-label">Level Reached</span>
          <span className="overlay__stat-value">{level}</span>
        </div>
      </div>

      <div className="overlay__actions">
        <button className="btn btn--primary" onClick={onRetry}>
          Retry Level
        </button>
        <button className="btn btn--secondary" onClick={onRestart}>
          Start Over
        </button>
      </div>
    </Overlay>
  );
}
