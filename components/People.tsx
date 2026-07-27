import { people } from "@/lib/content";

export default function People() {
  return (
    <section id="people" className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-deep">
          People
        </h2>
        <div className="mt-8 flex flex-wrap gap-4">
          {people.map((p) => (
            <div
              key={p.name}
              className="w-full max-w-xs border border-line p-5 sm:w-60"
            >
              <div className="font-medium">{p.name}</div>
              <div className="mt-0.5 text-sm text-ink-soft">{p.role}</div>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-sm font-medium text-accent-deep hover:underline"
              >
                LinkedIn &#8599;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
