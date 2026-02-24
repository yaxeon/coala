import backImg from '@assets/back.png';

interface Props {
  bestScore: number;
  bestLevel: number;
  onStart: () => void;
}

export default function MainMenu({ bestScore, bestLevel, onStart }: Props) {
  return (
    <div className="menu">
      <div className="menu__content">
        <img src={backImg} alt="Wilds of Australia" className="menu__logo" />
        <h1 className="menu__title">Save the Koalas!</h1>
        <p className="menu__subtitle">
          Memorize where the koalas hide and save them from the fire
        </p>
        <button className="btn btn--primary btn--large" onClick={onStart}>
          Start Game
        </button>
        {bestScore > 0 && (
          <div className="menu__stats">
            <p>Best score: {bestScore} 🐨</p>
            <p>Best level: {bestLevel}</p>
          </div>
        )}
      </div>
    </div>
  );
}
