import { useState, useEffect, useRef, useCallback } from 'react';
import { useBoard } from '../hooks/useBoard';
import { useTimer } from '../hooks/useTimer';
import { FLIP_DURATION, type LevelConfig } from '../config/levels';
import HUD from './HUD';
import GameBoard from './GameBoard';

type Phase = 'showing' | 'flipping' | 'searching';

interface Props {
  levelConfig: LevelConfig;
  lives: number;
  score: number;
  levelKoalas: number;
  frozen: boolean;
  onFindKoala: () => void;
  onMiss: () => void;
  onFireHit: () => void;
  onLevelWon: (timeLeft: number, totalTime: number) => void;
  onTimeUp: () => void;
  onReset: () => void;
}

export default function Game({
  levelConfig,
  lives,
  score,
  levelKoalas,
  frozen,
  onFindKoala,
  onMiss,
  onFireHit,
  onLevelWon,
  onTimeUp,
  onReset,
}: Props) {
  const [phase, setPhase] = useState<Phase>('showing');
  const { boardTypes, boardVariants, cardStates, generate, handleClick: boardClick } = useBoard();
  const foundCountRef = useRef(0);
  const frozenRef = useRef(frozen);
  const timeLeftRef = useRef(0);

  frozenRef.current = frozen;

  useEffect(() => {
    generate(levelConfig.koalas);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (frozen) return;

    if (phase === 'showing') {
      const t = setTimeout(() => setPhase('flipping'), levelConfig.showTime * 1000);
      return () => clearTimeout(t);
    }

    if (phase === 'flipping') {
      const t = setTimeout(() => setPhase('searching'), FLIP_DURATION);
      return () => clearTimeout(t);
    }
  }, [phase, frozen, levelConfig.showTime]);

  const timerActive = phase === 'searching' && !frozen;

  const handleTimerExpire = useCallback(() => {
    if (!frozenRef.current) onTimeUp();
  }, [onTimeUp]);

  const timer = useTimer(levelConfig.timeLimit, timerActive, handleTimerExpire);
  timeLeftRef.current = timer.timeLeft;

  const handleCardClick = useCallback(
    (index: number) => {
      if (phase !== 'searching' || frozenRef.current) return;

      const result = boardClick(index, levelConfig.fireChance);
      if (!result) return;

      if (result === 'koala') {
        onFindKoala();
        foundCountRef.current += 1;
        if (foundCountRef.current >= levelConfig.koalas) {
          const captured = timeLeftRef.current;
          setTimeout(() => onLevelWon(captured, levelConfig.timeLimit), 800);
        }
      } else if (result === 'fire') {
        onMiss();
        onFireHit();
      } else {
        onMiss();
      }
    },
    [phase, boardClick, levelConfig, onFindKoala, onMiss, onFireHit, onLevelWon],
  );

  return (
    <div className="game">
      <div className="game__board-area">
        <div className="game__board-wrapper">
          <GameBoard
          boardTypes={boardTypes}
          boardVariants={boardVariants}
          cardStates={cardStates}
          showAll={phase === 'showing'}
          isFlipping={phase === 'flipping'}
          disabled={phase !== 'searching' || frozen}
          onCardClick={handleCardClick}
        />
        </div>

        <HUD
          lives={lives}
          level={levelConfig.level}
          levelName={levelConfig.name}
          difficulty={levelConfig.difficulty}
          score={score}
          timeLeft={timer.timeLeft}
          isWarning={timer.isWarning}
          isCritical={timer.isCritical}
          showTimer={phase === 'searching'}
          foundKoalas={levelKoalas}
          totalKoalas={levelConfig.koalas}
          onReset={onReset}
        />
      </div>
    </div>
  );
}
