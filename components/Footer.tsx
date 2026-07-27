import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-6 text-sm text-ink-soft">
        <span>
          {site.fullName} &copy; {new Date().getFullYear()}
        </span>
        <div className="flex gap-5">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-ink"
          >
            GitHub
          </a>
          <a href={`mailto:${site.email}`} className="hover:text-ink">
            {site.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
