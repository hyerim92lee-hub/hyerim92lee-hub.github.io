const VECTORS = {
  up: { x: 0, y: -1 },
  right: { x: 1, y: 0 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
};

const OPPOSITES = { up: "down", right: "left", down: "up", left: "right" };

function sameCell(a, b) {
  return a.x === b.x && a.y === b.y;
}

function placeFood(columns, rows, snake, random) {
  const open = [];
  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < columns; x += 1) {
      if (!snake.some((cell) => cell.x === x && cell.y === y)) open.push({ x, y });
    }
  }

  if (open.length === 0) return null;
  return open[Math.min(open.length - 1, Math.floor(random() * open.length))];
}

export function createGame({ columns = 20, rows = 20, random = Math.random } = {}) {
  const centerX = Math.floor(columns / 2);
  const centerY = Math.floor(rows / 2);
  const snake = [
    { x: centerX, y: centerY },
    { x: centerX - 1, y: centerY },
    { x: centerX - 2, y: centerY },
  ];

  return {
    columns,
    rows,
    snake,
    direction: "right",
    queuedDirection: "right",
    food: placeFood(columns, rows, snake, random),
    score: 0,
    status: "idle",
  };
}

export function startGame(game) {
  if (game.status === "over") return game;
  return { ...game, status: "running" };
}

export function queueDirection(game, direction) {
  if (!(direction in VECTORS) || OPPOSITES[game.direction] === direction) return game;
  return { ...game, queuedDirection: direction };
}

export function stepGame(game, random = Math.random) {
  if (game.status !== "running") return game;

  const direction = game.queuedDirection;
  const vector = VECTORS[direction];
  const head = game.snake[0];
  const nextHead = { x: head.x + vector.x, y: head.y + vector.y };
  const hitWall = nextHead.x < 0 || nextHead.x >= game.columns || nextHead.y < 0 || nextHead.y >= game.rows;

  if (hitWall) return { ...game, direction, status: "over" };

  const ateFood = game.food && sameCell(nextHead, game.food);
  const collisionBody = ateFood ? game.snake : game.snake.slice(0, -1);
  if (collisionBody.some((cell) => sameCell(cell, nextHead))) {
    return { ...game, direction, status: "over" };
  }

  const snake = [nextHead, ...game.snake];
  if (!ateFood) snake.pop();

  return {
    ...game,
    snake,
    direction,
    food: ateFood ? placeFood(game.columns, game.rows, snake, random) : game.food,
    score: game.score + (ateFood ? 1 : 0),
  };
}
