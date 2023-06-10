export interface ChannelApi {
  id: number;
  name: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: number;
  owner: Owner;
}

interface Owner {
  id: number;
  name: string;
  email: string;
}

export interface CreateChannel {
  id: number | null;
  name: string;
  type: string;
  members: number[];
}

export interface AddMembers {
  members: number[];
}

interface sendMessage {
  content: string;
}

export interface sendMessageToPM extends sendMessage {
  recipientId: number;
}

export interface sendNessageToChannel extends sendMessage {
  channelId: number;
}

export interface Message {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  senderId: number;
  recipientId: number;
  channelId: null;
  sender: Sender;
}

export interface Sender {
  id: number;
  name: string;
  email: string;
}
