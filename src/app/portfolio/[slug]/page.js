/**
 * /portfolio/[slug] — server component
 *
 * Handles two view types:
 *   1. Category view  → /portfolio/web-development  → CollectionPage + ItemList schema
 *   2. Project view   → /portfolio/some-project     → WebPage + CreativeWork schema
 *
 * generateMetadata provides unique title/desc/canonical/OG/twitter per view.
 */
import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  serviceCategoryCards,
  portfolioProjects,
  getCategoryBySlug,
  getProjectBySlug,
} from "@/lib/portfolioData";
import { getProjects } from "@/lib/portfolioStore";
import ServicePortfolioView from "@/ui/portfolio/ServicePortfolioView";
import CaseStudyDetailView from "@/components/portfolio/CaseStudyDetailView";
import { ArrowLeft, Sparkles } from "lucide-react";
import {
  buildJsonLd,
  buildBreadcrumb,
  organizationRef,
  BASE_URL,
} from "@/lib/schemaHelpers";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const categorySlugs = serviceCategoryCards.map((c) => ({ slug: c.slug }));
  const projectSlugs  = portfolioProjects.map((p) => ({ slug: p.slug }));
  return [...categorySlugs, ...projectSlugs];
}

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);
  if (category) {
    return {
      title: `${category.name} Portfolio | Derixio Digital Agency`,
      description: `Explore Derixio's ${category.name.toLowerCase()} portfolio. ${category.description}`.substring(0, 155),
      alternates: { canonical: `https://www.derixio.com/portfolio/${category.slug}` },
      openGraph: {
        title: `${category.name} Portfolio | Derixio`,
        description: category.description,
        url: `https://www.derixio.com/portfolio/${category.slug}`,
        siteName: "Derixio",
        images: [{ url: `https://www.derixio.com${category.image}`, width: 1200, height: 630, alt: `${category.name} Portfolio – Derixio` }],
        locale: "en_US",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: `${category.name} Portfolio | Derixio`,
        description: category.description,
        images: [`https://www.derixio.com${category.image}`],
      },
    };
  }

  const project = getProjectBySlug(slug);
  if (project) {
    return {
      title: `${project.title} | ${project.category} Case Study | Derixio`,
      description: project.shortDescription.substring(0, 155),
      alternates: { canonical: `https://www.derixio.com/portfolio/${project.slug}` },
      openGraph: {
        title: `${project.title} | Derixio`,
        description: project.shortDescription,
        url: `https://www.derixio.com/portfolio/${project.slug}`,
        siteName: "Derixio",
        images: [{ url: `https://www.derixio.com${project.image}`, width: 1200, height: 630, alt: project.title }],
        locale: "en_US",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} | Derixio`,
        description: project.shortDescription,
        images: [`https://www.derixio.com${project.image}`],
      },
    };
  }

  return { title: "Portfolio | Derixio", description: "Derixio digital agency portfolio." };
}

export default async function DynamicPortfolioPage({ params }) {
  const { slug } = await params;

  // Normalise legacy slug variant
  if (slug === "graphic-design") redirect("/portfolio/graphic-designing");

  const category = getCategoryBySlug(slug);
  const project  = getProjectBySlug(slug);

  /* ────────────────────────────────────────────────────────────────
   * VIEW 1: CATEGORY PAGE (e.g. /portfolio/web-development)
   * ──────────────────────────────────────────────────────────────── */
  if (category) {
    const allDbProjects = await getProjects();
    const serviceProjects = allDbProjects.filter(
      (p) =>
        (p.service === category.name || p.categorySlug === category.slug) &&
        !p.deleted &&
        p.published !== false &&
        (p.status || '').toUpperCase() !== "HIDDEN"
    );

    /* JSON-LD */
    const breadcrumb = buildBreadcrumb([
      { name: "Home",      url: "/" },
      { name: "Portfolio", url: "/portfolio" },
      { name: category.name, url: `/portfolio/${category.slug}` },
    ]);

    const collectionPage = {
      "@type": "CollectionPage",
      "@id": `${BASE_URL}/portfolio/${category.slug}#webpage`,
      "url": `${BASE_URL}/portfolio/${category.slug}`,
      "name": `${category.name} Portfolio | Derixio`,
      "description": category.description,
      "isPartOf": { "@id": `${BASE_URL}/#website` },
      "about": organizationRef(),
      "breadcrumb": { "@id": `${BASE_URL}/portfolio/${category.slug}#breadcrumb` },
      "inLanguage": "en-US",
    };

    const graphItems = [collectionPage, breadcrumb];

    if (serviceProjects.length > 0) {
      graphItems.push({
        "@type": "ItemList",
        "@id": `${BASE_URL}/portfolio/${category.slug}#projects`,
        "name": `${category.name} Projects by Derixio`,
        "numberOfItems": serviceProjects.length,
        "itemListElement": serviceProjects.map((proj, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "item": {
            "@type": "CreativeWork",
            "name": proj.title || proj.name,
            "description": (proj.shortDescription || proj.description || "").substring(0, 200),
            "provider": organizationRef(),
          },
        })),
      });
    }

    const jsonLd = buildJsonLd(graphItems);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ServicePortfolioView category={category} initialProjects={serviceProjects} />
      </>
    );
  }

  /* ────────────────────────────────────────────────────────────────
   * VIEW 2: INDIVIDUAL PROJECT / CASE STUDY
   * ──────────────────────────────────────────────────────────────── */
  if (project) {
    const pageUrl = `/portfolio/${project.slug}`;

    const breadcrumb = buildBreadcrumb([
      { name: "Home",      url: "/" },
      { name: "Portfolio", url: "/portfolio" },
      { name: project.category, url: `/portfolio/${project.categorySlug}` },
      { name: project.title,    url: pageUrl },
    ]);

    const creativeWork = {
      "@type": "CreativeWork",
      "@id": `${BASE_URL}${pageUrl}#creative-work`,
      "name": project.title,
      "description": project.shortDescription,
      "url": `${BASE_URL}${pageUrl}`,
      "image": `${BASE_URL}${project.image}`,
      "creator": organizationRef(),
      "provider": organizationRef(),
      "genre": project.category,
    };

    const webPage = {
      "@type": "WebPage",
      "@id": `${BASE_URL}${pageUrl}#webpage`,
      "url": `${BASE_URL}${pageUrl}`,
      "name": `${project.title} | ${project.category} Case Study | Derixio`,
      "description": project.shortDescription.substring(0, 155),
      "isPartOf": { "@id": `${BASE_URL}/#website` },
      "about": organizationRef(),
      "breadcrumb": { "@id": `${BASE_URL}${pageUrl}#breadcrumb` },
      "inLanguage": "en-US",
      "mainEntity": { "@id": `${BASE_URL}${pageUrl}#creative-work` },
    };

    const jsonLd = buildJsonLd([webPage, breadcrumb, creativeWork]);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CaseStudyDetailView project={project} />
      </>
    );
  }

  /* ── Not Found ──────────────────────────────────────────────────── */
  return (
    <main className="min-h-screen bg-[var(--background)] pt-32 pb-24 text-center text-[var(--foreground)]">
      <h1 className="text-3xl font-extrabold mb-4 text-[var(--foreground-heading)]">Portfolio Page Not Found</h1>
      <Link href="/portfolio" className="text-[#9D26FF] hover:underline">
        Return to Portfolio Directory
      </Link>
    </main>
  );
}
