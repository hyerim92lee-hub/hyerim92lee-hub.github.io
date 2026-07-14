import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Home presents a professional profile structure and verified GitHub link", async () => {
  const home = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(home, /href=["']styles\.css["']/i);
  assert.match(home, /<script[^>]+src=["']script\.js["'][^>]*><\/script>/i);
  assert.match(home, /<a[^>]+class=["']skip-link["'][^>]+href=["']#content["']/i);
  assert.match(home, /<main\s+id=["']content["']/i);
  assert.match(home, /id=["']profile["']/i);
  assert.match(home, /id=["']experience["']/i);
  assert.match(home, /id=["']projects["']/i);
  assert.match(home, /id=["']contact["']/i);
  assert.match(home, /https:\/\/github\.com\/hyerim92lee-hub/);
  assert.match(home, /\[사람 확인 필요\]/);
  assert.match(home, /class=["']nav-toggle["'][^>]+aria-controls=["']primary-nav["']/i);
});
