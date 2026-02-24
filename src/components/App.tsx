import { useEffect } from 'react';
import { useGameState } from '../hooks/useGameState';
import { useStorage } from '../hooks/useStorage';
import { LEVELS } from '../config/levels';
import MainMenu from './MainMenu';
import Game from './Game';
import LevelCompleteScreen from './LevelCompleteScreen';
import TimeUpScreen from './TimeUpScreen';
import GameOverScreen from './GameOverScreen';
import VictoryScreen from './VictoryScreen';

export default function App() {
  const game = useGameState();
  const storage = useStorage();
  const levelConfig = LEVELS[game.level - 1];
  const isFrozen = game.screen !== 'playing';

  useEffect(() => {
    if (game.screen === 'levelComplete' || game.screen === 'victory') {
      storage.updateBest(game.score, game.level);
    }
  }, [game.screen, game.score, game.level, storage.updateBest]);

  if (game.screen === 'menu') {
    return (
      <MainMenu
        bestScore={storage.bestScore}
        bestLevel={storage.bestLevel}
        onStart={game.startGame}
      />
    );
  }

  return (
    <div className="app">
      <Game
        key={game.gameId}
        levelConfig={levelConfig}
        lives={game.lives}
        score={game.score}
        levelKoalas={game.levelKoalas}
        frozen={isFrozen}
        onFindKoala={game.findKoala}
        onMiss={game.miss}
        onFireHit={game.hitFire}
        onLevelWon={game.levelWon}
        onTimeUp={game.timeUp}
        onReset={game.restart}
      />

      {game.screen === 'levelComplete' && (
        <LevelCompleteScreen
          level={game.level}
          levelResult={game.levelResult}
          score={game.score}
          lives={game.lives}
          onNext={game.nextLevel}
        />
      )}

      {game.screen === 'timeUp' && (
        <TimeUpScreen onRetry={game.retryLevel} />
      )}

      {game.screen === 'gameOver' && (
        <GameOverScreen
          score={game.score}
          level={game.level}
          onRestart={game.restart}
          onRetry={game.retryWithLives}
        />
      )}

      {game.screen === 'victory' && (
        <VictoryScreen
          score={game.score}
          perfectLevels={game.perfectLevels}
          totalLivesUsed={game.totalLivesUsed}
          onRestart={game.restart}
        />
      )}
    </div>
  );
}
