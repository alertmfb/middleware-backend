export type ROLE = 'SUPER_ADMIN' | 'ADMIN' | 'MEMBER';

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
