import { useEffect, useState } from 'react';
import { MazeCell, Position } from '../types/game';

interface MazeGameProps {
  maze: MazeCell[][];
  mazeSize: number;
  timeRemaining: number;
  onComplete: () => void;
  currentLevel: number;
  onExit: () => void;
}

export default function MazeGame({ maze, mazeSize, timeRemaining, onComplete, currentLevel, onExit }: MazeGameProps) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const goalPos: Position = { x: mazeSize - 1, y: mazeSize - 1 };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getOptimalCellSize = () => {
    // Враховуємо всі елементи інтерфейсу
    const headerHeight = 120; // заголовок + інфо
    const controlsHeight = 80; // кнопки керування
    const padding = 32; // відступи
    
    const maxWidth = windowSize.width - padding;
    const maxHeight = windowSize.height - headerHeight - controlsHeight;
    
    // Для desktop обмежуємо максимальний розмір
    const effectiveWidth = Math.min(maxWidth, 1200); // Максимум 1200px ширина
    const effectiveHeight = Math.min(maxHeight, 800); // Максимум 800px висота
    
    // Вибираємо менший розмір для квадратного лабіринту
    const availableSize = Math.min(effectiveWidth, effectiveHeight);
    const calculatedCellSize = Math.floor(availableSize / mazeSize);
    
    // Мінімум 15px на клітинку, максимум 50px для кращого відображення
    return Math.min(Math.max(15, calculatedCellSize), 50);
  };

  const cellSize = getOptimalCellSize();
  const mazeWidth = cellSize * mazeSize;
  const mazeHeight = cellSize * mazeSize;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const { x, y } = playerPos;
      let newPos = { ...playerPos };

      switch (e.key) {
        case 'ArrowUp':
          if (!maze[y][x].walls.top && y > 0) {
            newPos = { x, y: y - 1 };
          }
          e.preventDefault();
          break;
        case 'ArrowDown':
          if (!maze[y][x].walls.bottom && y < mazeSize - 1) {
            newPos = { x, y: y + 1 };
          }
          e.preventDefault();
          break;
        case 'ArrowLeft':
          if (!maze[y][x].walls.left && x > 0) {
            newPos = { x: x - 1, y };
          }
          e.preventDefault();
          break;
        case 'ArrowRight':
          if (!maze[y][x].walls.right && x < mazeSize - 1) {
            newPos = { x: x + 1, y };
          }
          e.preventDefault();
          break;
      }

      setPlayerPos(newPos);

      if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
        setTimeout(onComplete, 300);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, maze, mazeSize, goalPos, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const movePlayer = (direction: 'up' | 'down' | 'left' | 'right') => {
    const { x, y } = playerPos;
    let newPos = { ...playerPos };

    switch (direction) {
      case 'up':
        if (!maze[y][x].walls.top && y > 0) {
          newPos = { x, y: y - 1 };
        }
        break;
      case 'down':
        if (!maze[y][x].walls.bottom && y < mazeSize - 1) {
          newPos = { x, y: y + 1 };
        }
        break;
      case 'left':
        if (!maze[y][x].walls.left && x > 0) {
          newPos = { x: x - 1, y };
        }
        break;
      case 'right':
        if (!maze[y][x].walls.right && x < mazeSize - 1) {
          newPos = { x: x + 1, y };
        }
        break;
    }

    setPlayerPos(newPos);

    if (newPos.x === goalPos.x && newPos.y === goalPos.y) {
      setTimeout(onComplete, 300);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#2d5a6e] to-[#1a3a4a] flex flex-col items-center p-1 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-50 animate-snow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 20}%`,
              width: `${Math.random() * 3 + 2}px`,
              height: `${Math.random() * 3 + 2}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <h1 className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5e6d3] tracking-widest text-center mb-1 drop-shadow-lg">
        CHRISTMAS MASHUP
      </h1>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm md:text-base text-white mb-2">
        <div className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-bold">
          Рівень: {currentLevel}
        </div>
        <div className={`bg-white/20 backdrop-blur-sm px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-bold ${timeRemaining < 60 ? 'text-red-400 animate-pulse' : ''}`}>
          Час: {formatTime(timeRemaining)}
        </div>
      </div>

      <div
        className="relative bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl flex-1 flex items-center justify-center overflow-hidden w-full mx-1"
        style={{
          maxHeight: 'calc(100vh - 180px)',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <svg
          width={mazeWidth}
          height={mazeHeight}
          className="mx-auto"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block'
          }}
        >
          {maze.map((row, y) =>
            row.map((cell, x) => (
              <g key={`${x}-${y}`}>
                {cell.walls.top && (
                  <line
                    x1={x * cellSize}
                    y1={y * cellSize}
                    x2={(x + 1) * cellSize}
                    y2={y * cellSize}
                    stroke="#f5e6d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                {cell.walls.right && (
                  <line
                    x1={(x + 1) * cellSize}
                    y1={y * cellSize}
                    x2={(x + 1) * cellSize}
                    y2={(y + 1) * cellSize}
                    stroke="#f5e6d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                {cell.walls.bottom && (
                  <line
                    x1={x * cellSize}
                    y1={(y + 1) * cellSize}
                    x2={(x + 1) * cellSize}
                    y2={(y + 1) * cellSize}
                    stroke="#f5e6d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
                {cell.walls.left && (
                  <line
                    x1={x * cellSize}
                    y1={y * cellSize}
                    x2={x * cellSize}
                    y2={(y + 1) * cellSize}
                    stroke="#f5e6d3"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                )}
              </g>
            ))
          )}

          <text
            x={cellSize / 2}
            y={cellSize / 2 + 4}
            fontSize={cellSize * 0.8}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            🎅
          </text>

          <text
            x={playerPos.x * cellSize + cellSize / 2}
            y={playerPos.y * cellSize + cellSize / 2 + 4}
            fontSize={cellSize * 0.8}
            textAnchor="middle"
            dominantBaseline="middle"
            className="animate-pulse"
          >
            🍪
          </text>

          <text
            x={goalPos.x * cellSize + cellSize / 2}
            y={goalPos.y * cellSize + cellSize / 2 + 4}
            fontSize={cellSize * 0.8}
            textAnchor="middle"
            dominantBaseline="middle"
            className="animate-bounce"
          >
            🎄
          </text>
        </svg>

      </div>

      <div className="relative z-10 w-full flex-shrink-0 flex justify-between items-end gap-2 p-1 mt-1">
        <div className="flex gap-1 items-end">
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 justify-center">
              <button
                onMouseDown={() => movePlayer('up')}
                onTouchStart={() => movePlayer('up')}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-5 sm:py-4 sm:px-6 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-lg sm:text-xl"
              >
                ⬆️
              </button>
            </div>
            <div className="flex gap-1 justify-center">
              <button
                onMouseDown={() => movePlayer('left')}
                onTouchStart={() => movePlayer('left')}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-5 sm:py-4 sm:px-6 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-lg sm:text-xl"
              >
                ⬅️
              </button>
              <button
                onMouseDown={() => movePlayer('down')}
                onTouchStart={() => movePlayer('down')}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-5 sm:py-4 sm:px-6 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-lg sm:text-xl"
              >
                ⬇️
              </button>
              <button
                onMouseDown={() => movePlayer('right')}
                onTouchStart={() => movePlayer('right')}
                className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-3 px-5 sm:py-4 sm:px-6 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-lg sm:text-xl"
              >
                ➡️
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={onExit}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-lg transition-all duration-200 transform hover:scale-105 text-base sm:text-lg"
        >
          Вихід
        </button>
      </div>
    </div>
  );
}
