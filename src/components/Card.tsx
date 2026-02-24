import { memo, useCallback, useRef } from 'react';
import backImg from '@assets/back.webp';
import koala1 from '@assets/koala1.webp';
import koala2 from '@assets/koala2.webp';
import koala3 from '@assets/koala3.webp';
import koala4 from '@assets/koala4.webp';
import tree1 from '@assets/tree1.webp';
import tree2 from '@assets/tree2.webp';
import tree3 from '@assets/tree3.webp';
import tree4 from '@assets/tree4.webp';
import fireImg from '@assets/fire.webp';
import type { CardType, CardState } from '../hooks/useBoard';

const KOALA_IMAGES = [koala1, koala2, koala3, koala4];
const TREE_IMAGES = [tree1, tree2, tree3, tree4];

function getImageSrc(face: string, variant: number): string {
  if (face === 'fire') return fireImg;
  if (face === 'koala') return KOALA_IMAGES[(variant - 1) % KOALA_IMAGES.length];
  return TREE_IMAGES[(variant - 1) % TREE_IMAGES.length];
}

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
  variant: number;
  state: CardState;
  showAll: boolean;
  isFlipping: boolean;
  disabled: boolean;
  onClick: (index: number) => void;
}

function Card({ index, type, variant, state, showAll, isFlipping, disabled, onClick }: Props) {
  const face = getCardFace(type, state, showAll);
  const lastFaceRef = useRef<string | null>(null);

  if (face !== null) {
    lastFaceRef.current = face;
  }

  // Keep the last image on the back face so it stays visible
  // throughout the flip-back animation; backface-visibility
  // hides it once the card is fully face-down.
  const displayFace = face ?? lastFaceRef.current;

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
          {displayFace && (
            <img
              src={getImageSrc(displayFace, variant)}
              alt={displayFace}
              draggable={false}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(Card);
