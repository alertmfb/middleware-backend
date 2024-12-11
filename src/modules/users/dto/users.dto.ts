// export class SuspendUser {
//   id: number = 9181;
// }

export class TamperT {
  email: string;
}

export const usersApiResponse = [
  {
    id: 1,
    email: 'user1@alertgroup.com.ng',
    firstname: null,
    lastname: null,
    has2FAEnabled: true,
    Designation: {
      name: 'IT_OFFICE',
    },
    role: 'SENIOR',
    createdAt: '2024-11-02T08:08:02.879Z',
  },
  {
    id: 2,
    email: 'user2@alertmfb.com.ng',
    firstname: null,
    lastname: null,
    has2FAEnabled: false,
    Designation: {
      name: 'HUMAN_RESOURCES',
    },
    role: 'JUNIOR',
    createdAt: '2024-11-02T08:08:09.704Z',
  },
];

export const userByIdResponse = {
  dob: '2024-11-28T16:50:30.320Z',
  email: 'mushin@alertgroup.com.ng',
  firstname: 'Mushin',
  lastname: 'Adedeji',
  phoneNumber: '09189213276',
  role: 'JUNIOR',
  Designation: {
    name: 'HR',
  },
};

// export const suspendUserResponse = {
//   success: true,
//   message: 'This user has been suspended',
// };
