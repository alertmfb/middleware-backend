/**
 * Defining The Prisma Schema types here for compatibility with deployment
 */

export type ROLE = 'SUPER_ADMIN' | 'SENIOR' | 'JUNIOR';

type MFAMethod = 'AUTHENTICATOR_APP';

export type User = {
  email: string;
  role: ROLE;
  id: number;
  createdAt: Date;
  updatedAt: Date;
  firstname: string | null;
  lastname: string | null;
  password: string;
  hasMFAEnabled: boolean;
  mfaMethod: MFAMethod;
};
