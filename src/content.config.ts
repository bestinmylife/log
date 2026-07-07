import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const books = defineCollection({
  loader: glob({ base: './src/content/books', pattern: '*.json' }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
    order: z.number().default(0),
  }),
});

const chapters = defineCollection({
  loader: glob({ base: './src/content/chapters', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    order: z.number(),
    part: z.string().optional(),
  }),
});

export const collections = { blog, books, chapters };
