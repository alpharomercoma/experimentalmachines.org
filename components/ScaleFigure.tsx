import { laptopDecode, phoneDecode, serverSweep } from "@/lib/measurements";

// One SVG, three panels, three scales. Server is a throughput curve over
// concurrency; laptop and phone are paired bars. Chip A is ink, chip B is blue.
const W = 1200;
const H = 424;
const TOP = 96;
const BOTTOM = 80;
const PLOT = H - TOP - BOTTOM;
const INK = "#121614";
const BLUE = "#1e4fd8";
const SOFT = "#4a524c";

function Legend({ x, a, b }: { x: number; a: string; b: string }) {
  return (
    <g fontSize={14}>
      <rect x={x} y={TOP - 34} width={12} height={12} fill={INK} />
      <text x={x + 18} y={TOP - 23} fill={INK}>
        {a}
      </text>
      <rect x={x + 18 + a.length * 7.2 + 16} y={TOP - 34} width={12} height={12} fill={BLUE} />
      <text x={x + 18 + a.length * 7.2 + 34} y={TOP - 23} fill={INK}>
        {b}
      </text>
    </g>
  );
}

function Bars({
  x,
  w,
  groups,
  max,
}: {
  x: number;
  w: number;
  groups: { label: string; a: number; b: number; la?: string; lb?: string }[];
  max: number;
}) {
  const gw = w / groups.length;
  const bw = Math.min(56, gw / 3);
  return (
    <g>
      {groups.map((g, i) => {
        const cx = x + gw * i + gw / 2;
        const ha = (g.a / max) * PLOT;
        const hb = (g.b / max) * PLOT;
        return (
          <g key={g.label} fontSize={14}>
            <rect x={cx - bw - 3} y={TOP + PLOT - ha} width={bw} height={ha} fill={INK} />
            <rect x={cx + 3} y={TOP + PLOT - hb} width={bw} height={hb} fill={BLUE} />
            <text x={cx - 3 - bw / 2} y={TOP + PLOT - ha - 8} textAnchor="middle" fill={INK}>
              {g.la ?? Math.round(g.a)}
            </text>
            <text x={cx + 3 + bw / 2} y={TOP + PLOT - hb - 8} textAnchor="middle" fill={BLUE}>
              {g.lb ?? Math.round(g.b)}
            </text>
            <text x={cx} y={TOP + PLOT + 20} textAnchor="middle" fill={SOFT}>
              {g.label}
            </text>
          </g>
        );
      })}
    </g>
  );
}

export default function ScaleFigure() {
  const panels = [
    { title: "Server", x: 0, w: 480 },
    { title: "Laptop", x: 500, w: 340 },
    { title: "Phone", x: 860, w: 340 },
  ];
  const s = serverSweep;
  const sMax = Math.max(...s.h200);
  const px = (i: number) => panels[0].x + 24 + (i / (s.concurrency.length - 1)) * (panels[0].w - 124);
  const py = (v: number) => TOP + PLOT - (v / sMax) * PLOT;
  const line = (vals: number[]) =>
    vals.map((v, i) => `${i ? "L" : "M"}${px(i).toFixed(1)},${py(v).toFixed(1)}`).join(" ");

  return (
    <figure>
      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="Benchmark figure, scrolls sideways on small screens"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Three measured comparisons. Server: H200 and MI300X output tokens per second across concurrency 1 to 256, H200 ahead at every point. Laptop: Apple M5 beats Snapdragon X2 Elite on GPU token generation for a 1B and an 8B model. Phone: Snapdragon 8 Elite beats Dimensity 9500s on CPU and GPU token generation."
          className="w-full min-w-[52rem]"
        >
          {panels.map((p) => (
            <g key={p.title}>
              <rect x={p.x} y={TOP} width={p.w} height={PLOT} fill="#ffffff" />
              <line x1={p.x} y1={TOP + PLOT} x2={p.x + p.w} y2={TOP + PLOT} stroke="#d6dad4" />
              <text x={p.x} y={TOP - 62} fontSize={22} fontWeight={700} fill={INK}>
                {p.title}
              </text>
            </g>
          ))}

          {[5000, 10000].map((v) => (
            <g key={v} fontSize={13}>
              <line x1={panels[0].x} y1={py(v)} x2={panels[0].x + panels[0].w} y2={py(v)} stroke="#d6dad4" strokeDasharray="3 4" />
              <text x={panels[0].x + 6} y={py(v) - 5} fill={SOFT}>
                {v.toLocaleString()} tok/s
              </text>
            </g>
          ))}
          <Legend x={panels[0].x} a="NVIDIA H200" b="AMD MI300X" />
          <path d={line(s.h200)} fill="none" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
          <path d={line(s.mi300x)} fill="none" stroke={BLUE} strokeWidth={2.5} strokeLinejoin="round" />
          {s.concurrency.map((c, i) => (
            <g key={c} fontSize={14}>
              <circle cx={px(i)} cy={py(s.h200[i])} r={3.5} fill={INK} />
              <circle cx={px(i)} cy={py(s.mi300x[i])} r={3.5} fill={BLUE} />
              <text x={px(i)} y={TOP + PLOT + 20} textAnchor="middle" fill={SOFT}>
                {c}
              </text>
            </g>
          ))}
          <text x={px(7) + 10} y={py(s.h200[7]) + 5} fontSize={14} fill={INK}>
            {s.h200[7].toLocaleString()} tok/s
          </text>
          <text x={px(7) + 10} y={py(s.mi300x[7]) + 5} fontSize={14} fill={BLUE}>
            {s.mi300x[7].toLocaleString()} tok/s
          </text>
          <text x={panels[0].x} y={H - 28} fontSize={14} fill={SOFT}>
            Aggregate tok/s over all streams. Concurrency doubles per step.
          </text>
          <text x={panels[0].x} y={H - 10} fontSize={14} fill={SOFT}>
            Llama 3.1 8B BF16, vLLM, 1k in / 1k out
          </text>

          <Legend x={panels[1].x} a="Apple M5" b="Snapdragon X2 Elite" />
          <Bars
            x={panels[1].x}
            w={panels[1].w}
            max={160}
            groups={laptopDecode.groups.map((g) => ({ label: g.label, a: g.m5, b: g.x2 }))}
          />
          <text x={panels[1].x} y={H - 28} fontSize={14} fill={SOFT}>
            Token generation, one stream, tok/s
          </text>
          <text x={panels[1].x} y={H - 10} fontSize={14} fill={SOFT}>
            llama.cpp on each chip&apos;s GPU
          </text>

          <Legend x={panels[2].x} a="Snapdragon 8 Elite" b="Dimensity 9500s" />
          <Bars
            x={panels[2].x}
            w={panels[2].w}
            max={70}
            groups={phoneDecode.groups.map((g) => ({ label: g.label, a: g.elite, b: g.dimensity, la: g.eliteLabel, lb: g.dimensityLabel }))}
          />
          <text x={panels[2].x} y={H - 28} fontSize={14} fill={SOFT}>
            Gemma 3 1B Q4, one stream, tok/s
          </text>
          <text x={panels[2].x} y={H - 10} fontSize={14} fill={SOFT}>
            llama.cpp on the phone, range across runs
          </text>
        </svg>
      </div>
      <figcaption className="mt-3 text-sm text-ink-soft">
        Server throughput is the sum over all concurrent streams; laptop and
        phone are one stream each. Every value is from the linked repository.
      </figcaption>
    </figure>
  );
}
