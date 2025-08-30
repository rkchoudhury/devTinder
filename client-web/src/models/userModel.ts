export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  emailId: string;
  password: string;
  about: string;
  photoUrl: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  gender?: string;
  age?: number;
}
