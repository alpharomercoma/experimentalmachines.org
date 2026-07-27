import { principles } from "@/lib/content";

export default function Principles() {
  return (
    <section aria-label="Principles" className="border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {principles.map((p) => (
            <div key={p.title}>
              <h3 className="font-semibold text-accent-deep">{p.title}.</h3>
              <p className="mt-2 max-w-xs text-sm leading-6 text-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
