import type { MembershipType } from "../enums/MembershipEnum";

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
  isPremium?: boolean;
  membershipType?: MembershipType;
}

export interface IConnectionUser {
  _id: string;
  firstName: string;
  lastName: string;
  about: string;
  photoUrl: string;
  skills: string[];
  gender?: string;
  age?: number;
}
