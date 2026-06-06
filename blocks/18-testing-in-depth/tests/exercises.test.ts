import { test, describe, mock } from "node:test";
import assert from "node:assert/strict";
import { greetUser, parsePositive, sumTwice } from "../src/exercises.ts";

describe("Block 18 — Testing in Depth", () => {
  test("greetUser uses the injected getName (mocked)", () => {
    const getName = mock.fn((_id: number) => "Ada");
    assert.equal(greetUser(7, getName), "Hello, Ada!");
    // The spy recorded exactly one call, with the id we passed.
    assert.equal(getName.mock.callCount(), 1);
    assert.deepEqual(getName.mock.calls[0]?.arguments, [7]);
  });

  test("parsePositive returns or throws", () => {
    assert.equal(parsePositive("5"), 5);
    assert.equal(parsePositive("2.5"), 2.5);
    assert.throws(() => parsePositive("0"), /not a positive number/);
    assert.throws(() => parsePositive("-1"), /not a positive number/);
    assert.throws(() => parsePositive("abc"), /not a positive number/);
    assert.throws(() => parsePositive(""), /not a positive number/);
  });

  test("sumTwice awaits the dependency twice", async () => {
    const load = mock.fn(async () => 10);
    assert.equal(await sumTwice(load), 20);
    assert.equal(load.mock.callCount(), 2);
  });
});
