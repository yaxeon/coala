import { memo, useCallback, useRef } from 'react';
import backImg from '@assets/back.png';
import koalaImg from '@assets/coala.png';
import treeImg from '@assets/tree.png';
import fireImg from '@assets/fire.png';
import type { CardType, CardState } from '../hooks/useBoard';

const CARD_IMAGES: Record<string, string> = {
  koala: koalaImg,
  tree: treeImg,
  fire: fireImg,
};

function getCardFace(
  type: CardType,
  state: CardState,
  showAll: boolean,
): string | null {
  if (state === 'found') return 'koala';
  if (state === 'tempTree') return 'tree';
  if (state === 'tempFire') return 'fire';
  if (showAll) return type;
  return null;
}

interface Props {
  index: number;
  type: CardType;
  state: CardState;
  showAll: boolean;
  isFlipping: boolean;
  disabled: boolean;
  onClick: (index: number) => void;
}

function Card({ index, type, state, showAll, isFlipping, disabled, onClick }: Props) {
  const face = getCardFace(type, state, showAll);
  const lastFaceRef = useRef<string | null>(null);

  if (face !== null) {
    lastFaceRef.current = face;
  }

  // Keep the last image on the back face so it stays visible
  // throughout the flip-back animation; backface-visibility
  // hides it once the card is fully face-down.
  const displayImage = face ?? lastFaceRef.current;

  const isFlipped = face !== null;
  const isFound = state === 'found';
  const isFire = state === 'tempFire';
  const isClickable = !disabled && state === 'idle' && !showAll && !isFlipping;

  const handleClick = useCallback(() => {
    if (isClickable) onClick(index);
  }, [isClickable, onClick, index]);

  const classes = [
    'card',
    isFlipped && 'card--flipped',
    isFound && 'card--found',
    isFire && 'card--fire',
    isFlipping && 'card--flipping',
    isClickable && 'card--clickable',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={handleClick}>
      <div className="card__inner">
        <div className="card__face card__face--front">
          <img src={backImg} alt="Card" draggable={false} />
        </div>
        <div className="card__face card__face--back">
          {displayImage && (
            <img src={CARD_IMAGES[displayImage]} alt={displayImage} draggable={false} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Card);
