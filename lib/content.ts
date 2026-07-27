export const site = {
  name: "Alpha Experimental",
  fullName: "Alpha Experimental Machines",
  url: "https://alphaexperimental.org",
  tagline: "Test what others assume.",
  description:
    "Alpha Experimental is an independent research lab for multimodal intelligence, accelerated computing, and open data systems.",
  edge: "We run the tests ourselves and publish the code, methods, and raw numbers.",
  email: "alpha@alphaexperimental.org",
  github: "https://github.com/alpharomercoma",
};

export const stats = [
  { value: "$376K", label: "Google TPU Research Cloud compute grant" },
  { value: "4", label: "accelerator platforms benchmarked" },
  { value: "2,000+", label: "labeled video clips published" },
  { value: "66", label: "public repositories" },
];

export type Project = {
  name: string;
  detail: string;
  href: string | null;
};

export const pillars: {
  index: string;
  title: string;
  claim: string;
  projects: Project[];
}[] = [
  {
    index: "01",
    title: "Multimodality",
    claim: "Vision-language systems that judge content, not just caption it.",
    projects: [
      {
        name: "Visual-Qwen",
        detail: "CLIP + Q-Former + Qwen3 4B, 92% eval accuracy, trained on an H200",
        href: "https://github.com/alpharomercoma/vqwen-qformer",
      },
      {
        name: "MicroMARC",
        detail: "vision-language model that flags cognitively degrading short-form video",
        href: null,
      },
    ],
  },
  {
    index: "02",
    title: "Accelerated computing",
    claim: "One PyTorch workload, profiled across GPUs, TPUs, NPUs, and phones.",
    projects: [
      {
        name: "De-mystifying PyTorch for ASICs",
        detail: "accepted talk, PyTorch Conference Europe 2026",
        href: null,
      },
      {
        name: "Edge silicon benchmarks",
        detail: "Apple M5, Snapdragon X2 Elite, Dimensity 9500s, head to head",
        href: "https://github.com/alpharomercoma/snapdragon-vs-m5",
      },
      {
        name: "will-it-asic",
        detail: "model compatibility across TPU, Trainium, Inferentia, and Gaudi",
        href: "https://github.com/alpharomercoma/will-it-asic",
      },
    ],
  },
  {
    index: "03",
    title: "Data engineering",
    claim: "Datasets and pipelines built to be rerun, not just cited.",
    projects: [
      {
        name: "Multimodal Sludge Dataset",
        detail: "2,000+ labeled video clips, published on Kaggle",
        href: null,
      },
      {
        name: "ts-jobspy",
        detail: "job market scraper for LinkedIn, Indeed, Glassdoor, and ZipRecruiter",
        href: "https://github.com/alpharomercoma/ts-jobspy",
      },
      {
        name: "chorus-searxng",
        detail: "self-hosted private search with AI answer synthesis",
        href: "https://github.com/alpharomercoma/chorus-searxng",
      },
    ],
  },
];

export const work = [
  {
    name: "vqwen-qformer",
    desc: "Vision-language model: CLIP + Q-Former + Qwen3 4B, trained on an H200.",
    href: "https://github.com/alpharomercoma/vqwen-qformer",
  },
  {
    name: "snapdragon-vs-m5",
    desc: "Reproducible head-to-head: Apple M5 against Snapdragon X2 Elite.",
    href: "https://github.com/alpharomercoma/snapdragon-vs-m5",
  },
  {
    name: "snapdragon-vs-mediatek",
    desc: "On-device benchmark: Snapdragon 8 Elite against Dimensity 9500s.",
    href: "https://github.com/alpharomercoma/snapdragon-vs-mediatek",
  },
  {
    name: "will-it-asic",
    desc: "Checks model compatibility across TPU, Trainium, Inferentia, and Gaudi.",
    href: "https://github.com/alpharomercoma/will-it-asic",
  },
  {
    name: "poco-phone-ai-training",
    desc: "Training and inference on a retail phone NPU over SSH.",
    href: "https://github.com/alpharomercoma/poco-phone-ai-training",
  },
  {
    name: "local-agentic-rag-with-qwen3",
    desc: "Local agentic RAG on Qwen3 embeddings, reranker, and LLM.",
    href: "https://github.com/alpharomercoma/local-agentic-rag-with-qwen3",
  },
];

export const principles = [
  {
    title: "Independent",
    body: "No vendor allegiance. We buy or rent the hardware we test.",
  },
  {
    title: "Open",
    body: "Methods, code, and raw logs ship with every result.",
  },
  {
    title: "Measured",
    body: "Claims come from benchmarks we ran, not spec sheets.",
  },
];

export const people = [
  {
    name: "Alpha Romer Coma",
    role: "Founder",
    href: "https://www.linkedin.com/in/alpharomercoma/",
  },
  {
    name: "Marc Olata",
    role: "Founding Member",
    href: "https://www.linkedin.com/in/marc-olata",
  },
];
