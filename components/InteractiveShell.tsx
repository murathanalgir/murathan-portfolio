"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Entry = {
  type: "input" | "output";
  text: string;
};

const helpText = [
  "Available commands:",
  "  help      Show this help",
  "  projects  Go to /projects",
  "  blog      Go to /blog",
  "  contact   Go to /contact",
  "  clear     Clear the terminal",
  "  exit      Close the terminal",
].join("\n");

export default function InteractiveShell({ open, onClose }: Props) {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([
    { type: "output", text: "murathan-shell v1.0.0" },
    { type: "output", text: "Type `help` to get started." },
  ]);
  const [current, setCurrent] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [entries, open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  function pushEntry(entry: Entry) {
    setEntries(prev => [...prev, entry]);
  }

  function handleCommand(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    if (!cmd) return;

    pushEntry({ type: "input", text: cmd });

    if (cmd === "help") {
      pushEntry({ type: "output", text: helpText });
    } else if (cmd === "projects") {
      pushEntry({ type: "output", text: "Navigating to /projects..." });
      router.push("/projects");
    } else if (cmd === "blog") {
      pushEntry({ type: "output", text: "Navigating to /blog..." });
      router.push("/blog");
    } else if (cmd === "contact") {
      pushEntry({ type: "output", text: "Navigating to /contact..." });
      router.push("/contact");
    } else if (cmd === "clear") {
      setEntries([]);
    } else if (cmd === "exit") {
      onClose();
    } else {
      pushEntry({ type: "output", text: `Unknown command: ${cmd}` });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = current;
    setCurrent("");
    handleCommand(value);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="mb-6 w-full max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-950/95 p-4 text-xs text-zinc-100 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-semibold">murathan-shell</span>
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-700 px-2 py-1 text-[11px] text-zinc-300 hover:border-zinc-500 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="max-h-64 overflow-y-auto rounded-md bg-black/40 p-3 font-mono text-[11px]">
          {entries.map((entry, idx) => (
            <div key={idx} className="whitespace-pre-wrap">
              {entry.type === "input" ? (
                <span>
                  <span className="text-emerald-400">murathan@portfolio</span>
                  <span className="text-zinc-500"> $ </span>
                  {entry.text}
                </span>
              ) : (
                <span>{entry.text}</span>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <form onSubmit={onSubmit} className="mt-3">
          <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-black/60 px-3 py-2 font-mono text-[11px]">
            <span className="text-emerald-400">λ</span>
            <input
              autoFocus
              value={current}
              onChange={e => setCurrent(e.target.value)}
              className="flex-1 bg-transparent text-zinc-100 outline-none"
              placeholder="Type a command, e.g. `projects` or `help`"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
