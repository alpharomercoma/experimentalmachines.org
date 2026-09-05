import RatioFigure from "@/components/RatioFigure";
import ScaleFigure from "@/components/ScaleFigure";

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-14">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-14 sm:pt-20">
        <h1 className="wide max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
          LLM inference on datacenter, laptop and phone silicon.
        </h1>
        <div className="mt-10">
          <ScaleFigure />
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-6 pb-16">
        <h2 className="wide text-3xl font-bold tracking-tight sm:text-4xl">
          Winner and margin, every lane
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-7 text-ink-soft">
          Bars grow toward the chip that wins, on a log scale.
        </p>
        <div className="mt-8">
          <RatioFigure />
        </div>
      </div>
    </section>
  );
}
