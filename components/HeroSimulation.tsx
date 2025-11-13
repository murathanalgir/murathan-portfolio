"use client";

import { useEffect, useState } from "react";

type Stats = {
  cpu: number;
  memory: number;
  latency: number;
  buildsToday: number;
};

export default function HeroSimulation() {
  const [stats, setStats] = useState<Stats>({
    cpu: 18,
    memory: 42,
    latency: 120,
    buildsToday: 3,
  });

  useEffect(() => {
    const id = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(5, Math.min(95, prev.cpu + (Math.random() * 14 - 7))),
        memory: Math.max(20, Math.min(90, prev.memory + (Math.random() * 10 - 5))),
        latency: Math.max(40, Math.min(260, prev.latency + (Math.random() * 40 - 20))),
        buildsToday: prev.buildsToday + (Math.random() > 0.85 ? 1 : 0),
      }));
    }, 900);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-4 text-xs text-zinc-200 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-medium text-zinc-100">Dev runtime monitor</span>
        <span className="text-[10px] text-zinc-500">simulated</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Metric label="CPU load" value={`${stats.cpu.toFixed(0)}%`} />
        <Metric label="Memory usage" value={`${stats.memory.toFixed(0)}%`} />
        <Metric label="API latency" value={`${stats.latency.toFixed(0)} ms`} />
        <Metric label="Builds today" value={String(stats.buildsToday)} />
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-zinc-900">
        <div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 transition-all"
          style={{ width: `${stats.cpu}%` }}
        />
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <div className="text-[11px] text-zinc-400">{label}</div>
      <div className="text-sm font-semibold text-zinc-50">{value}</div>
    </div>
  );
}
