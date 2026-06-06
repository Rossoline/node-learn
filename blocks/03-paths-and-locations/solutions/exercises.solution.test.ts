// Verifies the reference solution. Run with:  npm run test:solutions
import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { homedir } from "node:os";
import { pathToFileURL } from "node:url";
import { joinPath, fileExtension, currentDir } from "./exercises.solution.ts";

describe("Block 03 — solution", () => {
  test("joinPath joins segments like node:path", () => {
    assert.equal(joinPath("a", "b", "c.txt"), join("a", "b", "c.txt"));
    assert.equal(joinPath("src", "..", "dist"), join("src", "..", "dist"));
  });

  test("fileExtension returns the extension with its dot", () => {
    assert.equal(fileExtension("archive.tar.gz"), ".gz");
    assert.equal(fileExtension("index.ts"), ".ts");
    assert.equal(fileExtension("README"), "");
  });

  test("currentDir returns the directory of a file:// URL", () => {
    const filePath = join(homedir(), "project", "app.ts");
    const url = pathToFileURL(filePath).href;
    assert.equal(currentDir(url), dirname(filePath));
  });
});
