import { pillars } from "@/lib/content";

export default function Research() {
  return (
    <section id="research" className="scroll-mt-14 border-b border-line">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-deep">
          Research
        </h2>
        <div className="mt-8 divide-y divide-line border-t border-line">
          {pillars.map((p) => (
            <article
              key={p.title}
              className="grid gap-4 py-10 md:grid-cols-[8rem_1fr]"
            >
              <div className="text-sm font-medium text-ink-soft">{p.index}</div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 max-w-xl text-ink-soft">{p.claim}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {p.projects.map((pr) => (
                    <li key={pr.name}>
                      {pr.href ? (
                        <a
                          href={pr.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-medium text-accent-deep hover:underline"
                        >
                          {pr.name} &#8599;
                        </a>
                      ) : (
                        <span className="font-medium">{pr.name}</span>
                      )}
                      <span className="text-ink-soft"> &middot; {pr.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
