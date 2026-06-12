import { z } from 'zod';

export const publishSchema = z.object({
  publishMode: z.enum(['now', 'schedule']),
  scheduledAt: z.date().optional(),
  liveUntil: z.enum(['always', '1w', '2w', '3w', '1m', 'custom']),
  customEnd: z.date().optional(),
}).superRefine((v, ctx) => {
  if (v.publishMode === 'schedule' && !v.scheduledAt) {
    ctx.addIssue({ code: 'custom', path: ['scheduledAt'], message: 'Pick a date and time' });
  }
  if (v.liveUntil === 'custom' && !v.customEnd) {
    ctx.addIssue({ code: 'custom', path: ['customEnd'], message: 'Pick an end date and time' });
  }
  if (v.scheduledAt && v.customEnd && v.customEnd <= v.scheduledAt) {
    ctx.addIssue({ code: 'custom', path: ['customEnd'], message: 'End must be after start' });
  }
});
