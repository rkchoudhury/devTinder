export interface IChatMessage {
  _id: string;
  senderId: string;
  message: string;
  timestamp: string;
  firstName: string;
  lastName?: string;
  photoUrl?: string;
}