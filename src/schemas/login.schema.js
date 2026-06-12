import { z } from 'zod';

export const loginSchema = z.object({
  userId: z.string().min(3, 'User ID is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
