export interface INote {
  id: string;
  _id: string;
  userId: string;
  title: string;
  text: string;
  completed: boolean;
  username: string;
  ticket?: number;
  createdAt?: Date;
  updatedAt?: Date;
}