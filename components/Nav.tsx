import { site } from "@/lib/content";

const links = [
  { href: "#research", label: "Research" },
  { href: "#work", label: "Work" },
  { href: "#people", label: "People" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <nav
        aria-label="Main"
        className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight sm:text-base"
        >
          <span aria-hidden className="block h-3 w-3 bg-accent" />
          {site.name}
        </a>
        <div className="flex items-center gap-5 text-sm sm:gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hidden text-ink-soft hover:text-ink sm:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="text-ink-soft hover:text-ink sm:hidden"
          >
            Contact
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-accent-deep hover:text-ink"
          >
            GitHub
          </a>
        </div>
      </nav>
    </header>
  );
}
