import { z } from 'zod';

export const questionSchema = z.object({
  type: z.literal('mcq'),
  body: z.string().min(1, 'Question is required'),
  options: z.array(z.string().min(1, 'Option cannot be empty')).length(4, 'Must have 4 options'),
  correctIndex: z.number().int().min(0).max(3),
  solution: z.string().optional().default(''),
  difficulty: z.enum(['easy', 'medium', 'difficult']),
  topic: z.string().min(1),
  subTopic: z.string().min(1),
});
