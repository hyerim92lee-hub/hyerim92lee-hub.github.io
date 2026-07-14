import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("game-over effect is tied to a one-time terminal transition", async () => {
  const game = await readFile(new URL("../games/game.js", import.meta.url), "utf8");

  assert.match(game, /let\s+gameOverHandled\s*=\s*false/);
  assert.match(game, /function\s+playGameOverSound\s*\(/);
  assert.match(game, /if\s*\(game\.status\s*===\s*["']over["']\s*&&\s*!gameOverHandled\)/);
  assert.match(game, /gameOverHandled\s*=\s*true/);
  assert.match(game, /gameOverHandled\s*=\s*false/);
});

test("enemy rendering uses a visually distinct game entity color", async () => {
  const game = await readFile(new URL("../games/game.js", import.meta.url), "utf8");

  assert.match(game, /if\s*\(game\.enemy\)/);
  assert.match(game, /#8b5cf6/i);
});
