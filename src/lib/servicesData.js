import { Zap, ShieldCheck, BarChart, Code, Search, ShoppingCart, Film, TrendingUp, Palette, Store } from 'lucide-react';

export const iconMap = {
  Code,
  Search,
  BarChart,
  Zap,
  ShieldCheck,
  ShoppingCart,
  Film,
  TrendingUp,
  Palette,
  Store,
};

export const servicesData = [
  {
    title: "Amazon Growth",
    slug: "ecommerce-development",
    subtitle: "Turn Amazon listings into high-converting revenue drivers with data-driven PPC and premium brand assets.",
    badge: "Amazon Brand Scaling",
    metrics: [
      { value: "3.8x", label: "Avg PPC ROAS" },
      { value: "-35%", label: "Average ACoS" },
      { value: "24–48h", label: "Turnaround Time" }
    ],
    techStack: ["Helium 10", "Jungle Scout", "Amazon Ads API", "Adobe Photoshop", "Seller Central", "Brand Registry"],
    mockupSlot: "AmazonPPCMockup",
    process: [
      {
        step: "01",
        title: "Audit & Discovery",
        description: "Deep-dive analysis into your product ASINs, category competitors, keyword gaps, and historical PPC performance."
      },
      {
        step: "02",
        title: "Listing & Visual Strategy",
        description: "SEO keyword mapping, title and bullet rewrites, plus custom visual wireframing for listing images and A+ content."
      },
      {
        step: "03",
        title: "PPC Architecture & Setup",
        description: "Structuring isolated campaigns for Sponsored Products, Brands, and Display ads with exact bid management."
      },
      {
        step: "04",
        title: "Optimization & Scaling",
        description: "Daily bid adjustments, negative keyword harvesting, ACoS reduction, and transparent monthly growth reporting."
      }
    ],
    faqs: [
      {
        question: "How fast can we launch our Amazon PPC campaigns?",
        answer: "Initial listing audits and campaign setup take 3 to 5 business days. Once approved, live advertising begins immediately."
      },
      {
        question: "What deliverables are included in listing optimization?",
        answer: "You receive fully rewritten titles, bullet points, backend search terms, high-resolution main & infographic images, and A+ content."
      },
      {
        question: "How many design revisions are included?",
        answer: "Our standard plans include 2 to 3 rounds of revisions, while our Business and Enterprise packages offer unlimited revisions until satisfied."
      },
      {
        question: "What expected sales results should we anticipate?",
        answer: "Clients typically see an average 25–40% increase in organic rank and conversion rates within 30 to 60 days of full optimization."
      }
    ],
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">End-to-End Amazon Brand Growth</h2>
      <p>At <strong>Derixio</strong>, we don't just manage Amazon ads—we help grow your entire Amazon brand. From listing optimization and high-converting A+ Content to strategic Sponsored Ads PPC campaigns, store design, and ongoing performance reporting, we deliver complete, full-stack Amazon growth.</p>
      <p>Whether launching new products or scaling an established brand, our data-driven strategies increase product visibility, improve conversion rates, lower ACoS, and maximize overall profitability across Amazon.</p>
    `,
    coverImage: "/assets/hero-amazon.png",
    icon: "TrendingUp",
    features: [
      {
        title: "Amazon Listing Optimization",
        description: "Comprehensive keyword research, high-converting product title optimization, persuasive bullet points, rich descriptions, and backend search terms.",
        icon: "Search"
      },
      {
        title: "Listing Images & A+ Content",
        description: "Eye-catching listing main images, infographic slides, Enhanced Brand Content (A+), and brand story section designs.",
        icon: "Palette"
      },
      {
        title: "Amazon Storefront Design",
        description: "Custom Amazon brand storefront design that elevates brand authority and drives multi-product customer browsing.",
        icon: "Store"
      },
      {
        title: "Amazon PPC & Advertising",
        description: "Data-driven campaign setup and management for Sponsored Products, Sponsored Brands, and Sponsored Display ads.",
        icon: "TrendingUp"
      },
      {
        title: "Bid & Search Term Optimization",
        description: "Continuous bid adjustments, search term harvesting, negative keyword management, and competitor targeting.",
        icon: "Zap"
      },
      {
        title: "Monthly Reports & Growth Strategy",
        description: "Transparent monthly performance reporting, ROAS tracking, and ongoing strategic Amazon growth consulting.",
        icon: "BarChart"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$499",
        delivery: "5–7 Days",
        features: [
          "1 Product Listing Optimization",
          "Comprehensive Keyword Research",
          "Title, Bullet Points & Description Rewrite",
          "Backend Search Terms Optimization",
          "Keyword Report & 5–7 Day Delivery"
        ]
      },
      {
        planName: "Business",
        price: "Custom Quote",
        delivery: "10–12 Days",
        recommended: true,
        features: [
          "Everything in Starter",
          "A+ Content (Enhanced Brand Content)",
          "Brand Story Section & Custom Graphics",
          "Management fee based on ad spend",
          "10–12 Day Delivery"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        delivery: "Custom Timeline",
        features: [
          "Everything in Business",
          "Full PPC Campaign Setup & Management",
          "Management fee based on ad spend",
          "Continuous Bid & Search Term Optimization",
          "Monthly Performance Reports & Strategy"
        ]
      }
    ]
  },
  {
    title: "Web Development",
    slug: "web-development",
    subtitle: "Fast, SEO-friendly websites and web apps built with Next.js and React, so your brand has a strong home beyond Amazon.",
    badge: "Full-Stack Web Engineering",
    metrics: [
      { value: "99.8%", label: "Core Web Vitals" },
      { value: "< 1.2s", label: "Page Load Speed" },
      { value: "100%", label: "Responsive UX" }
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Sanity CMS", "Node.js", "Vercel"],
    mockupSlot: "DevMockup",
    process: [
      {
        step: "01",
        title: "Discovery & Architecture",
        description: "Mapping out system requirements, content structure, tech stack selection, and database schema."
      },
      {
        step: "02",
        title: "UI/UX & Interactive Design",
        description: "Crafting modern, accessible user interface components with smooth micro-interactions."
      },
      {
        step: "03",
        title: "Full-Stack Engineering",
        description: "Developing clean, performant Next.js code, integrating Headless CMS, and wiring up custom APIs."
      },
      {
        step: "04",
        title: "Optimization & Launch",
        description: "Comprehensive Core Web Vitals optimization, security hardening, and seamless production deployment."
      }
    ],
    faqs: [
      {
        question: "What is the typical turnaround time for a custom website?",
        answer: "Starter projects take 1 to 2 weeks, while full custom web apps take 3 to 6 weeks depending on feature complexity."
      },
      {
        question: "What deliverables are provided upon project completion?",
        answer: "Full source code repository, CMS admin credentials, API documentation, and deployment configurations."
      },
      {
        question: "Are revisions and post-launch support included?",
        answer: "Yes, all development packages include 1 to 3 months of post-launch maintenance, bug fixes, and support."
      },
      {
        question: "How do you guarantee high performance and speed?",
        answer: "We build with Next.js static generation, image optimization, clean code splitting, and zero unnecessary dependencies."
      }
    ],
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Crafting Digital Experiences That Convert</h2>
      <p>In today's <strong>digital-first world</strong>, your website is more than just an online brochure; it's your most powerful marketing asset, your 24/7 salesperson, and the central hub of your brand's universe. At <strong>Derixio</strong>, we don't just build websites; we craft immersive digital experiences that captivate audiences, drive engagement, and deliver measurable results.</p>
      <p>We specialize in building <strong>high-performance websites</strong> using modern frameworks like Next.js and React, ensuring your site is scalable, secure, and optimized for search engines from the ground up. From initial strategy and UI/UX design to back-end development and deployment, we provide a complete, end-to-end solution that grows with your business.</p>
    `,
    coverImage: "/assets/hero-web.png",
    icon: "Code",
    features: [
      {
        title: "Custom Next.js Development",
        description: "Blazing-fast, SEO-friendly websites with server-side rendering and static site generation for optimal performance.",
        icon: "Code"
      },
      {
        title: "Headless CMS Integration",
        description: "Manage your content effortlessly with headless CMS like Sanity, Strapi, or Contentful.",
        icon: "Globe"
      },
      {
        title: "API & Third-Party Integrations",
        description: "Connect your site with CRMs, automation tools, payment gateways, and more seamlessly.",
        icon: "Zap"
      },
      {
        title: "Performance Optimization",
        description: "Optimized for Core Web Vitals, ensuring smooth UX and better SEO rankings.",
        icon: "TrendingUp"
      },
      {
        title: "Responsive & Accessible Design",
        description: "Flawless display across devices, meeting WCAG accessibility standards.",
        icon: "Palette"
      },
      {
        title: "Secure & Scalable Architecture",
        description: "Websites built to grow with your business while staying protected from threats.",
        icon: "ShieldCheck"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$500",
        delivery: "7–10 Days",
        features: [
          "Up to 5 Pages",
          "Custom Next.js Development",
          "Responsive & Accessible Design",
          "Basic CMS Integration",
          "Core Web Vitals Optimization",
          "1 Month Support"
        ]
      },
      {
        planName: "Business",
        price: "$1,000–$1,500",
        delivery: "14–21 Days",
        recommended: true,
        features: [
          "Up to 15 Pages",
          "Custom Next.js Development",
          "Headless CMS Integration (Sanity, Strapi, or Contentful)",
          "API & Third-Party Integrations",
          "Full Performance Optimization",
          "Secure & Scalable Architecture",
          "3 Months Support"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        delivery: "Custom Timeline",
        features: [
          "Unlimited Pages",
          "Custom Web Application Architecture",
          "Advanced API & CRM Integrations",
          "Enterprise-Grade Security & Scalability",
          "Dedicated Engineering Team",
          "Ongoing Maintenance & Support"
        ]
      }
    ]
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    subtitle: "High-impact visual identity, 3D product renders, packaging, and digital branding assets.",
    badge: "Creative Brand Design",
    metrics: [
      { value: "500+", label: "Designs Delivered" },
      { value: "24–48h", label: "Delivery Time" },
      { value: "99.4%", label: "Client Satisfaction" }
    ],
    techStack: ["Adobe Photoshop", "Illustrator", "Blender 3D", "Figma", "After Effects", "InDesign"],
    mockupSlot: "Mockup",
    process: [
      {
        step: "01",
        title: "Creative Discovery & Brief",
        description: "Analyzing your brand personality, target demographics, competitor visual strategies, and goals."
      },
      {
        step: "02",
        title: "Concept Creation",
        description: "Drafting multiple design concepts, color palettes, vector shapes, and photorealistic 3D mockups."
      },
      {
        step: "03",
        title: "Refinement & Polishing",
        description: "Iterating based on your feedback to perfect typography, composition, and visual hierarchy."
      },
      {
        step: "04",
        title: "Asset Handoff & Production",
        description: "Delivering complete vector source files (AI, PSD, SVG, PNG, PDF) ready for print and digital media."
      }
    ],
    faqs: [
      {
        question: "What turnaround time can I expect for design projects?",
        answer: "Initial logo concepts and social graphics are delivered within 24 to 72 hours depending on plan scope."
      },
      {
        question: "What file formats do I receive with my completed designs?",
        answer: "You receive full vector files (AI, EPS, SVG), layered Photoshop files (PSD), high-res PNGs, and print-ready PDFs."
      },
      {
        question: "How do revisions work for graphic design packages?",
        answer: "Starter plans include up to 5 revision rounds, while Business and Enterprise tiers offer unlimited revisions."
      },
      {
        question: "Can you create photorealistic 3D product packaging renders?",
        answer: "Yes, our 3D render specialists create ultra-realistic product models and packaging mockups ideal for e-commerce."
      }
    ],
    description: `
    <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Creative Designs That Elevate Your Brand</h2>
    <p>We craft visually stunning and <strong>high-converting designs</strong> that help brands stand out in competitive markets. From photorealistic <strong>3D product renders</strong> to custom <strong>branding suites</strong>, packaging, and digital marketing visuals, our team brings creativity and strategy together to deliver results.</p>
    <p>From <strong>logo design</strong> to complete brand identity, we focus on designs that not only look good but also <strong>drive engagement and trust</strong>.</p>
  `,
    coverImage: "/assets/hero-graphic.png",
    icon: "Palette",
    features: [
      {
        title: "3D Product Design & Mockups",
        description: "Photorealistic 3D product renders to showcase your items in the best light for marketing and e-commerce.",
        icon: "Palette"
      },
      {
        title: "Shopify Store & Web Graphics",
        description: "Custom banners, product visuals, and UI elements designed to elevate your online store.",
        icon: "ShoppingCart"
      },
      {
        title: "Logo & Brand Identity",
        description: "Distinctive logos, typography, color palettes, and brand guidelines for a strong identity.",
        icon: "Sparkles"
      },
      {
        title: "Social Media & Ad Creatives",
        description: "Eye-catching social media posts, stories, and ad creatives designed to drive clicks.",
        icon: "Zap"
      },
      {
        title: "Packaging & Print Design",
        description: "Professional product packaging, labels, brochures, and print marketing materials.",
        icon: "ShieldCheck"
      },
      {
        title: "UI/UX Design",
        description: "Intuitive and user-friendly interfaces designed to improve user experience and retention.",
        icon: "Code"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$300",
        delivery: "5–7 Days",
        features: [
          "Logo & Brand Identity",
          "10 Social Media Creatives",
          "Up to 5 Design Revisions",
          "Basic Source Files",
          "1 Week Turnaround",
          "1 Month Support"
        ]
      },
      {
        planName: "Business",
        price: "$500–$700",
        delivery: "3–5 Days",
        recommended: true,
        features: [
          "Packaging Design",
          "Logo & Brand Identity",
          "10 Social Media Creatives",
          "Unlimited Revisions",
          "AI, PSD, PNG & PDF Source Files",
          "Priority 3–5 Day Delivery",
          "1 Month Support"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        delivery: "Custom Timeline",
        features: [
          "3D Product Design",
          "Shopify Store Design",
          "Branding",
          "Social Media Design",
          "Packaging Design",
          "Website Graphics",
          "UI/UX Design",
          "Dedicated Design Team",
          "Brand Guidelines",
          "Unlimited Revisions"
        ]
      }
    ]
  },
  {
    title: "Search Engine Optimization",
    slug: "seo-content-strategy",
    subtitle: "Dominate organic search rankings with technical site audits, keyword strategy, and high-authority link building.",
    badge: "Search Engine Optimization",
    metrics: [
      { value: "245%", label: "Avg Organic Growth" },
      { value: "Top 3", label: "Keyword Rankings" },
      { value: "98/100", label: "Technical SEO Score" }
    ],
    techStack: ["Ahrefs", "SEMrush", "Google Search Console", "Screaming Frog", "Google Analytics 4", "SurferSEO"],
    mockupSlot: "LandingMockup",
    process: [
      {
        step: "01",
        title: "Technical SEO Audit",
        description: "Comprehensive analysis of crawlability, indexation, schema markup, site speed, and site structure."
      },
      {
        step: "02",
        title: "Keyword & Competitor Mapping",
        description: "Identifying high-intent buyer keywords, content gaps, and search opportunities in your industry."
      },
      {
        step: "03",
        title: "On-Page & Content Creation",
        description: "Optimizing existing pages and crafting keyword-targeted articles to capture search traffic."
      },
      {
        step: "04",
        title: "Authority Building & Outreach",
        description: "Ethical link building, digital PR outreach, and bi-weekly keyword ranking reports."
      }
    ],
    faqs: [
      {
        question: "How long before we start seeing organic traffic results?",
        answer: "Technical fixes show improvements within 14–30 days; significant rank jumps usually occur within 60 to 90 days."
      },
      {
        question: "What monthly deliverables are included in SEO packages?",
        answer: "Monthly technical audit reports, keyword rank tracking dashboards, newly published SEO content, and backlink reports."
      },
      {
        question: "Do you offer localized SEO and Google Business Profile management?",
        answer: "Yes, our Business and Enterprise packages include complete Local SEO and Google Business Profile optimization."
      },
      {
        question: "How do you measure SEO success and ROI?",
        answer: "We track organic traffic growth, primary keyword rankings, domain authority increases, and organic conversion actions."
      }
    ],
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Boost Your Visibility, Drive Organic Growth</h2>
      <p><strong>Visibility</strong> is the currency of the digital age. Having a stunning website means nothing if your audience can’t find it. Our Search Engine Optimization focuses on driving qualified organic traffic that <strong>converts</strong>, combining technical excellence with high-quality, valuable content.</p>
      <p>We start with a comprehensive digital audit to uncover opportunities and roadblocks. Then, we create a <strong>data-driven content strategy</strong> aligned with your audience's search intent and business objectives. The result: long-term, sustainable growth and a website that works for you 24/7.</p>
    `,
    coverImage: "/assets/hero-seo.png",
    icon: "Search",
    features: [
      {
        title: "Technical SEO Audit",
        description: "In-depth analysis of speed, crawlability, schema, and mobile-friendliness.",
        icon: "Search"
      },
      {
        title: "Keyword Research & Mapping",
        description: "Identify high-intent keywords and map them to strategic content plans.",
        icon: "TrendingUp"
      },
      {
        title: "Content Creation & Optimization",
        description: "Produce engaging, optimized content for both search engines and users.",
        icon: "Sparkles"
      },
      {
        title: "Link Building & Outreach",
        description: "Ethical outreach strategies to earn high-authority backlinks.",
        icon: "Globe"
      },
      {
        title: "Local SEO",
        description: "Optimize Google Business Profile and dominate local searches.",
        icon: "Globe"
      },
      {
        title: "Analytics & Reporting",
        description: "Data-driven insights on rankings, traffic, and conversions.",
        icon: "BarChart"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$300/mo",
        delivery: "Ongoing Monthly",
        features: [
          "Technical SEO Audit",
          "Keyword Research",
          "Up to 10 Keywords",
          "Content Optimization",
          "Monthly Analytics Report"
        ]
      },
      {
        planName: "Business",
        price: "$600–$800/mo",
        delivery: "Ongoing Monthly",
        recommended: true,
        features: [
          "Everything in Starter",
          "Content Creation",
          "Link Building",
          "Local SEO",
          "Google Business Profile Optimization",
          "Bi-weekly Reports"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        delivery: "Custom Campaign",
        features: [
          "International SEO",
          "Technical SEO",
          "Enterprise SEO Strategy",
          "Dedicated SEO Team",
          "Custom Dashboards",
          "Monthly Strategy Calls"
        ]
      }
    ]
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    subtitle: "High-ROI paid social, Google Ads, and conversion funnel strategies engineered for client acquisition.",
    badge: "Growth Marketing & Paid Media",
    metrics: [
      { value: "4.2x", label: "Average ROAS" },
      { value: "12.8%", label: "Campaign CTR" },
      { value: "50k+", label: "Leads Generated" }
    ],
    techStack: ["Meta Ads Manager", "Google Ads", "TikTok Ads", "Klaviyo", "Google Tag Manager", "HubSpot"],
    mockupSlot: "DigitalMockup",
    process: [
      {
        step: "01",
        title: "Audience & Funnel Audit",
        description: "Analyzing customer personas, competitor ad strategies, landing page flows, and tracking pixels."
      },
      {
        step: "02",
        title: "Ad Creative & Copywriting",
        description: "Developing high-converting video teasers, static banners, persuasive ad copy, and offer variations."
      },
      {
        step: "03",
        title: "Campaign Setup & Launch",
        description: "Configuring multi-stage retargeting and prospecting campaigns on Meta, Google, and TikTok."
      },
      {
        step: "04",
        title: "Scaling & Optimization",
        description: "Continuous A/B testing of creatives, audience targeting refinements, and daily budget optimization."
      }
    ],
    faqs: [
      {
        question: "How soon do paid advertising campaigns go live?",
        answer: "Campaign structure, pixel tracking, and ad creative setup typically require 3 to 5 business days before launch."
      },
      {
        question: "Which advertising channels do you specialize in?",
        answer: "We run high-converting campaigns across Meta (Facebook & Instagram), Google Ads (Search & Shopping), and TikTok."
      },
      {
        question: "Is client ad budget included in package prices?",
        answer: "No, package pricing covers strategy, ad creation, campaign management, and reporting; ad spend is paid directly to platforms."
      },
      {
        question: "How do you track campaign ROI and conversion performance?",
        answer: "We set up server-side Conversions API, Google Tag Manager event tracking, and provide real-time reporting dashboards."
      }
    ],
    description: `
      <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Data-Driven Campaigns That Deliver Results</h2>
      <p>Achieve <strong>explosive growth</strong> with our precision-targeted digital marketing campaigns. We craft high-ROI strategies for platforms like Meta (Facebook & Instagram), Google, and TikTok, focusing on metrics that truly matter—<strong>leads, sales, and ROI</strong>.</p>
      <p>From ad creative development to A/B testing, we handle the entire campaign lifecycle, providing you with transparent reporting and actionable insights every step of the way.</p>
    `,
    coverImage: "/assets/hero-digital.png",
    icon: "BarChart",
    features: [
      {
        title: "Paid Social Campaigns",
        description: "Facebook, Instagram, LinkedIn, and TikTok campaigns for precise targeting.",
        icon: "Zap"
      },
      {
        title: "Search Engine Marketing (SEM)",
        description: "Google Ads campaigns targeting high-intent searchers.",
        icon: "Search"
      },
      {
        title: "Conversion Rate Optimization (CRO)",
        description: "Improve landing pages and user flows to boost conversions.",
        icon: "TrendingUp"
      },
      {
        title: "Email & Funnel Marketing",
        description: "Nurture leads and drive repeat business with automated funnels.",
        icon: "Globe"
      },
      {
        title: "Analytics & Reporting",
        description: "Live dashboards with actionable insights and ROI tracking.",
        icon: "BarChart"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$400/mo",
        delivery: "Ongoing Monthly",
        features: [
          "Facebook or Instagram Ads",
          "Basic Email Marketing",
          "Monthly Analytics",
          "Client Ad Budget"
        ]
      },
      {
        planName: "Business",
        price: "$800–$1,000/mo",
        delivery: "Ongoing Monthly",
        recommended: true,
        features: [
          "Multi-platform Ads",
          "Google Ads Management",
          "Conversion Rate Optimization",
          "Funnel Strategy",
          "Bi-weekly Reports"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        delivery: "Custom Campaign",
        features: [
          "Full Funnel Marketing",
          "Paid Social",
          "SEM",
          "Email Marketing",
          "CRO",
          "Dedicated Marketing Team",
          "Weekly Strategy Calls"
        ]
      }
    ]
  },
  {
    title: "Video & Motion Design",
    slug: "video-editing",
    subtitle: "High-impact video editing, motion graphics, and short-form ad creatives engineered for maximum retention.",
    badge: "High-Impact Motion & Video",
    metrics: [
      { value: "85%", label: "Audience Retention" },
      { value: "48h", label: "Express Export" },
      { value: "4K 60FPS", label: "Ultra HD Quality" }
    ],
    techStack: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Audition", "Cinema 4D", "Topaz Video AI"],
    mockupSlot: "VideoEditingMockup",
    process: [
      {
        step: "01",
        title: "Footage Ingestion & Script Review",
        description: "Reviewing raw footage, audio tracks, brand guidelines, and target platform specifications."
      },
      {
        step: "02",
        title: "Dynamic Story Assembly",
        description: "Cutting raw takes, timing hook transitions, adding kinetic captions, and pacing to match music audio."
      },
      {
        step: "03",
        title: "Motion Graphics & Color",
        description: "Designing 2D/3D visual effects, animated lower thirds, sound design, and cinema color grading."
      },
      {
        step: "04",
        title: "Multi-Platform Export",
        description: "Delivering crisp 4K exports tailored for vertical reels (9:16) and landscape broadcasts (16:9)."
      }
    ],
    faqs: [
      {
        question: "What is the typical turnaround time for video editing projects?",
        answer: "Standard short-form videos (Reels/TikToks) take 24 to 48 hours; larger commercial video projects take 3 to 5 days."
      },
      {
        question: "What deliverables and aspect ratios are provided?",
        answer: "We supply 4K MP4/MOV exports in vertical 9:16, square 1:1, and widescreen 16:9, plus full project files upon request."
      },
      {
        question: "Are stock footage, sound effects, and licensed music included?",
        answer: "Yes, all plans include commercial licensing for royalty-free music, sound effects, and premium stock footage."
      },
      {
        question: "How many revisions are allowed per video asset?",
        answer: "Starter includes 1 revision round, while Business and Enterprise include unlimited revisions to ensure perfection."
      }
    ],
    description: `
    <h2 class="text-3xl font-bold mb-4 text-[var(--foreground-heading)]">Video & Motion Design</h2>
    <p>Capture attention in the first three seconds with <strong>high-impact visual storytelling</strong>, motion graphics, and conversion-focused video editing.</p>
  `,
    coverImage: "/assets/hero-video.png",
    icon: "Film",
    features: [
      {
        title: "Amazon Video Editing",
        description: "Product videos built for Amazon listings and Amazon Video Ads, sized and paced to hold attention and support conversions.",
        icon: "ShoppingBag"
      },
      {
        title: "Ad Creative Videos",
        description: "Short promotional videos for Meta, Google, TikTok, and Amazon Ads, designed to capture attention and improve click-through rates.",
        icon: "Zap"
      },
      {
        title: "Social Media Video Editing",
        description: "Short-form and long-form videos for Instagram, Facebook, TikTok, LinkedIn, and YouTube, with captions and platform-ready formatting.",
        icon: "Film"
      },
      {
        title: "Motion Graphics",
        description: "2D and 3D animation, kinetic typography, animated logos, and visual effects that give your videos a polished look.",
        icon: "Sparkles"
      },
      {
        title: "Brand & Promotional Videos",
        description: "Brand stories, corporate videos, and product teasers that build trust and strengthen your brand image.",
        icon: "Play"
      }
    ],
    pricingPlans: [
      {
        planName: "Starter",
        price: "$200",
        delivery: "3–5 Days",
        features: [
          "Social Media Video Editing",
          "Up to 5 Short Videos",
          "Basic Motion Graphics",
          "Royalty-Free Music",
          "HD Export",
          "1 Revision"
        ]
      },
      {
        planName: "Business",
        price: "$400–$500",
        delivery: "48h Express",
        recommended: true,
        features: [
          "Up to 20 Professional Videos",
          "Motion Graphics",
          "Commercial Ad Creatives",
          "Brand Promo Videos",
          "Amazon Product Videos",
          "Color Grading",
          "Sound Design",
          "Priority Delivery",
          "Unlimited Revisions"
        ]
      },
      {
        planName: "Enterprise",
        price: "Let's Talk",
        delivery: "Custom Timeline",
        features: [
          "Unlimited Video Production",
          "Commercial Campaigns",
          "Motion Graphics",
          "2D Animation",
          "Amazon Listing Videos",
          "Product Launch Videos",
          "Dedicated Video Editor",
          "Monthly Content Production",
          "Ongoing Creative Support"
        ]
      }
    ]
  }
];

export const getServiceBySlug = (slug) => {
  return servicesData.find(service => service.slug === slug);
};

