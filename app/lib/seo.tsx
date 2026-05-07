import { Blog, Service, CaseStudy } from "@prisma/client";

export function generateBlogSchema(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.image,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "RankNexis Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "RankNexis",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ranknexis.com/logo.png"
      }
    },
    "datePublished": post.createdAt,
    "dateModified": post.updatedAt,
    "description": post.metaDescription || post.title,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ranknexis.com/blog/${post.slug}`
    }
  };
}

export function generateServiceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "RankNexis"
    },
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.category,
      "itemListElement": service.features.map((f, i) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": f
        }
      }))
    }
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "RankNexis",
    "url": "https://www.ranknexis.com",
    "logo": "https://www.ranknexis.com/logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/ranknexis",
      "https://twitter.com/ranknexis"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-RANK-NEX",
      "contactType": "Customer Service"
    }
  };
}
