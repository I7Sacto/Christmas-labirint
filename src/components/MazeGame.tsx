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
    const maxWidth = windowSize.width - 32;
    const maxHeight = windowSize.height - 280;
    const availableSize = Math.min(maxWidth, maxHeight);
    const calculatedCellSize = Math.floor(availableSize / mazeSize);
    return Math.max(10, calculatedCellSize);
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
    <div className="w-screen h-screen bg-gradient-to-b from-[#2d5a6e] to-[#1a3a4a] flex flex-col items-center justify-between p-2 sm:p-4 relative overflow-hidden">
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

      <div className="relative z-10 w-full flex-shrink-0">
        <div className="flex justify-between items-start mb-2 px-2 sm:px-4 gap-2">
          <button
            onClick={onExit}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 sm:py-2 sm:px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-xs sm:text-base"
          >
            Вихід
          </button>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#f5e6d3] tracking-wider text-center flex-1">
            CHRISTMAS MASHUP
          </h1>
          <div />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm md:text-lg text-white px-2 sm:px-4">
          <div className="bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-xl font-bold">
            Рівень: {currentLevel}
          </div>
          <div className={`bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-xl font-bold ${timeRemaining < 60 ? 'text-red-400 animate-pulse' : ''}`}>
            Час: {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      <div
        className="relative bg-white/10 backdrop-blur-sm rounded-2xl shadow-2xl flex-1 flex items-center justify-center overflow-auto"
        style={{
          maxWidth: '100vw',
          maxHeight: 'calc(100vh - 180px)'
        }}
      >
        <svg
          width={mazeWidth}
          height={mazeHeight}
          className="mx-auto"
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

      <div className="relative z-10 w-full flex-shrink-0 flex flex-col items-center gap-2 p-2 sm:p-4">
        <div className="text-center text-white text-xs sm:text-sm md:text-base bg-white/20 backdrop-blur-sm px-2 sm:px-4 py-2 rounded-lg">
          <p className="font-semibold">Використовуйте стрілки</p>
        </div>

        <div className="flex gap-1 sm:gap-2 justify-center flex-wrap">
          <button
            onMouseDown={() => movePlayer('up')}
            onTouchStart={() => movePlayer('up')}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-sm sm:text-base"
          >
            ⬆️
          </button>
        </div>

        <div className="flex gap-1 sm:gap-2 justify-center">
          <button
            onMouseDown={() => movePlayer('left')}
            onTouchStart={() => movePlayer('left')}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-sm sm:text-base"
          >
            ⬅️
          </button>
          <button
            onMouseDown={() => movePlayer('down')}
            onTouchStart={() => movePlayer('down')}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-sm sm:text-base"
          >
            ⬇️
          </button>
          <button
            onMouseDown={() => movePlayer('right')}
            onTouchStart={() => movePlayer('right')}
            className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-2 sm:py-3 sm:px-4 rounded-lg transition-all duration-150 transform hover:scale-110 active:scale-95 text-sm sm:text-base"
          >
            ➡️
          </button>
        </div>
      </div>
    </div>
  );
}
