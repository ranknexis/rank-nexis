import { Metadata } from "next";

export function getSectionData(sectionsMap: Record<string, any> | undefined, key: string, fallback: any = {}) {
  return sectionsMap?.[key] ?? fallback;
}

export function buildSeoMetadata(
  page: any,
  fallback: { title: string; description: string; ogImage?: string },
  prefix: string = ""
): Metadata {
  if (!page) return {
    title: fallback.title,
    description: fallback.description
  };

  const title = page.metaTitle || fallback.title;
  const description = page.metaDescription || fallback.description;
  const ogImage = page.ogImage || fallback.ogImage;

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.ranknexis.com';
  const cleanPrefix = prefix.startsWith('/') ? prefix : `/${prefix}`;
  const canonicalPath = page.canonicalUrl || (page.slug === 'home' ? '/' : `${cleanPrefix}${prefix ? '/' : ''}${page.slug}`);
  const canonical = `${baseUrl}${canonicalPath.replace(/\/+$/, '')}`;

  return {
    title: title,
    description: description,
    keywords: page.metaKeywords?.length ? page.metaKeywords : undefined,
    alternates: {
      canonical: canonical
    },
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

