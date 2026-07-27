import { stats } from "@/lib/content";

export default function Stats() {
  return (
    <section aria-label="Lab metrics" className="border-y border-line">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-x-6 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-8 ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""}`}
          >
            <div className="text-3xl font-semibold tracking-tight text-accent-deep">
              {s.value}
            </div>
            <div className="mt-1.5 text-sm leading-5 text-ink-soft">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
