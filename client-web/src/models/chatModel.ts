export interface IChatMessage {
  _id: string;
  fromUserId: string;
  toUserId: string;
  message: string;
  timestamp: string;
}