import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Home presents the E-AI professional profile and public work", async () => {
  const home = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(home, /href=["']assets\/styles\.css["']/i);
  assert.match(home, /<a[^>]+class=["']skip-link["'][^>]+href=["']#content["']/i);
  assert.match(home, /<main\s+id=["']content["']/i);
  assert.match(home, /id=["']work["']/i);
  assert.match(home, /id=["']principles["']/i);
  assert.match(home, /id=["']contact["']/i);
  assert.match(home, /Efficient\s*(?:&amp;|&)\s*Robust AI Systems/i);
  assert.match(home, /LoRP-Locality-Aware-Redundancy-Pruning/);
  assert.match(home, /ghosted_layers_official_repository/);
  assert.match(home, /samsung-agent-education/);
});
