export enum UserStatus {
  Away,
  Connected,
  Occupied,
  Unknown,
}

export type User = {
  id: number;
  email: string;
  name: string;
  googleId: null | string;
  bio: null | string;
  status: UserStatus;
};
