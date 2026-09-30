import React, { Suspense } from "react";
import { getProjects } from "@/lib/portfolioStore";
import { notFound } from "next/navigation";
import ProjectShowcasePageView from "@/components/portfolio/ProjectShowcasePageView";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Derixio Portfolio`,
    description: project.description || `Case study: ${project.title}`,
  };
}

export default async function ProjectPage({ params }) {
  const { id } = await params;

  // Fetch all projects server-side — no client waterfall, no flicker
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
      <ProjectShowcasePageView project={project} />
    </Suspense>
  );
}
