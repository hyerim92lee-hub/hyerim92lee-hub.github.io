import { createGame, queueDirection, startGame, stepGame } from "../assets/snake-core.js";
import { directionFromKey, directionFromSwipe } from "./input.js";

const canvas = document.querySelector("#game-board");
const context = canvas.getContext("2d");
const score = document.querySelector("#game-score");
const best = document.querySelector("#game-best");
const status = document.querySelector("#game-status");
const startButton = document.querySelector("#start-game");
const directionButtons = document.querySelectorAll("[data-direction]");

let game = createGame();
let timer = null;
let bestScore = 0;
let pointerStart = null;

function setStatus(message) {
  status.textContent = message;
}

function resizeCanvas() {
  const size = Math.max(280, Math.floor(canvas.getBoundingClientRect().width));
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = size * ratio;
  canvas.height = size * ratio;
  draw();
}

function draw() {
  const cell = canvas.width / game.columns;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#10131a";
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = "rgba(255,255,255,.045)";
  context.lineWidth = 1;
  for (let index = 1; index < game.columns; index += 1) {
    const offset = index * cell;
    context.beginPath();
    context.moveTo(offset, 0);
    context.lineTo(offset, canvas.height);
    context.stroke();
    context.beginPath();
    context.moveTo(0, offset);
    context.lineTo(canvas.width, offset);
    context.stroke();
  }

  if (game.food) {
    context.fillStyle = "#ff6b6b";
    context.beginPath();
    context.arc((game.food.x + 0.5) * cell, (game.food.y + 0.5) * cell, cell * 0.3, 0, Math.PI * 2);
    context.fill();
  }

  game.snake.forEach((segment, index) => {
    const gap = Math.max(1.5, cell * 0.1);
    context.fillStyle = index === 0 ? "#efffc8" : "#c9ff47";
    context.beginPath();
    context.roundRect(segment.x * cell + gap, segment.y * cell + gap, cell - gap * 2, cell - gap * 2, cell * 0.22);
    context.fill();
  });

  score.textContent = String(game.score).padStart(2, "0");
  best.textContent = String(bestScore).padStart(2, "0");
}

function stopTimer() {
  window.clearInterval(timer);
  timer = null;
}

function tick() {
  game = stepGame(game);
  if (game.status === "over") {
    stopTimer();
    bestScore = Math.max(bestScore, game.score);
    startButton.textContent = "Play again";
    setStatus(`Game over. Score ${game.score}. Press Play again to reset.`);
  }
  draw();
}

function begin() {
  if (game.status === "over") game = createGame();
  game = startGame(game);
  stopTimer();
  timer = window.setInterval(tick, 120);
  startButton.textContent = "Pause";
  setStatus("Game running. Use arrow keys, WASD, swipe, or the direction controls.");
  canvas.focus();
  draw();
}

function toggleGame() {
  if (game.status === "running") {
    game = { ...game, status: "paused" };
    stopTimer();
    startButton.textContent = "Resume";
    setStatus("Game paused.");
    return;
  }
  begin();
}

function applyDirection(direction) {
  if (!direction) return;
  game = queueDirection(game, direction);
  if (game.status === "idle") begin();
}

document.addEventListener("keydown", (event) => {
  const direction = directionFromKey(event.key);
  if (direction) {
    event.preventDefault();
    applyDirection(direction);
  } else if (event.key === " " && (document.activeElement === canvas || document.activeElement === startButton)) {
    event.preventDefault();
    toggleGame();
  }
});

canvas.addEventListener("pointerdown", (event) => {
  pointerStart = { x: event.clientX, y: event.clientY };
  canvas.setPointerCapture(event.pointerId);
});

canvas.addEventListener("pointerup", (event) => {
  if (!pointerStart) return;
  applyDirection(directionFromSwipe(pointerStart, { x: event.clientX, y: event.clientY }));
  pointerStart = null;
});

directionButtons.forEach((button) => {
  button.addEventListener("click", () => applyDirection(button.dataset.direction));
});

startButton.addEventListener("click", toggleGame);
window.addEventListener("resize", resizeCanvas);
resizeCanvas();
setStatus("Ready. Press Start, an arrow key, WASD, or swipe to begin.");
