"use client";

import React, { Suspense } from "react";
import PortfolioV2 from "@/ui/portfolio/PortfolioV2";

export default function PortfolioContent() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-16 sm:pt-20 pb-24 relative overflow-hidden bg-agenko-grid">
      <Suspense fallback={<div className="min-h-screen bg-[var(--background)]" />}>
        <PortfolioV2 />
      </Suspense>
    </main>
  );
}
