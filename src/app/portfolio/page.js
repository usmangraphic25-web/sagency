/**
 * /portfolio — server component wrapper
 *
 * Exports metadata and injects CollectionPage + portfolio ItemList JSON-LD.
 * Interactive gallery UI rendered by _PortfolioContent (client component).
 */
import React, { Suspense } from "react";
import PortfolioContent from "./_PortfolioContent";
import { serviceCategoryCards } from "@/lib/portfolioData";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "Digital Portfolio – 150+ Web, Design, SEO & Marketing Projects",
  description:
    "Explore Derixio's portfolio of digital projects: Amazon Growth case studies, custom web development, graphic design, SEO campaigns, digital marketing, and video production.",
  alternates: {
    canonical: "https://www.derixio.com/portfolio",
  },
  openGraph: {
    title: "Portfolio | Derixio Digital Agency",
    description:
      "150+ digital projects: web development, graphic design, SEO, digital marketing, Amazon PPC, and video production by Derixio.",
    url: "https://www.derixio.com/portfolio",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Derixio Digital Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Derixio Digital Agency",
    description:
      "Explore 150+ projects: web development, graphic design, SEO, digital marketing, Amazon PPC, and video production.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function PortfolioPage() {
  /* ── Breadcrumb ─────────────────────────────────────────────────── */
  const breadcrumb = buildBreadcrumb([
    { name: "Home",      url: "/" },
    { name: "Portfolio", url: "/portfolio" },
  ]);

  /* ── CollectionPage (portfolio hub) ─────────────────────────────── */
  const webPage = buildWebPage({
    url: "/portfolio",
    name: "Digital Portfolio – 150+ Projects | Derixio Digital Agency",
    description:
      "Explore Derixio's portfolio of 150+ digital projects including web development, graphic design, SEO, digital marketing, Amazon PPC, and video production.",
    type: "CollectionPage",
  });

  /* ── ItemList of portfolio category pages ───────────────────────── */
  const itemList = {
    "@type": "ItemList",
    "@id": `${BASE_URL}/portfolio#portfolio-categories`,
    "name": "Derixio Portfolio Categories",
    "numberOfItems": serviceCategoryCards.length,
    "itemListElement": serviceCategoryCards.map((category, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CollectionPage",
        "@id": `${BASE_URL}/portfolio/${category.slug}#collection`,
        "name": `${category.name} Portfolio | Derixio`,
        "url": `${BASE_URL}/portfolio/${category.slug}`,
        "description": category.description,
        "about": organizationRef(),
      },
    })),
  };

  const jsonLd = buildJsonLd([webPage, breadcrumb, itemList]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
        <PortfolioContent />
      </Suspense>
    </>
  );
}
