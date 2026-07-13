import assert from "node:assert/strict";
import test from "node:test";

import {
  createGame,
  queueDirection,
  startGame,
  stepGame,
} from "../assets/snake-core.js";

test("snake advances exactly one cell per running tick", () => {
  const game = startGame(createGame({ columns: 12, rows: 12, random: () => 0 }));
  const next = stepGame(game, () => 0);

  assert.deepEqual(next.snake[0], { x: game.snake[0].x + 1, y: game.snake[0].y });
  assert.equal(next.snake.length, game.snake.length);
});

test("snake refuses an immediate reverse direction", () => {
  const game = createGame({ columns: 12, rows: 12, random: () => 0 });
  const next = queueDirection(game, "left");

  assert.equal(next.queuedDirection, "right");
});

test("eating food grows the snake and increments score", () => {
  const initial = startGame(createGame({ columns: 12, rows: 12, random: () => 0 }));
  const head = initial.snake[0];
  const game = { ...initial, food: { x: head.x + 1, y: head.y } };
  const next = stepGame(game, () => 0.5);

  assert.equal(next.snake.length, game.snake.length + 1);
  assert.equal(next.score, 1);
  assert.equal(next.status, "running");
  assert.equal(next.snake.some((cell) => cell.x === next.food.x && cell.y === next.food.y), false);
});

test("crossing a wall ends the game", () => {
  const initial = startGame(createGame({ columns: 8, rows: 8, random: () => 0 }));
  const game = {
    ...initial,
    snake: [{ x: 7, y: 3 }, { x: 6, y: 3 }, { x: 5, y: 3 }],
    direction: "right",
    queuedDirection: "right",
  };
  const next = stepGame(game, () => 0);

  assert.equal(next.status, "over");
});

test("running into the snake body ends the game", () => {
  const initial = startGame(createGame({ columns: 8, rows: 8, random: () => 0 }));
  const game = {
    ...initial,
    snake: [
      { x: 4, y: 4 },
      { x: 4, y: 5 },
      { x: 3, y: 5 },
      { x: 3, y: 4 },
    ],
    direction: "down",
    queuedDirection: "down",
  };
  const next = stepGame(game, () => 0);

  assert.equal(next.status, "over");
});
