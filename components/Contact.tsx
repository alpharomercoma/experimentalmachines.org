import { site } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-14">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-accent-deep">
          Contact
        </h2>
        <p className="mt-6 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
          Have a claim worth testing?
        </p>
        <a
          href={`mailto:${site.email}`}
          className="mt-4 inline-block text-xl text-accent-deep underline underline-offset-4 hover:text-ink sm:text-2xl"
        >
          {site.email}
        </a>
      </div>
    </section>
  );
}
