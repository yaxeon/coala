import Card from './Card';
import { GRID_COLS } from '../config/levels';
import type { CardType, CardState } from '../hooks/useBoard';

interface Props {
  boardTypes: CardType[];
  cardStates: CardState[];
  showAll: boolean;
  isFlipping: boolean;
  disabled: boolean;
  onCardClick: (index: number) => void;
}

export default function GameBoard({
  boardTypes,
  cardStates,
  showAll,
  isFlipping,
  disabled,
  onCardClick,
}: Props) {
  if (!boardTypes.length) return null;

  return (
    <div className="board" style={{ '--cols': GRID_COLS } as React.CSSProperties}>
      {boardTypes.map((type, index) => (
        <Card
          key={index}
          index={index}
          type={type}
          state={cardStates[index]}
          showAll={showAll}
          isFlipping={isFlipping}
          disabled={disabled}
          onClick={onCardClick}
        />
      ))}
    </div>
  );
}
