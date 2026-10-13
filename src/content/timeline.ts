export type Role = {
  company: string;
  title: string;
  period: string;
  /** Set where two roles overlap, so the dates do not read as an error. */
  note?: string;
  /** Company mark, extracted from the CV. */
  logo: string;
  current: boolean;
  summary: string;
};

export const roles: Role[] = [
  {
    company: "Sequenzy",
    logo: "/logos/sequenzy.png",
    title: "Full-stack Developer",
    period: "May 2026 — Oct 2026",
    note: "Concurrent with BlogToPin",
    current: true,
    summary:
      "AI-powered email and landing-page workflows, product builders, and marketplace integrations.",
  },
  {
    company: "BlogToPin",
    logo: "/logos/blogtopin.png",
    title: "Full-stack Developer",
    period: "Jul 2025 — Oct 2026",
    note: "Concurrent with Sequenzy",
    current: false,
    summary:
      "Pinterest scheduling engine, an AI writing module, a regeneration pipeline, and a Chrome extension.",
  },
  {
    company: "TOP IZ DATO",
    logo: "/logos/topizdato.png",
    title: "Frontend Developer",
    period: "Jul 2024 — Jan 2025",
    current: false,
    summary: "Accessible React component work on Course Garden, in a five-person product team.",
  },
];

export const education = [
  {
    degree: "MSc, Computer Science",
    school: "National Technical University, Kharkiv Polytechnic Institute",
    period: "2025 — present",
  },
  {
    degree: "BSc, Computer Science",
    school: "V. N. Karazin Kharkiv National University",
    period: "2019 — 2023",
  },
] as const;
