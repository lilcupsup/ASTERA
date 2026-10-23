import { test } from "node:test";
import assert from "node:assert/strict";
import { searchJourneys } from "./booking.ts";
const input = {
  destination: "saturn",
  date: "2027-05-10",
  travelers: 2,
  cabin: "suite",
};
const now = new Date("2026-10-23T12:00:00Z");
test("total respects guests and cabin", () => {
  assert.equal(searchJourneys(input, now)[0].total, 1920000);
  assert.equal(
    searchJourneys({ ...input, cabin: "residence" }, now)[0].total,
    3168000,
  );
});
test("invalid requests cannot create a result", () => {
  for (const bad of [
    { date: "2026-01-01" },
    { travelers: 0 },
    { travelers: 1.5 },
    { destination: "earth" },
    { date: "2027-02-30" },
    { cabin: "bogus" },
  ])
    assert.throws(() => searchJourneys({ ...input, ...bad }, now));
});
test("unavailable demo combination returns an empty state", () =>
  assert.deepEqual(
    searchJourneys({ ...input, destination: "europa", cabin: "charter" }, now),
    [],
  ));
