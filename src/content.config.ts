import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const seoFields = {
  title: z.string().min(10).max(70),
  description: z.string().min(50).max(170),
  draft: z.boolean().default(false),
  updatedDate: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
};

const services = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/services' }),
  schema: z.object({
    ...seoFields,
    name: z.string(),
    summary: z.string(),
    order: z.number().default(99),
    countries: z.array(z.string()).default([]),
  }),
});

const industries = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/industries' }),
  schema: z.object({
    ...seoFields,
    name: z.string(),
    summary: z.string(),
    relatedServices: z.array(z.string()).default([]),
  }),
});

const products = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/products' }),
  schema: z.object({
    ...seoFields,
    name: z.string(),
    domain: z.string(),
    status: z.enum(['live', 'in-development', 'verify']),
    market: z.string(),
    summary: z.string(),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/case-studies' }),
  schema: z.object({
    ...seoFields,
    name: z.string(),
    product: z.string().optional(),
    summary: z.string(),
    buildTime: z.string().optional(),
    teamSize: z.string().optional(),
    conventionalEstimate: z.string().optional(),
    stack: z.array(z.string()).default([]),
    verify: z.boolean().default(false),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: z.object({
    ...seoFields,
    pubDate: z.coerce.date(),
    author: z.string().default('DGV Engineering'),
    summary: z.string(),
    outlineOnly: z.boolean().default(false),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossary' }),
  schema: z.object({
    ...seoFields,
    term: z.string(),
    summary: z.string(),
  }),
});

const comparisons = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/comparisons' }),
  schema: z.object({
    ...seoFields,
    name: z.string(),
    summary: z.string(),
  }),
});

export const collections = {
  services,
  industries,
  products,
  caseStudies,
  insights,
  glossary,
  comparisons,
};
