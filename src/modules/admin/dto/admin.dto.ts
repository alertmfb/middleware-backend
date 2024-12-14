import { ROLES } from 'src/common/roles.enum';

export class ToggleUserMFA {
  id: number = 9182;
  status: boolean = true;
}

export class SuspendUser {
  id: number = 9181;
  status: boolean = true;
}

export class CreateDesignation {
  name: string = 'HR';
}

export class ModifyUserRole {
  userId: number = 9191;
  role: ROLES = ROLES.JUNIOR;
}

export const createDesignationResponse = { success: true, message: 'HR' };

export const designationsResponse = [
  {
    id: 1,
    name: 'HR',
  },
  {
    id: 2,
    name: 'LEGAL',
  },
];

export const toggleMFAResponse = {
  success: true,
  message:
    '2FA has been disabled for the user | 2FA has been enabled for the user',
};

export const suspendUserResponse = {
  success: true,
  message: 'This user has been suspended | This user has been un-suspended',
};

export const modifyUserRoleResponse = {
  success: true,
  message: 'SENIOR',
};
