"use client";
import { useCallback, useEffect, useState } from "react";

// localStorage-backed state that never throws (private mode, blocked storage) and hydrates safely.
export function useLocal<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw) as T);
    } catch { /* ignore */ }
    setReady(true);
  }, [key]);

  const set = useCallback((next: T | ((p: T) => T)) => {
    setValue((prev) => {
      const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* ignore */ }
      return v;
    });
  }, [key]);

  return [value, set, ready] as const;
}
