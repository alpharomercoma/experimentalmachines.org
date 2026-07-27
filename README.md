# alphaexperimental.org

Site for Alpha Experimental Machines, an independent research lab for multimodal intelligence, accelerated computing, and open data systems.

Next.js (App Router, TypeScript) + Tailwind CSS v4. Static content, no API routes.

## Develop

```bash
npm run dev
```

## Edit content

All copy, stats, and project links live in `lib/content.ts`. Benchmark chart data lives in `lib/benchmarks.ts`; each value traces to a published benchmark repo.

## Deploy

```bash
vercel deploy
```

Attach the `alphaexperimental.org` domain in the Vercel project settings.
