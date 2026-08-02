import { site, work } from "@/lib/content";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-deep">
            Selected work
          </h2>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="text-sm text-ink-soft hover:text-ink"
          >
            All repositories &#8599;
          </a>
        </div>
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {work.map((w) => (
            <li key={w.name}>
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-1 py-5 sm:grid-cols-[16rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-medium group-hover:text-accent-deep">
                  {w.name}
                </span>
                <span className="text-sm text-ink-soft">{w.desc}</span>
                <span
                  aria-hidden
                  className="hidden text-ink-soft group-hover:text-accent-deep sm:inline"
                >
                  &#8599;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
