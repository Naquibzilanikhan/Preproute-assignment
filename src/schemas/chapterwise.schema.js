import { z } from 'zod';

export const chapterwiseSchema = z.object({
  subject: z.string().min(1, 'Subject is required'),
  testName: z.string().min(1, 'Test name is required').max(120),
  topic: z.string().min(1, 'Topic is required'),
  subTopic: z.string().min(1, 'Sub-topic is required'),
  duration: z.coerce.number().int().positive('Duration must be > 0'),
  difficulty: z.enum(['easy', 'medium', 'difficult']),
  marking: z.object({
    wrong: z.coerce.number(),
    unattempted: z.coerce.number(),
    correct: z.coerce.number(),
  }),
  numQuestions: z.coerce.number().int().positive('Must be > 0'),
});
