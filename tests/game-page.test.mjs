import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Games page exposes accessible snake controls for keyboard and touch", async () => {
  const page = await readFile(new URL("../games/index.html", import.meta.url), "utf8");

  assert.match(page, /<canvas[^>]+id=["']game-board["'][^>]+aria-label=/i);
  assert.match(page, /id=["']game-status["'][^>]+aria-live=["']polite["']/i);
  assert.match(page, /<button[^>]+id=["']start-game["']/i);
  assert.match(page, /<strong[^>]+id=["']game-best["']/i);
  for (const direction of ["up", "right", "down", "left"]) {
    assert.match(page, new RegExp(`data-direction=["']${direction}["']`, "i"));
  }
  assert.match(page, /Keyboard:<\/strong>\s*Arrow keys or WASD/i);
  assert.match(page, /Touch:<\/strong>\s*Swipe the board or use the controls/i);
  assert.match(page, /<script\s+type=["']module["']\s+src=["']game\.js["']/i);
});
