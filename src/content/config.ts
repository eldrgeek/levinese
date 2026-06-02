import { defineCollection, z } from 'astro:content';

const papers = defineCollection({
  type: 'data',
  schema: z.object({
    doi: z.string().nullable().optional(),
    doi_url: z.string().nullable().optional(),
    link: z.string().nullable().optional(),
    source_type: z.string().optional(),
    title: z.string(),
    year: z.union([z.string(), z.number()]).optional(),
    journal: z.string().optional(),
    authors: z.array(z.string()).optional().default([]),
    abstract: z.string().optional().default(''),
    pmid: z.string().nullable().optional(),
    pmc: z.string().nullable().optional(),
    reachable: z.boolean().nullable().optional().default(false),
    reachable_status: z.number().nullable().optional(),
  }),
});

const terms = defineCollection({
  type: 'content',
  schema: z.object({
    letter: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    authored_by: z.string(),
    authored_by_note: z.string().optional(),
    source: z.string(),
    provenance: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    is_new: z.boolean().optional().default(false),
    contested: z.boolean().optional().default(false),
    contested_note: z.string().optional(),
    marginalia: z.array(z.object({
      author: z.string(),
      text: z.string(),
    })).optional().default([]),
  }),
});

export const collections = { papers, terms };
