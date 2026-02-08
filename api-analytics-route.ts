// app/api/analytics/route.ts
// Analytics API - Track & Retrieve Data

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const schema = z.object({
      path: z.string(),
      title: z.string().optional(),
      referrer: z.string().optional(),
      visitorId: z.string().optional(),
    });

    const { path, title, referrer, visitorId } = schema.parse(body);

    // Get client info
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Simple device detection
    const isMobile = /mobile/i.test(userAgent);
    const device = isMobile ? 'mobile' : 'desktop';

    // Simple browser detection
    let browser = 'other';
    if (userAgent.includes('Chrome')) browser = 'chrome';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Safari')) browser = 'safari';
    else if (userAgent.includes('Edge')) browser = 'edge';

    // Create page view
    await prisma.pageView.create({
      data: {
        path,
        title,
        referrer,
        visitorId,
        ipAddress: ip,
        userAgent,
        device,
        browser,
      },
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Failed to track page view:', error);
    return NextResponse.json(
      { error: 'Failed to track page view' },
      { status: 500 }
    );
  }
}

// Get analytics dashboard data (admin only)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Total page views
    const totalPageViews = await prisma.pageView.count({
      where: { createdAt: { gte: startDate } },
    });

    // Unique visitors
    const uniqueVisitors = await prisma.pageView.groupBy({
      by: ['visitorId'],
      where: {
        createdAt: { gte: startDate },
        visitorId: { not: null },
      },
    });

    // Top pages
    const topPages = await prisma.pageView.groupBy({
      by: ['path'],
      _count: { path: true },
      where: { createdAt: { gte: startDate } },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    });

    // Page views by day
    const pageViewsByDay = await prisma.$queryRaw`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as views,
        COUNT(DISTINCT visitor_id) as unique_visitors
      FROM page_views
      WHERE created_at >= ${startDate}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Device breakdown
    const deviceBreakdown = await prisma.pageView.groupBy({
      by: ['device'],
      _count: { device: true },
      where: { createdAt: { gte: startDate } },
    });

    // Browser breakdown
    const browserBreakdown = await prisma.pageView.groupBy({
      by: ['browser'],
      _count: { browser: true },
      where: { createdAt: { gte: startDate } },
    });

    // Top referrers
    const topReferrers = await prisma.pageView.groupBy({
      by: ['referrer'],
      _count: { referrer: true },
      where: {
        createdAt: { gte: startDate },
        referrer: { not: null },
      },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    });

    // Recent events
    const recentEvents = await prisma.event.findMany({
      where: { createdAt: { gte: startDate } },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    // Events breakdown
    const eventBreakdown = await prisma.event.groupBy({
      by: ['name'],
      _count: { name: true },
      where: { createdAt: { gte: startDate } },
      orderBy: { _count: { name: 'desc' } },
    });

    return NextResponse.json({
      summary: {
        totalPageViews,
        uniqueVisitors: uniqueVisitors.length,
        averagePageViews: totalPageViews / days,
      },
      topPages: topPages.map((p) => ({
        path: p.path,
        views: p._count.path,
      })),
      pageViewsByDay,
      deviceBreakdown: deviceBreakdown.map((d) => ({
        device: d.device,
        count: d._count.device,
      })),
      browserBreakdown: browserBreakdown.map((b) => ({
        browser: b.browser,
        count: b._count.browser,
      })),
      topReferrers: topReferrers.map((r) => ({
        referrer: r.referrer,
        count: r._count.referrer,
      })),
      eventBreakdown: eventBreakdown.map((e) => ({
        name: e.name,
        count: e._count.name,
      })),
      recentEvents,
    });

  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}

// app/api/analytics/track-event/route.ts
// Track custom events
export async function POSTEvent(request: NextRequest) {
  try {
    const body = await request.json();

    const schema = z.object({
      name: z.string(),
      category: z.string().optional(),
      label: z.string().optional(),
      value: z.number().optional(),
      path: z.string(),
      visitorId: z.string().optional(),
      metadata: z.record(z.any()).optional(),
    });

    const data = schema.parse(body);

    await prisma.event.create({
      data,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Failed to track event:', error);
    return NextResponse.json(
      { error: 'Failed to track event' },
      { status: 500 }
    );
  }
}

// Client-side tracking function to add to your portfolio
/*
// utils/analytics.ts

export async function trackPageView(path: string, title?: string) {
  try {
    const visitorId = getOrCreateVisitorId();

    await fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path,
        title,
        referrer: document.referrer,
        visitorId,
      }),
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

export async function trackEvent(
  name: string,
  options?: {
    category?: string;
    label?: string;
    value?: number;
    metadata?: Record<string, any>;
  }
) {
  try {
    const visitorId = getOrCreateVisitorId();

    await fetch('/api/analytics/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        path: window.location.pathname,
        visitorId,
        ...options,
      }),
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
}

function getOrCreateVisitorId(): string {
  let visitorId = localStorage.getItem('visitorId');

  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
  }

  return visitorId;
}

// Usage examples:
// trackPageView('/blog/my-post', 'My Blog Post');
// trackEvent('button_click', { category: 'engagement', label: 'CTA Button' });
// trackEvent('form_submit', { category: 'conversion', label: 'Contact Form' });
*/
