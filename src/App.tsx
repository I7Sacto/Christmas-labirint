import { useEffect, useState } from 'react';
import Menu from './components/Menu';
import MazeGame from './components/MazeGame';
import GameOver from './components/GameOver';
import Victory from './components/Victory';
import { generateMaze } from './utils/mazeGenerator';
import { GameState, Difficulty, MazeCell } from './types/game';

const DIFFICULTY_CONFIG = {
  easy: { size: 10, time: 900 },
  medium: { size: 15, time: 900 },
  hard: { size: 20, time: 900 }
};

function App() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [maze, setMaze] = useState<MazeCell[][]>([]);
  const [timeRemaining, setTimeRemaining] = useState(900);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('https://www.bensound.com/bensound-music/bensound-christmastime.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    setAudioElement(audio);

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  useEffect(() => {
    if (audioElement) {
      if (gameState === 'playing') {
        audioElement.play().catch(() => {});
      } else {
        audioElement.pause();
      }
    }
  }, [gameState, audioElement]);

  useEffect(() => {
    let timer: number;
    if (gameState === 'playing' && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setGameState('gameOver');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeRemaining]);

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setCurrentLevel(1);
    const config = DIFFICULTY_CONFIG[selectedDifficulty];
    setMaze(generateMaze(config.size));
    setTimeRemaining(config.time);
    setGameState('playing');
  };

  const restartLevel = () => {
    const config = DIFFICULTY_CONFIG[difficulty];
    setMaze(generateMaze(config.size));
    setTimeRemaining(config.time);
    setGameState('playing');
  };

  const handleLevelComplete = () => {
    if (currentLevel >= 3) {
      setGameState('gameComplete');
    } else {
      setGameState('levelComplete');
    }
  };

  const nextLevel = () => {
    const newLevel = currentLevel + 1;
    setCurrentLevel(newLevel);
    const config = DIFFICULTY_CONFIG[difficulty];
    setMaze(generateMaze(config.size));
    setTimeRemaining(config.time);
    setGameState('playing');
  };

  const goToMenu = () => {
    setGameState('menu');
    setCurrentLevel(1);
    setTimeRemaining(900);
  };

  return (
    <>
      {gameState === 'menu' && <Menu onStartGame={startGame} />}

      {gameState === 'playing' && (
        <MazeGame
          maze={maze}
          mazeSize={DIFFICULTY_CONFIG[difficulty].size}
          timeRemaining={timeRemaining}
          onComplete={handleLevelComplete}
          currentLevel={currentLevel}
        />
      )}

      {gameState === 'gameOver' && (
        <GameOver onRestart={restartLevel} onMenu={goToMenu} />
      )}

      {(gameState === 'levelComplete' || gameState === 'gameComplete') && (
        <Victory
          onNextLevel={nextLevel}
          onMenu={goToMenu}
          currentLevel={currentLevel}
          isGameComplete={gameState === 'gameComplete'}
        />
      )}
    </>
  );
}

export default App;
