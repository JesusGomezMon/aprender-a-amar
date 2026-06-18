import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { MarketingScripts } from "@/components/MarketingScripts";
import { siteConfig } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-hanken",
  display: "swap",
});

const ogImage = `${siteConfig.url}/opengraph-image`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.instructor, url: siteConfig.url }],
  creator: siteConfig.instructor,
  publisher: siteConfig.instructor,
  category: "education",
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.descriptionAds,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.descriptionAds,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: siteConfig.url },
  ...(process.env.NEXT_PUBLIC_META_APP_ID
    ? { other: { "fb:app_id": process.env.NEXT_PUBLIC_META_APP_ID } }
    : {}),
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.language,
    description: siteConfig.description,
  },
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: siteConfig.language,
    provider: {
      "@type": "Person",
      name: siteConfig.instructor,
    },
    offers: {
      "@type": "Offer",
      price: siteConfig.price,
      priceCurrency: siteConfig.currency,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/#pago`,
      validFrom: new Date().toISOString().split("T")[0],
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      name: siteConfig.name,
      courseMode: "online",
      courseWorkload: `PT${siteConfig.sessionHours * siteConfig.sessions}H`,
      instructor: {
        "@type": "Person",
        name: siteConfig.instructor,
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteConfig.name,
    description: siteConfig.descriptionAds,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: siteConfig.price,
      priceCurrency: siteConfig.currency,
      url: `${siteConfig.url}/#pago`,
      availability: "https://schema.org/InStock",
    },
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${hanken.variable}`}>
        <a href="#contenido" className="skip-link">
          Ir al contenido
        </a>
        {children}
        <MarketingScripts />
      </body>
    </html>
  );
}
