import { benchmarkGroups, benchmarkSources } from "@/lib/benchmarks";

export default function BenchmarkFigure() {
  return (
    <section aria-label="Measured benchmarks" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <h2 className="text-xl font-semibold tracking-tight">
            Inference, measured
          </h2>
          <p className="text-sm text-ink-soft">
            Methodology and raw logs:{" "}
            {benchmarkSources.map((s, i) => (
              <span key={s.name}>
                {i > 0 && ", "}
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-accent-deep hover:underline"
                >
                  {s.name}
                </a>
              </span>
            ))}
          </p>
        </div>
        <div className="mt-10 grid gap-x-12 gap-y-12 md:grid-cols-3">
          {benchmarkGroups.map((group) => {
            const max = Math.max(...group.entries.map((e) => e.value));
            return (
              <figure key={group.workload}>
                <figcaption className="text-sm text-ink-soft">
                  <span className="font-semibold text-ink">{group.scale}.</span>{" "}
                  {group.workload}{" "}
                  <span className="text-ink-soft/70">({group.unit})</span>
                </figcaption>
                <div className="mt-4 space-y-4">
                  {group.entries.map((e) => {
                    const lead = e.value === max;
                    return (
                      <div key={e.name}>
                        <div className="flex items-baseline justify-between gap-4 text-sm">
                          <span className="font-medium">{e.name}</span>
                          <span
                            className={
                              lead
                                ? "font-semibold text-accent-deep"
                                : "text-ink-soft"
                            }
                          >
                            {e.display}
                          </span>
                        </div>
                        <div className="mt-1.5 h-2.5 w-full bg-line/50">
                          <div
                            className={
                              lead
                                ? "h-full bg-accent"
                                : "h-full border border-ink/60 bg-paper"
                            }
                            style={{ width: `${(e.value / max) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
