// Values are measured results published in the lab's benchmark repositories.
// MI300X-vs-H200: REPORT.md section 5, Llama 3.3 70B FP8, 1k in / 1k out.
// snapdragon-vs-m5: shared/comparison.txt. snapdragon-vs-mediatek: README.

export type BenchmarkEntry = {
  name: string;
  value: number;
  display: string;
};

export type BenchmarkGroup = {
  scale: string;
  workload: string;
  unit: string;
  entries: BenchmarkEntry[];
};

export const benchmarkGroups: BenchmarkGroup[] = [
  {
    scale: "Datacenter",
    workload: "Llama 3.3 70B FP8 serving, vLLM, concurrency 128",
    unit: "tok/s",
    entries: [
      { name: "AMD MI300X", value: 1873, display: "1,873" },
      { name: "NVIDIA H200", value: 1637, display: "1,637" },
    ],
  },
  {
    scale: "Laptop",
    workload: "Gemma 3 1B Q4_0, token generation, llama.cpp GPU",
    unit: "tok/s",
    entries: [
      { name: "Apple M5", value: 143.8, display: "144" },
      { name: "Snapdragon X2 Elite", value: 74.5, display: "75" },
    ],
  },
  {
    scale: "Phone",
    workload: "NPU int8 dense compute, 8-layer FC",
    unit: "GOPS",
    entries: [
      { name: "Snapdragon 8 Elite", value: 4307, display: "4,307" },
      { name: "Dimensity 9500s", value: 1470, display: "1,470" },
    ],
  },
];

export const benchmarkSources = [
  {
    name: "MI300X-vs-H200",
    href: "https://github.com/alpharomercoma/MI300X-vs-H200",
  },
  {
    name: "snapdragon-vs-m5",
    href: "https://github.com/alpharomercoma/snapdragon-vs-m5",
  },
  {
    name: "snapdragon-vs-mediatek",
    href: "https://github.com/alpharomercoma/snapdragon-vs-mediatek",
  },
];
