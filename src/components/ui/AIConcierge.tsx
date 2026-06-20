"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; text: string; mode?: string };

const suggestions = [
  "What is SikaChain?",
  "How do I become a genesis producer?",
  "Why launch in Ghana first?",
  "What's the difference from Sika App?",
];

export function AIConcierge() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [mode, setMode] = useState<"local" | "llm">("local");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Welcome. I'm your SikaChain guide — ask about the network, genesis producers, Ghana launch, or Sika App.",
    },
  ]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const ask = async (question: string) => {
    if (!question.trim() || typing) return;

    const userMessage = question.trim();
    setMessages((m) => [...m, { role: "user", text: userMessage }]);
    setInput("");
    setTyping(true);

    const history = [...messages, { role: "user" as const, text: userMessage }];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role, content: m.text })),
        }),
      });

      const data = (await res.json()) as {
        answer?: string;
        mode?: string;
        sources?: string[];
      };

      const answer = data.answer || "Sorry, I couldn't generate a response. Try another question.";
      const sources = data.sources?.length
        ? `\n\nExplore: ${data.sources.join(", ")}`
        : "";

      if (data.mode === "llm") setMode("llm");

      if (!reduceMotion) {
        await new Promise((r) => setTimeout(r, 400));
      }

      setMessages((m) => [
        ...m,
        { role: "assistant", text: answer + sources, mode: data.mode },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "I'm having trouble connecting. Please try again in a moment.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const panelVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 16, scale: 0.96 },
      visible: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: 12, scale: 0.98 },
    }),
    [],
  );

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel glow-gold flex w-[min(100vw-2rem,24rem)] flex-col overflow-hidden shadow-2xl"
          >
            <div className="border-b border-white/10 bg-white/[0.04] px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sika-gold/30 to-sika-green/20">
                    <span className="absolute inset-0 animate-pulse-soft rounded-2xl bg-sika-gold/20" />
                    <svg viewBox="0 0 24 24" className="relative h-5 w-5 text-sika-gold" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M12 3c4 0 7 2.5 7 6.5 0 2.2-1.1 4.1-2.8 5.3V18l-4.2 3-4.2-3v-3.2C6.1 13.6 5 11.7 5 9.5 5 5.5 8 3 12 3z" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-sika-cream">SikaChain Guide</p>
                    <p className="text-[11px] text-sika-cream/50">
                      {mode === "llm" ? "AI · powered by LLM" : "AI concierge · instant answers"}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full px-2 py-1 text-sika-cream/50 hover:text-sika-cream"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                    msg.role === "assistant"
                      ? "glass-inset mr-6 text-sika-cream/85"
                      : "ml-6 bg-sika-gold/15 text-sika-cream"
                  }`}
                >
                  {msg.text.split("\n").map((line, li) => (
                    <p key={li} className={li > 0 ? "mt-2" : undefined}>
                      {line.startsWith("Explore:") ? (
                        <>
                          Explore:{" "}
                          {line
                            .replace("Explore:", "")
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean)
                            .map((path, pi) => (
                              <span key={path}>
                                {pi > 0 && ", "}
                                <Link href={path} className="text-sika-gold hover:underline">
                                  {path}
                                </Link>
                              </span>
                            ))}
                        </>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              ))}
              {typing && (
                <div className="glass-inset mr-6 flex gap-1 rounded-2xl px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-sika-gold/70"
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] text-sika-cream/70 transition hover:border-sika-gold/30 hover:text-sika-gold"
                >
                  {s}
                </button>
              ))}
            </div>

            <form
              className="flex gap-2 border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about SikaChain..."
                className="glass-input flex-1 rounded-xl px-3 py-2.5 text-sm"
                disabled={typing}
              />
              <button type="submit" disabled={typing} className="btn-primary shrink-0 px-4 py-2.5 text-xs disabled:opacity-60">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        whileHover={reduceMotion ? undefined : { scale: 1.04 }}
        whileTap={reduceMotion ? undefined : { scale: 0.97 }}
        className="glass-panel glow-gold group flex h-14 w-14 items-center justify-center rounded-full shadow-xl"
        aria-label={open ? "Close SikaChain guide" : "Open SikaChain guide"}
      >
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="text-2xl font-light text-sika-gold"
        >
          {open ? "×" : "✦"}
        </motion.span>
      </motion.button>
    </div>
  );
}
