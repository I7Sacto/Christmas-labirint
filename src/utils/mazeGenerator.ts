import { MazeCell, Position } from '../types/game';

export function generateMaze(size: number): MazeCell[][] {
  const maze: MazeCell[][] = [];

  for (let i = 0; i < size; i++) {
    maze[i] = [];
    for (let j = 0; j < size; j++) {
      maze[i][j] = {
        walls: { top: true, right: true, bottom: true, left: true },
        visited: false
      };
    }
  }

  const stack: Position[] = [];
  const start: Position = { x: 0, y: 0 };
  maze[start.y][start.x].visited = true;
  stack.push(start);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const neighbors = getUnvisitedNeighbors(current, maze, size);

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      removeWall(current, next, maze);
      maze[next.y][next.x].visited = true;
      stack.push(next);
    } else {
      stack.pop();
    }
  }

  return maze;
}

function getUnvisitedNeighbors(pos: Position, maze: MazeCell[][], size: number): Position[] {
  const neighbors: Position[] = [];
  const { x, y } = pos;

  if (y > 0 && !maze[y - 1][x].visited) neighbors.push({ x, y: y - 1 });
  if (x < size - 1 && !maze[y][x + 1].visited) neighbors.push({ x: x + 1, y });
  if (y < size - 1 && !maze[y + 1][x].visited) neighbors.push({ x, y: y + 1 });
  if (x > 0 && !maze[y][x - 1].visited) neighbors.push({ x: x - 1, y });

  return neighbors;
}

function removeWall(current: Position, next: Position, maze: MazeCell[][]) {
  const dx = next.x - current.x;
  const dy = next.y - current.y;

  if (dx === 1) {
    maze[current.y][current.x].walls.right = false;
    maze[next.y][next.x].walls.left = false;
  } else if (dx === -1) {
    maze[current.y][current.x].walls.left = false;
    maze[next.y][next.x].walls.right = false;
  } else if (dy === 1) {
    maze[current.y][current.x].walls.bottom = false;
    maze[next.y][next.x].walls.top = false;
  } else if (dy === -1) {
    maze[current.y][current.x].walls.top = false;
    maze[next.y][next.x].walls.bottom = false;
  }
}
