import RatioFigure from "@/components/RatioFigure";
import ScaleFigure from "@/components/ScaleFigure";
import { site } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-14">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-24">
        <h1 className="wide max-w-4xl text-[2.6rem] font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          Independent benchmarks for AI hardware.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-ink-soft">
          {site.description}
        </p>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14">
        <h2 className="wide text-3xl font-bold tracking-tight sm:text-4xl">
          Six chips. Three scales. Measured, not quoted.
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-7 text-ink-soft">
          AMD against NVIDIA in a datacenter, Apple against Qualcomm on a
          laptop, Qualcomm against MediaTek in a phone.
        </p>
        <div className="mt-8">
          <ScaleFigure />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="wide text-3xl font-bold tracking-tight sm:text-4xl">
          Every lane, same pairs.
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-7 text-ink-soft">
          The headline number hides the interesting part. Bars grow toward the
          chip that wins, on a log scale.
        </p>
        <div className="mt-8">
          <RatioFigure />
        </div>
      </div>
    </section>
  );
}
