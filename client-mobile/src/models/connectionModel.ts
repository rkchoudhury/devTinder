export interface IConnectionFrom {
  _id: string;
  firstName: string;
  lastName: string;
  about: string;
  photoUrl: string;
  skills: string[];
  age: number;
  gender: string;
  isPremium?: boolean;
}

export interface IConnection {
  _id: string;
  fromUserId: IConnectionFrom;
  toUserId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}
