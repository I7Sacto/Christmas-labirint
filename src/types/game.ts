export interface Position {
  x: number;
  y: number;
}

export interface MazeCell {
  walls: {
    top: boolean;
    right: boolean;
    bottom: boolean;
    left: boolean;
  };
  visited: boolean;
}

export type GameState = 'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete' | 'gameComplete';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface GameConfig {
  difficulty: Difficulty;
  mazeSize: number;
  timeLimit: number;
}
