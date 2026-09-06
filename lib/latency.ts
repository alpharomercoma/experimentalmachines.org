// OpenWeights on-device latency, copied from play/site/latency.html in
// github.com/alpharomercoma/openweights (the page at
// alpharomercoma.github.io/openweights/latency.html). Median time to first
// token and time per output token over 60 to 90 benchmark prompts per cell
// (GSM8K, IFEval, BFCL; prompts 19 to 772 tokens, median 92), single pass,
// runs on 2026-09-03 and 04. llama.cpp ran Q4_K_M GGUFs (Qwen3 at Q8_0);
// ExecuTorch ran the published XNNPACK INT8/INT4 exports.

export const chips = [
  { name: "Dimensity 9400", short: "D9400" },
  { name: "Snapdragon 8 Gen 3", short: "8 Gen 3" },
  { name: "Snapdragon 8 Elite", short: "8 Elite" },
  { name: "Tensor G5", short: "Tensor G5" },
  { name: "Exynos 2400", short: "Exynos 2400" },
];

// [time to first token, seconds; time per output token, ms] per chip, in
// `chips` order.
export type Cell = [number, number];

// Median prefill tokens per second per chip, same order, from the repo's
// docs/research/benchmark-matrix.md. Shown beside the first-token time.
export type LatencyModel = {
  name: string;
  llama: Cell[];
  et: Cell[];
  prefill: { llama: number[]; et: number[] };
};

export const latency: LatencyModel[] = [
  {
    name: "Gemma 3 1B",
    llama: [[1.27, 42], [1.02, 51], [0.8, 28], [1.35, 113], [1.68, 75]],
    et: [[0.43, 48], [0.37, 27], [0.4, 44], [0.48, 50], [0.45, 56]],
    prefill: { llama: [61, 69, 79, 56, 45], et: [164, 192, 167, 156, 151] },
  },
  {
    name: "LFM2.5 1.2B",
    llama: [[0.81, 31], [0.73, 43], [0.59, 27], [0.83, 106], [0.97, 59]],
    et: [[0.3, 25], [0.44, 27], [0.3, 18], [0.32, 46], [0.42, 38]],
    prefill: { llama: [138, 130, 153, 112, 92], et: [321, 217, 288, 248, 208] },
  },
  {
    name: "Qwen3 1.7B",
    llama: [[1.05, 57], [0.49, 74], [0.37, 40], [1.17, 184], [0.89, 97]],
    et: [[0.76, 64], [0.77, 41], [0.75, 41], [0.89, 94], [0.81, 67]],
    prefill: { llama: [113, 195, 266, 93, 100], et: [122, 120, 130, 102, 112] },
  },
  {
    name: "Llama 3.2 3B",
    llama: [[2.39, 82], [2.11, 107], [1.7, 83], [2.43, 180], [3.46, 151]],
    et: [[1.36, 82], [1.82, 91], [1.47, 63], [1.55, 125], [1.73, 119]],
    prefill: { llama: [39, 43, 48, 37, 25], et: [87, 66, 80, 71, 64] },
  },
  {
    name: "SmolLM3 3B",
    llama: [[1.18, 79], [1.43, 101], [1.03, 79], [1.86, 239], [1.79, 132]],
    et: [[12.69, 91], [10.33, 85], [7.18, 67], [15.9, 108], [12.26, 121]],
    prefill: { llama: [42, 39, 47, 35, 29], et: [13, 14, 21, 11, 11] },
  },
];

export const latencyLinks = {
  page: "https://alpharomercoma.github.io/openweights/latency.html",
  repo: "https://github.com/alpharomercoma/openweights",
};
