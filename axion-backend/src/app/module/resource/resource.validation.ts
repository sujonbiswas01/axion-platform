import { z } from 'zod';

export const createResourceValidationSchema = z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(150, "Title cannot exceed 150 characters")
      .trim(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .trim(),

    tags: z
      .array(z.string().min(1, "Tag cannot be empty").trim())
      .min(1, "At least one tag is required"),
    thumbnail: z.any().optional(),
    pdfFile: z.any().optional(),
});

export const updateResourceValidationSchema = createResourceValidationSchema.partial();