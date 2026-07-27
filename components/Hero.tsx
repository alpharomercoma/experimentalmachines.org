import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-14">
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <h1 className="max-w-4xl text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl">
          {site.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
          {site.description} {site.edge}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}`}
            className="bg-ink px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent-deep"
          >
            {site.email}
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="border border-ink px-5 py-2.5 text-sm font-medium hover:border-accent-deep hover:text-accent-deep"
          >
            GitHub &#8599;
          </a>
        </div>
      </div>
    </section>
  );
}
