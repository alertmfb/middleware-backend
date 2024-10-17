import { ROLE } from '../../common/prismaTypes';
import { z } from 'zod';

export const inviteUserSchema = z.object({
  email: z.string().email(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MEMBER']),
});

export const acceptInvitationSchema = z.object({
  token: z.string(),
});

export type Iniviter = {
  id: string;
  email: string;
  role: ROLE;
};
