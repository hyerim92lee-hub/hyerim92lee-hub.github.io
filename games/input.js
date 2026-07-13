const KEY_DIRECTIONS = {
  ArrowUp: "up",
  ArrowRight: "right",
  ArrowDown: "down",
  ArrowLeft: "left",
  w: "up",
  d: "right",
  s: "down",
  a: "left",
};

export function directionFromKey(key) {
  return KEY_DIRECTIONS[key] ?? KEY_DIRECTIONS[key.toLowerCase?.()] ?? null;
}

export function directionFromSwipe(start, end, threshold = 18) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < threshold) return null;
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? "right" : "left";
  return dy > 0 ? "down" : "up";
}
