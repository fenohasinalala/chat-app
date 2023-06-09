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
  name: string;
  type: string;
  members: number[];
}
