export interface IUser {
  id: string;
  _id: string;
  username: string;
  password: string;
  roles: string[];
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}