export enum Role {
  ROOT_ADMIN = 'ROOT_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  USER = 'USER',
}

export interface User {
  role: Role;
  fullName: string;
  email?: string;
  phoneNumber?: string;
}
