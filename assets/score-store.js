export function loadBestScore(storage, key) {
  try {
    const value = Number.parseInt(storage.getItem(key) ?? "0", 10);
    return Number.isSafeInteger(value) && value > 0 ? value : 0;
  } catch {
    return 0;
  }
}

export function saveBestScore(storage, key, score) {
  try {
    storage.setItem(key, String(score));
  } catch {
    // A private or restricted browser context can disable storage; gameplay continues.
  }
}
