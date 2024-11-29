import { ROLES } from 'src/common/roles.enum';

export class DisableUserMFA {
  id: number = 9182;
}

export class SuspendUser {
  id: number = 9181;
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

export const suspendUserResponse = {
  success: true,
  message: 'This user has been suspended',
};

export const modifyUserRoleResponse = {
  success: true,
  message: 'SENIOR',
};
