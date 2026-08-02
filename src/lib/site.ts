export const SITE = {
  name: 'Divit Global Ventures',
  shortName: 'DGV',
  url: 'https://www.mydgv.com',
  email: 'dgv@mydgv.com',
  phoneDisplay: '+91-9650457697',
  phoneE164: '+919650457697',
  whatsappUrl: 'https://wa.me/919650457697',
  foundingDate: '2023',
  teamSize: 8,
  logo: '/images/logo.png',
  description:
    'AI-native IT services company that builds, owns and operates commercial products — not just client software.',
} as const;

export const ADDRESSES = {
  registered: {
    name: 'Registered office',
    line: 'H. No. 392, Mohalla Sodia Wala, Ferozepur City, Punjab, India',
  },
  operational: {
    name: 'Operational office',
    line: 'Plot 4, Ek Murti Chowk, Greater Noida West, Noida, UP 201308, India',
  },
  warehouse: {
    name: 'Warehouse',
    line: 'San Jose, California, USA',
  },
} as const;

export const TARGET_COUNTRIES = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'Netherlands',
  'Nordics',
  'India',
] as const;

export const PRODUCTS = [
  { name: 'USARakhi.com', href: '/products/usarakhi/', status: 'Live' },
  { name: 'HalloweenReady.com', href: '/products/halloweenready/', status: 'Live' },
  { name: 'ContainersClub.com', href: '/products/containersclub/', status: 'Live' },
  { name: 'ContainerBazar.com', href: '/products/containerbazar/', status: 'Live' },
  { name: 'MaharajaChef.com', href: '/products/maharajachef/', status: 'Live' },
  { name: 'Yeshola.com', href: '/products/yeshola/', status: 'In development' },
] as const;

export const SERVICES_NAV = [
  { title: 'AI Solutions', href: '/services/ai-solutions/' },
  { title: 'AI Agents & Automation', href: '/services/ai-agents-and-automation/' },
  { title: 'AI Chatbots', href: '/services/ai-chatbots/' },
  { title: 'AI-Enabled CRM', href: '/services/ai-enabled-crm/' },
  { title: 'Custom Software', href: '/services/custom-software-development/' },
  { title: 'Web Development', href: '/services/web-development/' },
  { title: 'Ecommerce', href: '/services/ecommerce-development/' },
  { title: 'Marketplace Development', href: '/services/marketplace-development/' },
  { title: 'Cloud Migration', href: '/services/cloud-migration/' },
  { title: 'DevOps & Managed Cloud', href: '/services/devops-and-managed-cloud/' },
  { title: 'SEO', href: '/services/seo/' },
  { title: 'LLM SEO', href: '/services/llm-seo/' },
  { title: 'Paid Advertising', href: '/services/paid-advertising/' },
  { title: 'Data & Analytics', href: '/services/data-and-analytics/' },
] as const;

export const PAIRING_STATEMENT =
  'AI is the labour. Senior engineers decide what gets built, review every line before it merges, and stay financially responsible for the production systems we own.';

export const PAIRING_SPEED =
  'Nothing is written by hand. A change request becomes a working feature the same day.';

/** Absolute canonical URL with trailing slash. */
export function canonical(path = '/'): string {
  if (path === '/' || path === '') return `${SITE.url}/`;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${clean.endsWith('/') ? clean : `${clean}/`}`;
}
