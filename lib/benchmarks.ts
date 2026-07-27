// Values are measured results published in the lab's benchmark repositories.
// snapdragon-vs-m5: shared/comparison.txt. snapdragon-vs-mediatek: README.

export type BenchmarkEntry = {
  name: string;
  value: number;
  display: string;
};

export type BenchmarkGroup = {
  workload: string;
  unit: string;
  entries: BenchmarkEntry[];
};

export const benchmarkGroups: BenchmarkGroup[] = [
  {
    workload: "Gemma 3 1B Q4_0, prompt processing, llama.cpp GPU",
    unit: "tok/s",
    entries: [
      { name: "Apple M5", value: 5603.7, display: "5,604" },
      { name: "Snapdragon X2 Elite", value: 1920.5, display: "1,921" },
    ],
  },
  {
    workload: "Gemma 3 1B Q4_0, token generation, llama.cpp GPU",
    unit: "tok/s",
    entries: [
      { name: "Apple M5", value: 143.8, display: "144" },
      { name: "Snapdragon X2 Elite", value: 74.5, display: "75" },
    ],
  },
  {
    workload: "Laptop NPU dense compute",
    unit: "GFLOP/s",
    entries: [
      { name: "M5 ANE, int8", value: 15593.1, display: "15,593" },
      { name: "X2 HTP, fp16", value: 15205.4, display: "15,205" },
    ],
  },
  {
    workload: "Phone NPU int8, 8-layer FC",
    unit: "GOPS",
    entries: [
      { name: "Snapdragon 8 Elite", value: 4307, display: "4,307" },
      { name: "Dimensity 9500s", value: 1470, display: "1,470" },
    ],
  },
];

export const benchmarkSources = [
  {
    name: "snapdragon-vs-m5",
    href: "https://github.com/alpharomercoma/snapdragon-vs-m5",
  },
  {
    name: "snapdragon-vs-mediatek",
    href: "https://github.com/alpharomercoma/snapdragon-vs-mediatek",
  },
];
