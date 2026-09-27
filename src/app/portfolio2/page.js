/**
 * /portfolio2 — server component
 *
 * New bento-layout portfolio page for review alongside /portfolio.
 * Results-first: stats bar above the fold, bento grid with specific numbers
 * on every tile, listing images collapsed into a carousel, video section with
 * intro copy, and a closing CTA.
 */
import Portfolio2Content from "./_Portfolio2Content";

export const metadata = {
  title: "Portfolio v2 – Amazon Growth, Listing Design & Brand Services | Derixio",
  description:
    "Explore Derixio's results-first portfolio: Amazon PPC case studies (ACoS 181%→49%), listing image redesigns, A+ content, web development, and video production.",
  alternates: {
    canonical: "https://www.derixio.com/portfolio2",
  },
  openGraph: {
    title: "Portfolio v2 | Derixio – Amazon Growth Agency",
    description:
      "See the numbers behind the work: +42% revenue growth, 3.8× conversion lift, 240% distribution increase. Real results for real Amazon brands.",
    url: "https://www.derixio.com/portfolio2",
    siteName: "Derixio",
    images: [
      {
        url: "https://www.derixio.com/assets/derixio-official-logo.png",
        width: 1200,
        height: 630,
        alt: "Derixio Portfolio – Results-First Case Studies",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio v2 | Derixio – Amazon Growth Agency",
    description:
      "See the numbers behind the work: +42% revenue growth, 3.8× conversion lift, 240% distribution increase.",
    images: ["https://www.derixio.com/assets/derixio-official-logo.png"],
  },
};

export default function Portfolio2Page() {
  return <Portfolio2Content />;
}
