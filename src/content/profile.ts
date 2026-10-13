export const profile = {
  name: "Dmytro Omelchenko",
  /** The spine of the whole site. Everything else is evidence for this. */
  positioning:
    "I build AI-native product surfaces — and the evaluation systems that keep them honest.",
  intro:
    "Full-stack engineer working in TypeScript across React, Node, and Postgres. Two years building production SaaS: generative features, visual builders, background pipelines, and the integrations that connect them.",
  location: "Kharkiv, Ukraine",
  timezone: "UTC+2",
  availability: "Open to remote roles",
  email: "dmytro.omelchenko.shameworm@gmail.com",
  github: "https://github.com/shameworm",
  linkedin: "https://www.linkedin.com/in/omelchenko-shmwrm/",
  cv: "/Dmytro_Omelchenko_CV.pdf",
} as const;

/** Numbers before adjectives. Each one is load-bearing elsewhere on the site. */
export const proofMarkers = [
  { value: "120+", label: "Evaluations shipped" },
  { value: "~50%", label: "Faster first load" },
  { value: "7", label: "Integrations in production" },
] as const;
