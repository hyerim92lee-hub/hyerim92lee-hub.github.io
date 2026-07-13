import assert from "node:assert/strict";
import test from "node:test";

import { directionFromKey, directionFromSwipe } from "../games/input.js";

test("arrow keys and WASD map to the same direction commands", () => {
  assert.equal(directionFromKey("ArrowUp"), "up");
  assert.equal(directionFromKey("w"), "up");
  assert.equal(directionFromKey("ArrowRight"), "right");
  assert.equal(directionFromKey("d"), "right");
  assert.equal(directionFromKey("Escape"), null);
});

test("dominant touch movement maps to a direction above threshold", () => {
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: 38, y: 8 }), "right");
  assert.equal(directionFromSwipe({ x: 20, y: 20 }, { x: 17, y: -30 }), "up");
  assert.equal(directionFromSwipe({ x: 0, y: 0 }, { x: 8, y: 7 }), null);
});
