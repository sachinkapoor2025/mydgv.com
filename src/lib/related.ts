export type RelatedItem = {
  title: string;
  href: string;
  collection?: string;
  tags?: string[];
};

/**
 * Returns 4–6 related pages for a given collection and tag set.
 * Expanded in later phases as content collections fill out.
 */
export function getRelated(
  collection: string,
  tags: string[] = [],
  limit = 6,
): RelatedItem[] {
  const tagSet = new Set(tags.map((t) => t.toLowerCase()));

  const pool: RelatedItem[] = [
    {
      title: 'How we build AI-native systems',
      href: '/how-we-build/',
      collection: 'methodology',
      tags: ['ai', 'delivery', 'methodology'],
    },
    {
      title: 'AI code quality and security',
      href: '/how-we-build/ai-code-quality-and-security/',
      collection: 'methodology',
      tags: ['ai', 'security', 'review'],
    },
    {
      title: 'Services overview',
      href: '/services/',
      collection: 'services',
      tags: ['services'],
    },
    {
      title: 'Ecommerce development',
      href: '/services/ecommerce-development/',
      collection: 'services',
      tags: ['ecommerce', 'woocommerce'],
    },
    {
      title: 'LLM SEO',
      href: '/services/llm-seo/',
      collection: 'services',
      tags: ['seo', 'llm', 'ai'],
    },
    {
      title: 'AI solutions',
      href: '/services/ai-solutions/',
      collection: 'services',
      tags: ['ai', 'automation'],
    },
    {
      title: 'USARakhi case study',
      href: '/case-studies/usarakhi-ai-built-ecommerce/',
      collection: 'caseStudies',
      tags: ['ecommerce', 'ai', 'usa'],
    },
    {
      title: 'HalloweenReady stack clone',
      href: '/case-studies/halloweenready-stack-clone/',
      collection: 'caseStudies',
      tags: ['ecommerce', 'aws', 'ai'],
    },
    {
      title: 'Products we own and operate',
      href: '/products/',
      collection: 'products',
      tags: ['products', 'proof'],
    },
    {
      title: 'FAQ',
      href: '/faq/',
      collection: 'pages',
      tags: ['faq'],
    },
    {
      title: 'Contact DGV',
      href: '/contact/',
      collection: 'pages',
      tags: ['contact'],
    },
    {
      title: 'About DGV',
      href: '/about/',
      collection: 'pages',
      tags: ['about', 'company'],
    },
  ];

  const scored = pool
    .filter((item) => item.collection !== collection || tags.length === 0)
    .map((item) => {
      const overlap = (item.tags ?? []).filter((t) => tagSet.has(t)).length;
      const sameCollection = item.collection === collection ? 0.5 : 0;
      return { item, score: overlap + sameCollection };
    })
    .sort((a, b) => b.score - a.score);

  const picked = scored.slice(0, limit).map((s) => s.item);
  if (picked.length >= 4) return picked;

  const fallback = pool.filter((p) => !picked.some((x) => x.href === p.href));
  return [...picked, ...fallback].slice(0, Math.max(4, limit));
}
