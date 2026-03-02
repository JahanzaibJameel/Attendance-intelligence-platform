export function createId(prefix: string, suffix?: string): string {
  const base = `${prefix}_${Date.now()}`;
  return suffix ? `${base}_${suffix}` : base;
}

