import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const execFileAsync = promisify(execFile);

test("build emits only deployable static site assets", async () => {
  await execFileAsync(process.execPath, ["scripts/build.mjs"]);

  await access(new URL("../dist/index.html", import.meta.url));
  await access(new URL("../dist/styles.css", import.meta.url));
  await access(new URL("../dist/script.js", import.meta.url));
  await access(new URL("../dist/games/index.html", import.meta.url));
  await access(new URL("../dist/assets/styles.css", import.meta.url));

  await assert.rejects(access(new URL("../dist/tests", import.meta.url)));
  await assert.rejects(access(new URL("../dist/MEMORY.md", import.meta.url)));
});
