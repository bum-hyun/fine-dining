import { z } from 'zod';

// IUser
export const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  nickname: z.string(),
  avatar_url: z.string(),
  role: z.string().optional(),
  id: z.string(),
  provider: z.string().optional(),
});

// Infer Types
export type TUser = z.infer<typeof UserSchema>;
