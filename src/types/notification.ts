import { User } from "./user";

export interface Notification {
  _id: string;

   // Basic info
  user: User;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}
