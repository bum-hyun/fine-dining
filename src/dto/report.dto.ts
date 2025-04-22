import { z } from 'zod';

export const ReportSchema = z.object({
  id: z.string(),
  content: z.string().nullable(),
  user_id: z.string().nullable(),
  created_at: z.string().nullable(),
});

// Infer Types
export type TReport = z.infer<typeof ReportSchema>;
