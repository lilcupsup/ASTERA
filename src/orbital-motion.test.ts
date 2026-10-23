import { test } from "node:test";
import assert from "node:assert/strict";
import { nearestPhase, orbitPose } from "./orbital-motion.ts";

test("all orbit positions move with the same continuous phase", () => {
  for (let i = 0; i < 5; i++)
    assert.notDeepEqual(
      orbitPose(i, 3, false).overview,
      orbitPose(i, 3.3, false).overview,
    );
});
test("wrapping around either end takes the shortest route", () => {
  assert.equal(nearestPhase(0, 4), 5);
  assert.equal(nearestPhase(4, 0), -1);
  assert.equal(nearestPhase(1, 9.8), 11);
});
test("selected world is in the foreground; others retain depth", () => {
  for (let selected = 0; selected < 5; selected++) {
    assert.equal(orbitPose(selected, selected, false).focus, 1);
    assert.equal(orbitPose(selected, selected, false).world[2], 1);
    for (let i = 0; i < 5; i++)
      if (i !== selected)
        assert.ok(orbitPose(i, selected, false).world[2] < -100);
  }
});
test("orbit is continuous at the phase seam and safe during retargeting", () => {
  for (let i = 0; i < 5; i++) {
    const a = orbitPose(i, 4.9999, false),
      b = orbitPose(i, 5.0001, false);
    a.world.forEach((v, j) => assert.ok(Math.abs(v - b.world[j]) < 0.1));
    assert.ok(Number.isFinite(nearestPhase(i, 3.41)));
  }
});
