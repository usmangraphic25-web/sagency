/**
 * /portfolio — server component wrapper
 *
 * Exports metadata and injects CollectionPage, BreadcrumbList, ItemList (Categories & Featured Projects),
 * and Review JSON-LD schema aligned directly with visible on-page content.
 * Interactive gallery UI rendered by _PortfolioContent (client component).
 */
import React, { Suspense } from "react";
import PortfolioContent from "./_PortfolioContent";
import {
  buildJsonLd,
  buildBreadcrumb,
  buildWebPage,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const metadata = {
  title: "Digital Portfolio – 150+ Web, Design, SEO & Marketing Projects | Derixio",
  description:
    "Explore Derixio's portfolio of digital projects: Amazon PPC turnarounds, listing image optimization, A+ Content, web development, graphic design, and video production.",
  alternates: {
    canonical: "https://www.derixio.com/portfolio",
  },
  openGraph: {
    title: "Digital Portfolio – 150+ Web, Design & Amazon Projects | Derixio",
    description:
      "Explore 150+ digital projects: Amazon Growth case studies, web development, graphic design, SEO, digital marketing, and video production by Derixio.",
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
    title: "Digital Portfolio – 150+ Web, Design & Amazon Projects | Derixio",
    description:
      "Explore 150+ digital projects: Amazon Growth case studies, web development, graphic design, SEO, digital marketing, and video production by Derixio.",
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
    name: "Every Partner, One Growth Story – Digital Portfolio | Derixio",
    description:
      "Explore Derixio's portfolio of 150+ digital projects: Amazon PPC turnarounds, listing image optimization, custom web development, graphic design, and video production.",
    type: "CollectionPage",
  });

  /* ── ItemList of visible category tabs ───────────────────────────── */
  const categoryTabs = [
    {
      name: "PPC / Ad Management",
      url: "/portfolio?category=ppc",
      description: "Amazon PPC campaign restructuring, profit-driven bidding, and ACoS reduction strategies.",
    },
    {
      name: "Listing Images",
      url: "/portfolio?category=listing",
      description: "High-converting Amazon listing image stack designs, infographics, and visual storytelling.",
    },
    {
      name: "A+ Content / Brand Store",
      url: "/portfolio?category=aplus",
      description: "Custom Amazon Storefront designs and luxury EBC A+ Content layouts.",
    },
    {
      name: "Graphic Design",
      url: "/portfolio/graphic-designing",
      description: "Brand identity systems, packaging design, UI/UX redesigns, and full visual suites.",
    },
    {
      name: "Website Development",
      url: "/portfolio/web-development",
      description: "Shopify storefronts, Next.js SaaS platforms, and WooCommerce performance redesigns.",
    },
    {
      name: "Video Content",
      url: "/portfolio?category=video",
      description: "Amazon video ads, corporate brand films, and 3D kinetic motion graphics.",
    },
  ];

  const categoryItemList = {
    "@type": "ItemList",
    "@id": `${BASE_URL}/portfolio#portfolio-categories`,
    "name": "Derixio Portfolio Categories",
    "numberOfItems": categoryTabs.length,
    "itemListElement": categoryTabs.map((category, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CollectionPage",
        "@id": `${BASE_URL}${category.url}#collection`,
        "name": `${category.name} Portfolio | Derixio`,
        "url": `${BASE_URL}${category.url}`,
        "description": category.description,
        "about": organizationRef(),
      },
    })),
  };

  /* ── ItemList of visible featured portfolio items & case studies ─── */
  const visibleProjects = [
    {
      title: "Scaling to $46,487/month at 13.89% ACoS",
      tag: "PPC · AD MANAGEMENT",
      client: "Amazon Brand Partner",
      description: "Scaled Amazon PPC sales to $46,487.44 in a single month while maintaining a highly efficient 13.89% ACoS through data-driven campaign optimization with 1,543 orders.",
      image: `${BASE_URL}/assets/service-amazon-ppc.png`,
      url: `${BASE_URL}/portfolio?category=ppc`,
    },
    {
      title: "ACoS: 181% → 49%",
      tag: "PPC · TURNAROUND",
      client: "Amazon Brand Partner",
      description: "ACoS reduced from 181.43% to 49.07% in 5 months. Total sales increased from $1,075.61 to $8,997.16 with a 12.06% conversion rate.",
      image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652330911_olhcf.png",
      url: `${BASE_URL}/portfolio?category=ppc`,
    },
    {
      title: "Scaling to $46K Monthly",
      tag: "PPC · SCALING",
      client: "Amazon Brand Partner",
      description: "Generated $46,487.44 in total sales with 1,543 orders in a single month at a 13.89% ACoS.",
      image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786652094670_ithea.png",
      url: `${BASE_URL}/portfolio?category=ppc`,
    },
    {
      title: "ACoS: 61% → 31%",
      tag: "PPC · OPTIMIZATION",
      client: "Amazon Brand Partner",
      description: "ACoS reduced from 61.72% to 31.98% via multi-ad type strategy: Sponsored Products, Sponsored Brands & Sponsored Display.",
      image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786649459574_5dirz.png",
      url: `${BASE_URL}/portfolio?category=ppc`,
    },
    {
      title: "$100K+ Sales Period",
      tag: "PPC · GROWTH",
      client: "Amazon Brand Partner",
      description: "Generated $100,471.43 in ordered product sales with 1,621 units ordered (up from $70,333.77 in the previous year).",
      image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786733750987_hkqvk.png",
      url: `${BASE_URL}/portfolio?category=ppc`,
    },
    {
      title: "Kitchen Craft Luxury Kettle Storefront",
      tag: "A+ · BRAND STORE",
      client: "Kitchen Craft",
      description: "Custom Amazon Storefront drove 3.1× brand store visits and elevated premium perception.",
      image: "https://ftqwyzqaqiufnaendoko.supabase.co/storage/v1/object/public/portfolio/projects/proj_1786641376894_4bey6.jpg",
      url: `${BASE_URL}/portfolio?category=aplus`,
    },
    {
      title: "Shopify Fashion Storefront",
      tag: "WEB DEV · SHOPIFY",
      client: "Fashion & Lifestyle Brand",
      description: "+55% checkout completion rate after full Shopify UX redesign and conversion optimisation.",
      image: `${BASE_URL}/assets/webdev-shopify.png`,
      url: `${BASE_URL}/portfolio?category=webdev`,
    },
    {
      title: "Next.js SaaS Dashboard",
      tag: "WEB DEV · NEXT.JS",
      client: "SaaS Platform",
      description: "3.8× organic signup conversion rate after Next.js portal rebuild with server-side rendering.",
      image: `${BASE_URL}/assets/webdev-nextjs.png`,
      url: `${BASE_URL}/portfolio?category=webdev`,
    },
    {
      title: "WooCommerce Brand Store",
      tag: "WEB DEV · WORDPRESS",
      client: "Consumer Brand",
      description: "−48% bounce rate after WordPress WooCommerce redesign and performance optimisation.",
      image: `${BASE_URL}/assets/webdev-wordpress.png`,
      url: `${BASE_URL}/portfolio?category=webdev`,
    },

    {
      title: "Anker Soundcore Product Commercial",
      tag: "AMAZON VIDEO",
      client: "Anker Innovations",
      description: "High-energy Amazon video ad featuring active noise cancellation demo and ergonomic design highlights. +28% CTR on sponsored ads.",
      image: `${BASE_URL}/assets/portfolio-video-v4.jpg`,
      url: `${BASE_URL}/portfolio?category=video`,
    },
    {
      title: "Derixio Corporate Brand Story",
      tag: "CORPORATE FILM",
      client: "Derixio",
      description: "Behind-the-scenes brand documentary showcasing our team, creative process, and agency ethos. 3× engagement vs static ads.",
      image: `${BASE_URL}/assets/real-video.jpg`,
      url: `${BASE_URL}/portfolio?category=video`,
    },
    {
      title: "3D Kinetic Motion Graphics",
      tag: "MOTION GRAPHICS",
      client: "Digital Platform",
      description: "Sleek 3D particle motion graphics reveal for next-gen digital platforms and product launches. 2.1× brand recall improvement.",
      image: `${BASE_URL}/assets/showcase-video-motion.png`,
      url: `${BASE_URL}/portfolio?category=video`,
    },
    {
      title: "Velox Smart Earbuds Explainer",
      tag: "3D ANIMATION",
      client: "Velox",
      description: "Photorealistic 3D explode render revealing internal acoustic engineering and IPX7 waterproofing. −34% support ticket volume.",
      image: `${BASE_URL}/assets/user-video-motion.png`,
      url: `${BASE_URL}/portfolio?category=video`,
    },
  ];

  const projectItemList = {
    "@type": "ItemList",
    "@id": `${BASE_URL}/portfolio#portfolio-projects`,
    "name": "Featured Portfolio Projects & Growth Case Studies",
    "numberOfItems": visibleProjects.length,
    "itemListElement": visibleProjects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "CreativeWork",
        "name": project.title,
        "headline": project.title,
        "description": project.description,
        "image": project.image,
        "url": project.url,
        "genre": project.tag,
        "creator": organizationRef(),
        "provider": organizationRef(),
        ...(project.client
          ? {
              "accountablePerson": {
                "@type": "Organization",
                "name": project.client,
              },
            }
          : {}),
      },
    })),
  };

  /* ── Customer Reviews (Proven Outcomes visible on-page) ───────────── */
  const reviews = [
    {
      "@type": "Review",
      "author": {
        "@type": "Organization",
        "name": "Amazon Brand Partner (Europe · Health & Beauty)",
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
      },
      "reviewBody":
        "Reduced our ACoS from 61% to 31% — we were skeptical at first but the results don't lie. Best investment we've made for our Amazon account this year.",
      "itemReviewed": organizationRef(),
    },
    {
      "@type": "Review",
      "author": {
        "@type": "Organization",
        "name": "Amazon Brand Partner (UK)",
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1",
      },
      "reviewBody":
        "Launched and ranked on page 1 within 6 weeks. The listing image design and PPC setup was exactly what we needed to compete in a crowded category.",
      "itemReviewed": organizationRef(),
    },
  ];

  const jsonLd = buildJsonLd([
    webPage,
    breadcrumb,
    categoryItemList,
    projectItemList,
    ...reviews,
  ]);

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

