// Every value is copied from a published benchmark repository.
// Server: MI300X-vs-H200 REPORT.md section 4.1 (Llama 3.1 8B BF16, vLLM,
//   1k in / 1k out, output tokens/s) and section 5 (Llama 3.3 70B FP8).
// Laptop: snapdragon-vs-m5 shared/comparison.txt (llama.cpp b10152, GPU).
// Phone: snapdragon-vs-mediatek README (llama.cpp, Gemma 3 1B Q4, on device).

export const serverSweep = {
  concurrency: [1, 4, 8, 16, 32, 64, 128, 256],
  h200: [199, 761, 1445, 2674, 4486, 6806, 9937, 11337],
  mi300x: [195, 603, 1137, 2066, 3443, 4956, 7022, 8085],
};

export const laptopDecode = {
  groups: [
    { label: "Gemma 3 1B Q4", m5: 143.8, x2: 74.5 },
    { label: "Qwen3 8B Q4", m5: 25.6, x2: 18.2 },
  ],
};

// The README reports ranges across runs; bars sit at the midpoint and the
// labels show the range.
export const phoneDecode = {
  groups: [
    { label: "CPU", elite: 63, eliteLabel: "62 to 64", dimensity: 26.5, dimensityLabel: "22 to 31" },
    { label: "GPU", elite: 42, eliteLabel: "41.5 to 42.5", dimensity: 27, dimensityLabel: "~27" },
  ],
};

// Second figure: who wins each lane, and by how much. Ratios are winner over
// loser, copied or computed from the same three reports. "a" is the ink chip,
// "b" the blue chip, matching the first figure.
// `values` is the measured pair behind the ratio, [a, b] with a unit, shown
// on hover. Phone values are the published ranges.
type RatioRow = {
  label: string;
  winner: "a" | "b";
  ratio: number;
  shown?: string;
  values: [string, string];
  unit: string;
};

export type RatioPanel = {
  title: string;
  a: string;
  b: string;
  rows: RatioRow[];
  note: string;
};

export const ratioPanels: RatioPanel[] = [
  {
    title: "Server",
    a: "NVIDIA H200",
    b: "AMD MI300X",
    rows: [
      { label: "MoE decode, 1 stream", winner: "a", ratio: 2.72, values: ["229", "84"], unit: "tok/s" },
      { label: "8B prefill-heavy, 256 streams", winner: "a", ratio: 2.06, values: ["1,740", "847"], unit: "tok/s" },
      { label: "8B balanced, 256 streams", winner: "a", ratio: 1.4, values: ["11,337", "8,085"], unit: "tok/s" },
      { label: "8B training, BF16", winner: "a", ratio: 1.4, shown: "1.32 to 1.40x", values: ["6,707 eager, 7,822 compiled", "5,102 eager, 5,603 compiled"], unit: "tok/s" },
      { label: "70B FP8 balanced, 128 streams", winner: "b", ratio: 1.14, values: ["1,637", "1,873"], unit: "tok/s" },
      { label: "70B FP8 decode-heavy, 256 streams", winner: "b", ratio: 1.08, values: ["763", "827"], unit: "tok/s" },
      { label: "70B FP8 first token p99, 1k in, 8k out", winner: "b", ratio: 62.9, values: ["2,200.5", "35.0"], unit: "s" },
    ],
    note: "The answer flips with model size: 70B plus its KV cache no longer fits in 141 GB. 70B BF16 loads only on the MI300X.",
  },
  {
    title: "Laptop",
    a: "Apple M5",
    b: "Snapdragon X2 Elite",
    rows: [
      { label: "GPU prefill, Gemma 3 1B", winner: "a", ratio: 2.92, values: ["5,603.7", "1,920.5"], unit: "tok/s" },
      { label: "GPU decode, Gemma 3 1B", winner: "a", ratio: 1.93, values: ["143.8", "74.5"], unit: "tok/s" },
      { label: "CPU decode, Gemma 3 1B", winner: "b", ratio: 1.1, values: ["116.3", "127.9"], unit: "tok/s" },
      { label: "CPU prefill, Gemma 3 1B", winner: "b", ratio: 1.9, values: ["889.2", "1,689.3"], unit: "tok/s" },
      { label: "NPU fp16 GEMM", winner: "b", ratio: 1.08, values: ["14,137", "15,205"], unit: "GFLOP/s" },
      { label: "Training, PyTorch", winner: "a", ratio: 19.5, values: ["28,060", "1,436"], unit: "tok/s" },
    ],
    note: "The Snapdragon wins the CPU and the NPU. Training is 19.5x because PyTorch has no Adreno backend, so the X2 trains on its CPU.",
  },
  {
    title: "Phone",
    a: "Snapdragon 8 Elite",
    b: "Dimensity 9500s",
    rows: [
      { label: "NPU int8 dense", winner: "a", ratio: 2.9, values: ["4,307", "1,100 to 1,470"], unit: "GOPS" },
      { label: "CPU prefill, Gemma 3 1B", winner: "a", ratio: 2.6, values: ["171 to 173", "58 to 74"], unit: "tok/s" },
      { label: "CPU decode, Gemma 3 1B", winner: "a", ratio: 2.4, values: ["62 to 64", "22 to 31"], unit: "tok/s" },
      { label: "GPU prefill, Gemma 3 1B", winner: "a", ratio: 18.5, values: ["717 to 723", "~39"], unit: "tok/s" },
      { label: "GPU decode, Gemma 3 1B", winner: "a", ratio: 1.6, values: ["41.5 to 42.5", "~27"], unit: "tok/s" },
      { label: "GPU matmul, f32", winner: "a", ratio: 7.1, values: ["479", "67"], unit: "GFLOP/s" },
      { label: "GPU training step", winner: "a", ratio: 8.1, values: ["403", "~50"], unit: "GFLOP/s" },
    ],
    note: "The Snapdragon wins every lane, by 1.6x on GPU decode and 18.5x on GPU prefill. The Dimensity's OpenCL is blocked, so it runs Vulkan only.",
  },
];
