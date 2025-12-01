import { useEffect, useState } from 'react';
import { MazeCell, Position } from '../types/game';

interface MazeGameProps {
  maze: MazeCell[][];
  mazeSize: number;
  timeRemaining: number;
  onComplete: () => void;
  currentLevel: number;
}

export default function MazeGame({ maze, mazeSize, timeRemaining, onComplete, currentLevel }: MazeGameProps) {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const goalPos: Position = { x: mazeSize - 1, y: mazeSize - 1 };

  const cellSize = Math.min(600 / mazeSize, 40);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2d5a6e] to-[#1a3a4a] flex flex-col items-center justify-center p-4 relative overflow-hidden">
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

      <div className="relative z-10 mb-6 text-center">
        <h1 className="text-5xl font-bold text-[#f5e6d3] mb-2 tracking-wider">
          CHRISTMAS MASHUP
        </h1>
        <div className="flex items-center justify-center gap-8 text-2xl text-white">
          <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-bold">
            Рівень: {currentLevel}
          </div>
          <div className={`bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-bold ${timeRemaining < 60 ? 'text-red-400 animate-pulse' : ''}`}>
            Час: {formatTime(timeRemaining)}
          </div>
        </div>
      </div>

      <div
        className="relative bg-white/10 backdrop-blur-sm p-8 rounded-3xl shadow-2xl"
        style={{
          width: mazeWidth + 64,
          height: mazeHeight + 64
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

        <div className="absolute top-2 left-2 text-4xl">🎁</div>
        <div className="absolute top-2 right-2 text-4xl">🍬</div>
        <div className="absolute bottom-2 left-2 text-4xl">⭐</div>
        <div className="absolute bottom-2 right-2 text-4xl">🎁</div>
      </div>

      <div className="relative z-10 mt-6 text-center text-white text-lg bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl">
        <p className="font-semibold">Використовуйте стрілки для руху</p>
        <p className="text-sm opacity-80 mt-1">Доведіть імбирне печиво до ялинки!</p>
      </div>
    </div>
  );
}
