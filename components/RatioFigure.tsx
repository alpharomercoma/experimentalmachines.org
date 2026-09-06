import { ratioPanels, type RatioPanel } from "@/lib/measurements";

// Three bands, one per scale: diverging bars on a log axis. Bars grow left
// for the ink chip and right for the blue chip; length is log10 of the
// winner's margin, with 100x reaching HALF percent of the track. Plain HTML
// so it reflows on a phone instead of scrolling. Hovering a track shows the
// measured pair behind the ratio.
const HALF = 40;
const MAX = 100;
const len = (r: number) => (Math.log10(Math.max(r, 1)) / Math.log10(MAX)) * HALF;
const ticks = [2, 10, 100];

function Band({ panel }: { panel: RatioPanel }) {
  return (
    <div className="grid gap-6 border-t border-rule py-8 md:grid-cols-[17rem_1fr] md:gap-12">
      <div>
        <h3 className="wide text-2xl font-bold tracking-tight">{panel.title}</h3>
        <ul className="mt-3 space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 bg-ink" aria-hidden />
            {panel.a} wins
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 bg-blue" aria-hidden />
            {panel.b} wins
          </li>
        </ul>
        <p className="mt-4 text-sm leading-6 text-ink-soft">{panel.note}</p>
      </div>
      <div className="grid grid-cols-1 gap-x-3 text-sm sm:grid-cols-[minmax(7rem,14rem)_1fr]">
        {panel.rows.map((r) => {
          const left = r.winner === "a";
          const l = len(r.ratio);
          const label = r.shown ?? `${r.ratio}x`;
          return (
            <div key={r.label} className="contents">
              <div className="pt-2 leading-tight text-ink sm:py-1.5 sm:text-right">{r.label}</div>
              <div className="group relative h-7 bg-plate sm:h-auto">
                {ticks.map((t) => (
                  <span key={t}>
                    <span aria-hidden className="absolute bottom-0 top-0 border-l border-dashed border-rule" style={{ left: `${50 - len(t)}%` }} />
                    <span aria-hidden className="absolute bottom-0 top-0 border-l border-dashed border-rule" style={{ left: `${50 + len(t)}%` }} />
                  </span>
                ))}
                <span aria-hidden className="absolute bottom-0 top-0 left-1/2 border-l border-ink" />
                <span
                  className={`absolute top-1/2 h-3.5 -translate-y-1/2 ${left ? "bg-ink" : "bg-blue"}`}
                  style={left ? { right: "50%", width: `${l}%` } : { left: "50%", width: `${l}%` }}
                  role="img"
                  aria-label={`${left ? panel.a : panel.b} by ${label}`}
                />
                <span
                  className={`absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-1.5 text-xs font-semibold tabular-nums ${left ? "text-ink" : "text-blue"}`}
                  style={left ? { right: `${50 + l}%` } : { left: `${50 + l}%` }}
                >
                  {label}
                </span>
                <span
                  className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 whitespace-nowrap border border-rule bg-plate px-2 py-1 text-xs text-ink opacity-0 transition-opacity group-hover:opacity-100 ${left ? "left-[52%]" : "right-[52%]"}`}
                >
                  <span className={`font-semibold tabular-nums ${left ? "text-ink" : "text-blue"}`}>
                    {left ? panel.a : panel.b} {r.values[left ? 0 : 1]} {r.unit}
                  </span>
                  <span className="text-ink-soft"> against </span>
                  <span className="tabular-nums">
                    {left ? panel.b : panel.a} {r.values[left ? 1 : 0]} {r.unit}
                  </span>
                  <span className="text-ink-soft">, {label}</span>
                </span>
              </div>
            </div>
          );
        })}
        <div className="hidden sm:block" />
        <div className="relative h-5 text-xs text-ink-soft">
          {ticks.map((t) => (
            <span key={t}>
              <span className={`absolute -translate-x-1/2 ${t === 2 ? "hidden sm:inline" : ""}`} style={{ left: `${50 - len(t)}%` }}>
                {t}x
              </span>
              <span className={`absolute -translate-x-1/2 ${t === 2 ? "hidden sm:inline" : ""}`} style={{ left: `${50 + len(t)}%` }}>
                {t}x
              </span>
            </span>
          ))}
          <span className="absolute left-1/2 -translate-x-1/2">even</span>
        </div>
      </div>
    </div>
  );
}

export default function RatioFigure() {
  return (
    <div className="border-b border-rule">
      {ratioPanels.map((p) => (
        <Band key={p.title} panel={p} />
      ))}
    </div>
  );
}
