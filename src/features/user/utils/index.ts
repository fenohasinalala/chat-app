import { UserStatus } from '../types';

export function convertUserStatus(status: number): UserStatus {
  let converted = UserStatus.Unknown;
  switch (status) {
    case 0:
      converted = UserStatus.Away;
      break;
    case 1:
      converted = UserStatus.Connected;
      break;
    case 2:
      converted = UserStatus.Occupied;
      break;
    default:
      break;
  }
  return converted;
}
