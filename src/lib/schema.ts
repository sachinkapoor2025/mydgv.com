import { ADDRESSES, SITE, TARGET_COUNTRIES } from './site';

type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    name: SITE.name,
    legalName: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    email: SITE.email,
    telephone: SITE.phoneE164,
    foundingDate: SITE.foundingDate,
    areaServed: TARGET_COUNTRIES.map((name) => ({ '@type': 'Country', name })),
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'H. No. 392, Mohalla Sodia Wala',
        addressLocality: 'Ferozepur City',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
        name: ADDRESSES.registered.name,
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'Plot 4, Ek Murti Chowk, Greater Noida West',
        addressLocality: 'Noida',
        addressRegion: 'UP',
        postalCode: '201308',
        addressCountry: 'IN',
        name: ADDRESSES.operational.name,
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'San Jose',
        addressRegion: 'CA',
        addressCountry: 'US',
        name: ADDRESSES.warehouse.name,
      },
    ],
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE.url}/insights/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; item: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

export function faqSchema(
  faqs: { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function serviceSchema(opts: {
  name: string;
  description: string;
  url: string;
}): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    provider: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
    areaServed: TARGET_COUNTRIES.map((name) => ({ '@type': 'Country', name })),
    serviceType: opts.name,
  };
}

export function toJsonLd(data: JsonLd): string {
  return JSON.stringify(data);
}
