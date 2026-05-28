import { z } from 'zod';

export const videoValidationSchema = z.object({
  title: z.string()
    .min(6, "Title must be at least 6 characters long")
    .max(100, "Title must be at most 100 characters long"),
    
  description: z
    .string()
    .trim()
    .optional(),
    
  thumbnail: z.any().optional(),
    
  videoFile:z.any().optional(),
    
  tags: z
    .array(z.string().min(1).trim())
    .min(1, { message: "At least one tag is required" }),
    
  category: z
    .string()
    .min(1, 'Category is required')
    .trim(),
    
  visibility: z
    .enum(['PUBLIC', 'UNLISTED', 'PRIVATE'])
    .default('PUBLIC'),
});



export const UpdateValidationSchema = z.object({
  title: z
    .string()
    .optional(),
    
  description: z
    .string()
    .trim()
    .optional(),
    
  thumbnail: z.any().optional(),
    
  videoFile: z.any().optional(),
    
  tags: z
    .array(z.string().trim())
    .optional(),
    
  category: z.string().optional(),
    
  visibility: z
    .enum(['PUBLIC', 'UNLISTED', 'PRIVATE'])
    .default('PUBLIC')
    .optional(),
});
