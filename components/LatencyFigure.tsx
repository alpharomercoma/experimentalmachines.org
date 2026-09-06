"use client";

import { useEffect, useRef, useState } from "react";
import { chips, latency, type Cell } from "@/lib/latency";

// Five small panels, one per model: a chip per row, two log tracks per row
// (first token in seconds, per token in ms). Each track is a dumbbell, a
// disc for llama.cpp and a ring for ExecuTorch. HTML with percentage
// positions so it reflows on a phone. Hover, tap or focus a mark for its
// number; the tap toggles so it works without a pointer.
const TTFT = { min: 0.25, max: 20, ticks: [0.3, 1, 3, 10] };
const TPOT = { min: 15, max: 300, ticks: [20, 50, 100, 200] };
type Scale = typeof TTFT;

const pct = (v: number, s: Scale) =>
  ((Math.log10(v) - Math.log10(s.min)) / (Math.log10(s.max) - Math.log10(s.min))) * 100;
const fmtT = (v: number) => `${v.toFixed(2)} s`;
const fmtP = (v: number) => `${v} ms, ${(1000 / v).toFixed(1)} tok/s`;

type Active = string | null;

function Mark({
  id,
  x,
  runtime,
  chip,
  value,
  active,
  setActive,
  pointerRef,
}: {
  id: string;
  x: number;
  runtime: "llama.cpp" | "ExecuTorch";
  chip: string;
  value: string;
  active: Active;
  setActive: (a: Active) => void;
  pointerRef: React.RefObject<string>;
}) {
  const on = active === id;
  const disc = runtime === "llama.cpp";
  // Keep the tip inside the track near either edge.
  const tipPos = x < 30 ? "left-0" : x > 70 ? "right-0" : "left-1/2 -translate-x-1/2";
  return (
    <span className="absolute top-0 h-full" style={{ left: `${x}%` }}>
      <button
        type="button"
        data-mark
        aria-label={`${chip}, ${runtime}: ${value}`}
        aria-expanded={on}
        className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full focus-visible:outline-none"
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setActive(id);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setActive(null);
        }}
        onClick={() => setActive(pointerRef.current === "mouse" ? id : on ? null : id)}
        onFocus={() => {
          if (pointerRef.current === "keyboard") setActive(id);
        }}
        onBlur={() => setActive(null)}
      >
        <span
          aria-hidden
          className={`block rounded-full transition-transform ${
            disc ? "h-2.5 w-2.5 bg-ink" : "h-3.5 w-3.5 border-2 border-blue bg-plate/0"
          } ${on ? "scale-150" : ""}`}
        />
      </button>
      {on && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute bottom-full z-20 mb-1 whitespace-nowrap bg-ink px-2 py-1 text-xs leading-4 text-plate ${tipPos}`}
        >
          <span className="block text-plate/70">
            {chip}, {runtime}
          </span>
          <span className="block font-semibold tabular-nums">{value}</span>
        </span>
      )}
    </span>
  );
}

function Track({
  scale,
  a,
  b,
  fmt,
  chip,
  id,
  active,
  setActive,
  pointerRef,
}: {
  scale: Scale;
  a: number;
  b: number;
  fmt: (v: number) => string;
  chip: string;
  id: string;
  active: Active;
  setActive: (a: Active) => void;
  pointerRef: React.RefObject<string>;
}) {
  const xa = pct(a, scale);
  const xb = pct(b, scale);
  return (
    <div className="relative h-7">
      {scale.ticks.map((t) => (
        <span key={t} aria-hidden className="absolute bottom-0 top-0 border-l border-dashed border-rule" style={{ left: `${pct(t, scale)}%` }} />
      ))}
      <span
        aria-hidden
        className="absolute top-1/2 h-px bg-ink-soft"
        style={{ left: `${Math.min(xa, xb)}%`, width: `${Math.abs(xa - xb)}%` }}
      />
      <Mark id={`${id}|et`} x={xb} runtime="ExecuTorch" chip={chip} value={fmt(b)} active={active} setActive={setActive} pointerRef={pointerRef} />
      <Mark id={`${id}|llama`} x={xa} runtime="llama.cpp" chip={chip} value={fmt(a)} active={active} setActive={setActive} pointerRef={pointerRef} />
    </div>
  );
}

function Ticks({ scale, label }: { scale: Scale; label: string }) {
  return (
    <div>
      <div className="text-xs text-ink-soft">{label}</div>
      <div className="relative mt-1 h-4 text-[11px] text-ink-soft">
        {scale.ticks.map((t) => (
          <span key={t} className="absolute -translate-x-1/2 tabular-nums" style={{ left: `${pct(t, scale)}%` }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function LatencyFigure() {
  const [active, setActive] = useState<Active>(null);
  const pointerRef = useRef("mouse");

  // Remember how the page was last touched, so a tap toggles a tip, a
  // mouse click just opens it, and focus opens it only when it came from
  // the keyboard (a tap also focuses the button, which would otherwise
  // open and then toggle shut). A tap outside any mark, or Escape, closes
  // an open tip.
  useEffect(() => {
    const down = (e: PointerEvent) => {
      pointerRef.current = e.pointerType;
      if (!(e.target as Element | null)?.closest("[data-mark]")) setActive(null);
    };
    const key = (e: KeyboardEvent) => {
      pointerRef.current = "keyboard";
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("pointerdown", down);
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("keydown", key);
    };
  }, []);

  return (
    <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {latency.map((m) => (
        <div key={m.name} className="border-t border-rule pt-4">
          <h3 className="font-semibold">{m.name}</h3>
          <div className="mt-3 grid grid-cols-[5.5rem_1fr_1fr] gap-x-4 text-sm">
            <div />
            <Ticks scale={TTFT} label="First token, s" />
            <Ticks scale={TPOT} label="Per token, ms" />
            {chips.map((c, i) => {
              const l: Cell = m.llama[i];
              const e: Cell = m.et[i];
              const id = `${m.name}|${c.short}`;
              return (
                <div key={c.short} className="contents">
                  <div className="flex h-7 items-center text-ink-soft">{c.short}</div>
                  <Track scale={TTFT} a={l[0]} b={e[0]} fmt={fmtT} chip={c.name} id={`${id}|t`} active={active} setActive={setActive} pointerRef={pointerRef} />
                  <Track scale={TPOT} a={l[1]} b={e[1]} fmt={fmtP} chip={c.name} id={`${id}|p`} active={active} setActive={setActive} pointerRef={pointerRef} />
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="border-t border-rule pt-4 text-sm leading-6 text-ink-soft">
        <ul className="space-y-1">
          <li className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-ink" aria-hidden />
            llama.cpp
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-blue" aria-hidden />
            ExecuTorch
          </li>
        </ul>
        <p className="mt-4">
          Both axes are log scales, shared across the five panels. Hover or
          tap a mark for its number.
        </p>
        <p className="mt-3">
          Conditions are not matched. The Dimensity 9400 ran in hand under a
          fan; the other four ran racked in cloud test labs, where phones
          throttle within about 40 seconds. Single pass, 2026-09-03 and 04.
        </p>
      </div>
    </div>
  );
}
