const { z } = require('zod');

const createStandardSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  title: z.string().min(1, 'Title is required'),
  icon: z.string().min(1).optional(),
  summary: z.string().min(1, 'Summary is required'),
  order: z.number().int().optional(),
});

const updateStandardSchema = createStandardSchema.partial();

const createVersionSchema = z.object({
  versionNumber: z.string().min(1, 'Version number is required'),
});

const blockSchema = z.object({
  type: z.enum(['paragraph', 'list', 'nested_list', 'table', 'equation']),
  data: z.any(),
  order: z.number().int(),
});

const sectionSchema = z.object({
  numbering: z.array(z.number().int()).min(1),
  title: z.string().min(1, 'Section title is required'),
  order: z.number().int(),
  blocks: z.array(blockSchema).optional().default([]),
});

const updateSectionsSchema = z.object({
  sections: z.array(sectionSchema),
});

const transitionSchema = z.object({
  status: z.enum(['draft', 'public_consultation', 'certified']),
  consultationStart: z.string().datetime().optional(),
  consultationEnd: z.string().datetime().optional(),
  certifiedDate: z.string().datetime().optional(),
});

module.exports = {
  createStandardSchema,
  updateStandardSchema,
  createVersionSchema,
  updateSectionsSchema,
  transitionSchema,
};
