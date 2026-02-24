import Overlay from './Overlay';

interface Props {
  score: number;
  perfectLevels: number;
  totalLivesUsed: number;
  onRestart: () => void;
}

export default function VictoryScreen({
  score,
  perfectLevels,
  totalLivesUsed,
  onRestart,
}: Props) {
  return (
    <Overlay variant="victory">
      <h2 className="overlay__title">🎉 Australia is Saved!</h2>
      <p className="overlay__message">
        You completed all 20 levels and saved every koala!
      </p>

      <div className="overlay__stats">
        <div className="overlay__stat">
          <span className="overlay__stat-label">Total Saved</span>
          <span className="overlay__stat-value">{score} 🐨</span>
        </div>
        <div className="overlay__stat">
          <span className="overlay__stat-label">Perfect Levels</span>
          <span className="overlay__stat-value">{perfectLevels} ✨</span>
        </div>
        <div className="overlay__stat">
          <span className="overlay__stat-label">Lives Lost</span>
          <span className="overlay__stat-value">{totalLivesUsed} 💔</span>
        </div>
      </div>

      <button className="btn btn--primary btn--large" onClick={onRestart}>
        Play Again
      </button>
    </Overlay>
  );
}
