interface IChatMessage {
  _id: string;
  fromUserId: string;
  toUserId: string;
  content: string;
  timestamp: string;
}

export interface IChat {
  _id: string;
  participants: string[];
  messages: IChatMessage[];
  createdAt: string;
  updatedAt: string;
}