export function readJSON(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or serialization error — swallow */
  }
}

export function remove(key) {
  try { localStorage.removeItem(key); } catch { /* noop */ }
}
