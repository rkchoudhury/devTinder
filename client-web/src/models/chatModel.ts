export interface IChatMessage {
  _id?: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  timestamp?: string;
}

export interface IChat {
  _id: string;
  participants: string[];
  messages: IChatMessage[];
  createdAt: string;
  updatedAt: string;
}