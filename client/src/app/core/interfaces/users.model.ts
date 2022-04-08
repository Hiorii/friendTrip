export interface UsersModel {
  _id?: string;
  name?: string;
  surname?: string;
  email: string;
  password?: string;
  creationDate: Date;
  isActive: boolean;
}
