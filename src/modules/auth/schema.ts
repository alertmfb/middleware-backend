import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string(),
  password: z.string().min(2, { message: 'Invalid password' }),
});

export type SignInPayload = Required<z.infer<typeof signInSchema>>;
