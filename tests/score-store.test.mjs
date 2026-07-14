import assert from "node:assert/strict";
import test from "node:test";

import { loadBestScore, saveBestScore } from "../assets/score-store.js";

test("best score is restored only from a valid positive integer", () => {
  assert.equal(loadBestScore({ getItem: () => "12" }, "best"), 12);
  assert.equal(loadBestScore({ getItem: () => "-1" }, "best"), 0);
  assert.equal(loadBestScore({ getItem: () => "not-a-number" }, "best"), 0);
});

test("best score persistence never interrupts gameplay when storage is blocked", () => {
  const values = new Map();
  saveBestScore({ setItem: (key, value) => values.set(key, value) }, "best", 7);
  assert.equal(values.get("best"), "7");
  assert.doesNotThrow(() => saveBestScore({ setItem: () => { throw new Error("blocked"); } }, "best", 7));
  assert.equal(loadBestScore({ getItem: () => { throw new Error("blocked"); } }, "best"), 0);
});
