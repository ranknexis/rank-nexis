import { Metadata } from "next";

/**
 * Safely get a section's content with a fallback.
 */
export function getSectionData(sectionsMap: Record<string, any> | undefined, key: string, fallback: any = {}) {
  return sectionsMap?.[key] ?? fallback;
}

/**
 * Build Next.js metadata from page SEO fields.
 */
export function buildSeoMetadata(page: any, fallback: { title: string; description: string; ogImage?: string }): Metadata {
  if (!page) return {
    title: fallback.title,
    description: fallback.description
  };

  const title = page.metaTitle || fallback.title;
  const description = page.metaDescription || fallback.description;
  const ogImage = page.ogImage || fallback.ogImage;

  return {
    title: title,
    description: description,
    keywords: page.metaKeywords?.length ? page.metaKeywords : undefined,
    alternates: page.canonicalUrl ? { canonical: page.canonicalUrl } : undefined,
    robots: page.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.ogTitle || title,
      description: page.ogDescription || description,
      images: ogImage ? [ogImage] : undefined,
    }
  };
}

