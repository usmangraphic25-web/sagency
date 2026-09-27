import { NextResponse } from 'next/server';
import { getProjects, saveProject } from '@/lib/portfolioStore';
import { verifyAdminPassword } from '@/lib/leadStore';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    let projects = await getProjects();

    if (category) {
      const catLower = category.toLowerCase().trim();
      const isGraphic = ['graphic', 'graphic-design', 'graphic-designing'].includes(catLower);
      const isLogoBranding = ['logo-branding', 'logo-brand-identity'].includes(catLower);

      const GRAPHIC_SLUGS = [
        'logo-branding', 'logo-brand-identity', 'ui-ux-design',
        'packaging-print-design', 'social-media-ad-creatives',
        '3d-product-design-mockups', 'shopify-store-web-graphics'
      ];

      projects = projects.filter(p => {
        const pCat = (p.categorySlug || '').toLowerCase().trim();
        const pSub = (p.subCategory || '').toLowerCase().trim();
        const pServ = (p.service || '').toLowerCase().trim();

        if (isGraphic) {
          return pServ.includes('graphic') || GRAPHIC_SLUGS.includes(pCat) || GRAPHIC_SLUGS.includes(pSub);
        }
        if (isLogoBranding) {
          return pCat === 'logo-branding' || pCat === 'logo-brand-identity' || pSub === 'logo-branding' || pSub === 'logo-brand-identity';
        }
        return (
          pCat === catLower ||
          pSub === catLower ||
          pServ.replace(/\s+/g, '-') === catLower
        );
      });
    }
    if (status) {
      const statusLower = status.toLowerCase().trim();
      if (['published', 'visible', 'public'].includes(statusLower)) {
        projects = projects.filter(p => {
          const pStatusUpper = (p.status || '').toUpperCase().trim();
          return p.published !== false && pStatusUpper !== 'HIDDEN' && !p.deleted;
        });
      } else if (statusLower === 'hidden') {
        projects = projects.filter(p => {
          const pStatusUpper = (p.status || '').toUpperCase().trim();
          return pStatusUpper === 'HIDDEN' || p.published === false;
        });
      } else {
        projects = projects.filter(p => (p.status || '').toLowerCase() === statusLower);
      }
    }

    return NextResponse.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    console.error('API getProjects Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio projects.' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { authPin, project } = body;

    // Verify admin PIN
    if (!authPin || !(await verifyAdminPassword(authPin))) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid Admin PIN.' },
        { status: 401 }
      );
    }

    if (!project || !project.title || !project.categorySlug) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title and categorySlug are required.' },
        { status: 400 }
      );
    }

    const savedProject = await saveProject(project);
    return NextResponse.json({ success: true, message: 'Project saved successfully.', data: savedProject });
  } catch (error) {
    console.error('API saveProject Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to save project.' },
      { status: 500 }
    );
  }
}
