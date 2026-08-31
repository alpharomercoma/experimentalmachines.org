export const site = {
  name: "Experimental Machines",
  fullName: "Experimental Machines",
  url: "https://experimentalmachines.org",
  tagline: "Test what others assume.",
  description: "Independent research across intelligence, compute, and data.",
  edge: "We run the tests ourselves and publish the code, methods, and raw numbers.",
  email: "alpha@experimentalmachines.org",
  github: "https://github.com/alpharomercoma",
};

export const stats = [
  { value: "$376K", label: "Google TPU Research Cloud compute grant" },
  { value: "11", label: "accelerator platforms benchmarked" },
  { value: "2,000+", label: "labeled video clips published" },
  { value: "78", label: "public repositories" },
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
        name: "MI300X vs H200",
        detail: "single-GPU datacenter benchmark; a 1.36x memory edge becomes a 1.84x KV cache advantage",
        href: "https://github.com/alpharomercoma/MI300X-vs-H200",
      },
      {
        name: "Edge silicon benchmarks",
        detail: "Apple M5, Snapdragon X2 Elite, Dimensity 9500s, head to head",
        href: "https://github.com/alpharomercoma/snapdragon-vs-m5",
      },
      {
        name: "compute-visualizer",
        detail: "roofline and five-way bottleneck analysis for H100 training and inference",
        href: "https://github.com/alpharomercoma/compute-visualizer",
      },
      {
        name: "openweights",
        detail: "open-weight models running locally on an Android phone, Kotlin and llama.cpp",
        href: "https://github.com/alpharomercoma/openweights",
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
        name: "Philippine Mall Explorer",
        detail: "40,462 store listings from 303 malls, scraped into a reproducible dataset on a map",
        href: "https://github.com/alpharomercoma/philippine-mall-explorer",
      },
      {
        name: "ts-jobspy",
        detail: "TypeScript job scraper for LinkedIn, Indeed, Glassdoor and more",
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
    name: "qwen3.8-27b-mi300x",
    desc: "Qwen3.8-27B served from a single AMD MI300X with vLLM: reproducible scripts and an authenticated HTTPS endpoint.",
    href: "https://github.com/alpharomercoma/qwen3.8-27b-mi300x",
  },
  {
    name: "MI300X-vs-H200",
    desc: "One AMD MI300X against one NVIDIA H200: inference and training, every result anchored to a roofline.",
    href: "https://github.com/alpharomercoma/MI300X-vs-H200",
  },
  {
    name: "neuron-pipelines",
    desc: "Llama 3.1 8B LoRA fine-tuned on Trainium1, served by vLLM on Inferentia2, measured end to end.",
    href: "https://github.com/alpharomercoma/torchneuronx",
  },
  {
    name: "openweights",
    desc: "Open-weight models from Hugging Face running on an Android phone. Native Kotlin, llama.cpp, no cloud.",
    href: "https://github.com/alpharomercoma/openweights",
  },
  {
    name: "compute-visualizer",
    desc: "Why is this LLM workload slow? Roofline and five-way bottleneck analysis for H100 training and inference.",
    href: "https://github.com/alpharomercoma/compute-visualizer",
  },
  {
    name: "serverless-inference",
    desc: "Scale-to-zero LLM inference on RunPod; model and GPU picked from a measured shootout.",
    href: "https://github.com/alpharomercoma/serverless-inference",
  },
  {
    name: "philippine-mall-explorer",
    desc: "40,462 store listings from 303 Philippine malls, cleaned into a reproducible dataset.",
    href: "https://github.com/alpharomercoma/philippine-mall-explorer",
  },
  {
    name: "snapdragon-vs-m5",
    desc: "Reproducible head-to-head: Apple M5 against Snapdragon X2 Elite, CPU, GPU and NPU.",
    href: "https://github.com/alpharomercoma/snapdragon-vs-m5",
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
    name: "Arjhine Ty",
    role: "Founding Member",
    href: "https://www.linkedin.com/in/arrochi/",
  },
];
