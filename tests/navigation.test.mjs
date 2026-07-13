import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("Home navigation exposes a mobile-ready Games destination", async () => {
  const home = await readFile(new URL("../index.html", import.meta.url), "utf8");

  assert.match(
    home,
    /<meta\s+name=["']viewport["']\s+content=["'][^"']*width=device-width[^"']*["']\s*\/?>/i,
  );
  assert.match(home, /<nav\s+aria-label=["']Primary["'][^>]*>/i);
  assert.match(home, /<a\s+href=["']games\/["'][^>]*>\s*Games\s*<\/a>/i);

  const games = await readFile(
    new URL("../games/index.html", import.meta.url),
    "utf8",
  );

  assert.match(games, /<h1[^>]*>\s*Games\s*<\/h1>/i);
});
