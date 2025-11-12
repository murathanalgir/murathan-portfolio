const memory = new Map<string,{count:number;until:number}>();

export function limit(ip: string, windowMs=60_000, max=5) {
  const now = Date.now();
  const b = memory.get(ip);
  if (!b || b.until < now) {
    memory.set(ip, { count: 1, until: now + windowMs });
    return { ok: true as const };
  }
  if (b.count >= max) {
    return { ok: false as const, retryAfter: Math.ceil((b.until-now)/1000) };
  }
  b.count++;
  memory.set(ip, b);
  return { ok: true as const };
}
