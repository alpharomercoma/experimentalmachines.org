# experimentalmachines.org

Site for Experimental Machines. Independent research across intelligence, compute, and data.

Next.js (App Router, TypeScript) + Tailwind CSS v4. Static content, no API routes.

## Develop

```bash
npm run dev
```

## Edit content

All copy, stats, and project links live in `lib/content.ts`. Benchmark chart data lives in `lib/benchmarks.ts`; each value traces to a published benchmark repo.

## Deploy

Pushes to `main` deploy to production via the Vercel Git integration. The `experimentalmachines.org` domain is attached in the Vercel project settings.
