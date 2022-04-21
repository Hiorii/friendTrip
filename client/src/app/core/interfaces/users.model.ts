export interface UsersModel {
  _id?: string;
  name?: string;
  surname?: string;
  email: string;
  password?: string;
  photo?: string;
  creationDate: Date;
  isActive: boolean;
  _token?: string;
  _tokenExpirationData?: Date;
}
