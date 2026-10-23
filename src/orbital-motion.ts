export const WORLD_COUNT = 5;
export const ORBIT_STEP = (Math.PI * 2) / WORLD_COUNT;
export const wrapAngle = (radians: number) =>
  Math.atan2(Math.sin(radians), Math.cos(radians));

// A single unwrapped phase drives every world, its overview marker and the ribbon.
export function nearestPhase(index: number, phase: number) {
  return index + Math.round((phase - index) / WORLD_COUNT) * WORLD_COUNT;
}

export function orbitPose(index: number, phase: number, narrow: boolean) {
  const angle = wrapAngle((index - phase) * ORBIT_STEP);
  const rawFocus = Math.max(0, 1 - Math.abs(angle) / ORBIT_STEP);
  const focus = rawFocus * rawFocus * (3 - 2 * rawFocus);
  const x = Math.sin(angle) * (narrow ? 2.0 : 6.1);
  const y = (narrow ? 3.35 : 2.75) + Math.cos(angle) * (narrow ? 0.18 : 0.35);
  const z = -2.5 + Math.cos(angle) * 2.5;
  const depth = 14;
  // Same physical radius throughout: apparent scale comes from camera distance.
  // Interpolate reciprocal depth so both outgoing and arriving worlds retain
  // cinematic presence at the midpoint, without changing their mesh radius.
  const distance = 1 / (focus / 13 + (1 - focus) / ((14 - z) * depth));
  const worldX =
    ((x / (14 - z)) * (1 - focus) + ((narrow ? 0.6 : 1.35) / 13) * focus) *
    distance;
  const worldY = ((y / (14 - z)) * (1 - focus) - (3.9 / 13) * focus) * distance;
  const worldZ = 14 - distance;
  return {
    angle,
    focus,
    overview: [x, y, z] as const,
    world: [worldX, worldY, worldZ] as const,
  };
}
