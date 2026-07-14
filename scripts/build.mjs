import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const output = new URL("../dist/", import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("../index.html", import.meta.url), new URL("index.html", output));
await cp(new URL("../styles.css", import.meta.url), new URL("styles.css", output));
await cp(new URL("../script.js", import.meta.url), new URL("script.js", output));
await cp(new URL("../games/", import.meta.url), new URL("games/", output), { recursive: true });
await cp(new URL("../assets/", import.meta.url), new URL("assets/", output), { recursive: true });
await writeFile(new URL(".nojekyll", output), "");

console.log("Static site built in dist/");
