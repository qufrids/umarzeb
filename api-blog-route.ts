// app/api/blog/route.ts
// Blog API - CRUD Operations

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { z } from 'zod';

// Validation schema for blog post
const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  excerpt: z.string().optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  coverImage: z.string().url().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

// GET - List all blog posts (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const tag = searchParams.get('tag');
    const featured = searchParams.get('featured') === 'true';

    // Build query
    const where: any = { published: true };
    if (tag) {
      where.tags = { some: { slug: tag } };
    }
    if (featured) {
      where.featured = true;
    }

    // Fetch posts
    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          coverImage: true,
          featured: true,
          views: true,
          publishedAt: true,
          createdAt: true,
          author: {
            select: {
              name: true,
              image: true,
            },
          },
          tags: {
            select: {
              name: true,
              slug: true,
            },
          },
        },
        orderBy: { publishedAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST - Create new blog post (admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add authentication check
    // const session = await getServerSession();
    // if (!session || session.user.role !== 'ADMIN') {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Create blog post
    const post = await prisma.blogPost.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        coverImage: validatedData.coverImage,
        published: validatedData.published,
        featured: validatedData.featured,
        metaTitle: validatedData.metaTitle,
        metaDescription: validatedData.metaDescription,
        publishedAt: validatedData.published ? new Date() : null,
        authorId: 'USER_ID_HERE', // TODO: Get from session
        tags: validatedData.tags
          ? {
              connectOrCreate: validatedData.tags.map((tagName) => ({
                where: { name: tagName },
                create: {
                  name: tagName,
                  slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                },
              })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      post,
    });

  } catch (error) {
    console.error('Failed to create blog post:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// app/api/blog/[slug]/route.ts
// GET - Single blog post by slug
export async function GETBySlug(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            name: true,
            image: true,
          },
        },
        tags: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    });

    if (!post) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    // Track page view
    await prisma.pageView.create({
      data: {
        path: `/blog/${slug}`,
        title: post.title,
      },
    });

    return NextResponse.json({ post });

  } catch (error) {
    console.error('Failed to fetch blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

// PUT - Update blog post (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // TODO: Add authentication check

    const { slug } = params;
    const body = await request.json();
    const validatedData = blogPostSchema.partial().parse(body);

    const post = await prisma.blogPost.update({
      where: { slug },
      data: {
        ...validatedData,
        publishedAt:
          validatedData.published !== undefined
            ? validatedData.published
              ? new Date()
              : null
            : undefined,
        tags: validatedData.tags
          ? {
              set: [],
              connectOrCreate: validatedData.tags.map((tagName) => ({
                where: { name: tagName },
                create: {
                  name: tagName,
                  slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                },
              })),
            }
          : undefined,
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      post,
    });

  } catch (error) {
    console.error('Failed to update blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

// DELETE - Delete blog post (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // TODO: Add authentication check

    const { slug } = params;

    await prisma.blogPost.delete({
      where: { slug },
    });

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    });

  } catch (error) {
    console.error('Failed to delete blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
