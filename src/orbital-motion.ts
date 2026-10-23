export const WORLD_COUNT = 5;
export const ORBIT_STEP = (Math.PI * 2) / WORLD_COUNT;
export const wrapAngle = (radians: number) =>
  Math.atan2(Math.sin(radians), Math.cos(radians));

export function nearestPhase(index: number, phase: number) {
  return index + Math.round((phase - index) / WORLD_COUNT) * WORLD_COUNT;
}

// One periodic, closed spatial curve. The near bend reaches the camera; the
// broad far arc rises above it. Planets and trail sample this exact function.
// Coordinates are world units, never separate overview slots.
export function orbitPoint(
  angle: number,
  narrow: boolean,
  aspect = narrow ? 0.462 : 16 / 9,
) {
  const q = (1 - Math.cos(angle)) / 2;
  const retreat = (1 - Math.exp(-12 * q)) / (1 - Math.exp(-12));
  const distance = 1 / ((1 - retreat) / 13 + retreat / 240);
  const lateral =
    ((narrow ? 0.173 : 0.191) * aspect * Math.sin(angle)) / (0.5 + q);
  const x = distance * (lateral + ((narrow ? 0.6 : 1.35) / 13) * (1 - retreat));
  const y =
    distance * ((-3.0 / 13) * (1 - retreat) + (0.23 + 0.025 * q) * retreat);
  return [x, y, 14 - distance] as const;
}

export function orbitPose(
  index: number,
  phase: number,
  narrow: boolean,
  aspect?: number,
) {
  const angle = wrapAngle((index - phase) * ORBIT_STEP);
  const rawFocus = Math.max(0, 1 - Math.abs(angle) / ORBIT_STEP);
  return {
    angle,
    focus: rawFocus * rawFocus * (3 - 2 * rawFocus),
    world: orbitPoint(angle, narrow, aspect),
  };
}
