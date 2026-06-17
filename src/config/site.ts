export const siteConfig = {
  name: "Aprender a Amar",
  title: "Aprender a Amar | Curso en vivo basado en Erich Fromm",
  description:
    "Curso en vivo de 4 sesiones sobre el arte de amar, basado en El arte de amar de Erich Fromm. Con Ainhoa Govea. Aprende a amar como habilidad, no como suerte.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "es_MX",
  price: 400,
  currency: "MXN",
  priceStripe: 40000,
  instructor: "Ainhoa Govea",
  sessions: 4,
  sessionHours: 2,
  keywords: [
    "curso amor",
    "Erich Fromm",
    "el arte de amar",
    "psicología relaciones",
    "curso en vivo México",
    "Ainhoa Govea",
    "aprender a amar",
  ],
} as const;
