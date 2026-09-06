import type { Metadata } from "next";
import FactsStrip from "@/components/asic/FactsStrip";
import ServingFigure from "@/components/asic/ServingFigure";
import SpecDecodeFigure from "@/components/asic/SpecDecodeFigure";
import TrainingFigure from "@/components/asic/TrainingFigure";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { decision, neuronLinks } from "@/lib/neuron";

export const metadata: Metadata = {
  title: "GPU against ASIC",
  description:
    "Llama 3.1 8B trained on one AWS Trainium and served on one Inferentia, measured beside one MI300X and one H200.",
};

function Section({ id, title, lede, children }: { id: string; title: string; lede?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-14 border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16">
        <h2 className="wide text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {lede && <p className="mt-3 max-w-2xl text-lg leading-7 text-ink-soft">{lede}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default function Asic() {
  return (
    <>
      <Nav />
      <main>
        <section id="top" className="scroll-mt-14">
          <div className="mx-auto max-w-6xl px-6 pb-14 pt-14 sm:pt-20">
            <h1 className="wide max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              Llama 3.1 8B on AWS Trainium and Inferentia.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-7 text-ink-soft">
              One trn1.2xlarge fine-tunes the model, one inf2.xlarge serves it, one trn2.3xlarge repeats the fine-tune, and every number has a committed log in{" "}
              <a href={neuronLinks.repo} target="_blank" rel="noreferrer" className="text-blue hover:text-blue-deep">
                torchneuronx
              </a>
              . The GPU points come from{" "}
              <a href={neuronLinks.gpuRepo} target="_blank" rel="noreferrer" className="text-blue hover:text-blue-deep">
                MI300X-vs-H200
              </a>
              , which used the same request shape and metric schema. The conditions that differ are listed under the first figure. The{" "}
              <a href={neuronLinks.deck} target="_blank" rel="noreferrer" className="text-blue hover:text-blue-deep">
                talk
              </a>{" "}
              covers the same material.
            </p>
          </div>
        </section>
        <Section id="serving" title="Serving one 8B model, and what a token costs">
          <ServingFigure />
        </Section>
        <Section id="training" title="Training on one Trainium1 and one Trainium2">
          <TrainingFigure />
        </Section>
        <Section id="specdec" title="Speculative decoding on one Trainium1">
          <SpecDecodeFigure />
        </Section>
        <Section id="facts" title="Compile cost, quality and stability">
          <FactsStrip />
        </Section>
        <Section id="fit" title="Where it fit, on this evidence">
          <table className="w-full max-w-4xl border-collapse text-sm">
            <tbody>
              {decision.map((d) => (
                <tr key={d[0]} className="border-b border-rule align-top">
                  <td className="py-2.5 pr-6">{d[0]}</td>
                  <td className={`py-2.5 sm:w-[24rem] ${/blocked|wall|cheaper/.test(d[1]) ? "text-ink-soft" : "font-medium"}`}>{d[1]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-ink-soft">
            Most of the study&apos;s walls were toolchain, not silicon: an exporter allowlist, ahead-of-time compilation per tensor shape, and a training class without generate(). The instances were terminated on 2026-08-26; the analysis re-runs from the committed results with no AWS account.
          </p>
        </Section>
      </main>
      <Footer />
    </>
  );
}
