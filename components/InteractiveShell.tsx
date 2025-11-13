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

const commands = ["help", "projects", "blog", "contact", "clear", "exit"];

export default function InteractiveShell({ open, onClose }: Props) {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [current, setCurrent] = useState("");
  const [booted, setBooted] = useState(false);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    if (booted) return;
    setBooted(true);

    const sequence = [
      "booting murathan-shell v1.0.0 ...",
      "loading modules [next, ts, node, mongo] ...",
      "establishing dev tunnel ... ok",
      "type `help` to get started.",
    ];

    sequence.forEach((text, index) => {
      setTimeout(() => {
        setEntries(prev => [...prev, { type: "output", text }]);
      }, 220 * index);
    });
  }, [open, booted]);

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
      pushEntry({ type: "output", text: "navigating to /projects ..." });
      router.push("/projects");
    } else if (cmd === "blog") {
      pushEntry({ type: "output", text: "navigating to /blog ..." });
      router.push("/blog");
    } else if (cmd === "contact") {
      pushEntry({ type: "output", text: "navigating to /contact ..." });
      router.push("/contact");
    } else if (cmd === "clear") {
      setEntries([]);
    } else if (cmd === "exit") {
      onClose();
    } else {
      pushEntry({ type: "output", text: `unknown command: ${cmd}` });
    }
  }

  function handleAutocomplete() {
    const trimmed = current.trimStart();
    if (!trimmed) return;

    const matches = commands.filter(c => c.startsWith(trimmed));

    if (matches.length === 1) {
      setCurrent(matches[0] + " ");
    } else if (matches.length > 1) {
      const listing =
        "suggestions:\n" +
        matches.map(c => `  ${c}`).join("\n");
      pushEntry({ type: "output", text: listing });
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = current;
    setCurrent("");
    handleCommand(value);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Tab") {
      e.preventDefault();
      handleAutocomplete();
    }
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 backdrop-blur-sm">
      <div className="mb-6 w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/95 text-xs text-zinc-100 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-[11px] font-semibold">murathan-shell</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-md border border-zinc-700 px-2 py-1 text-[11px] text-zinc-300 hover:border-zinc-500 hover:text-white"
          >
            Close
          </button>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-sky-400 to-fuchsia-400 animate-pulse" />
        <div className="max-h-64 overflow-y-auto px-3 pt-3 pb-2 font-mono text-[11px]">
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
        <form onSubmit={onSubmit} className="border-t border-zinc-800 px-3 py-2">
          <div className="flex items-center gap-2 rounded-md bg-black/60 px-3 py-2 font-mono text-[11px]">
            <span className="text-emerald-400">λ</span>
            <input
              autoFocus
              value={current}
              onChange={e => setCurrent(e.target.value)}
              onKeyDown={onKeyDown}
              className="flex-1 bg-transparent text-zinc-100 outline-none"
              placeholder="type a command, Tab for autocomplete, Esc or `exit` to close"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
