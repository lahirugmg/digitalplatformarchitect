import test from "node:test";
import assert from "node:assert";

test("deliberately failing test to test pre-commit hook", () => {
    assert.strictEqual(1, 2);
});
