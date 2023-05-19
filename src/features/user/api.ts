import { API_ROUTES } from '@/constants';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../authentication/auth';
import { User } from './types';

export async function getAllUsersAPI() {
  const defaultReturnObject = { allUsers: [] };
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'GET',
      url: API_ROUTES.USERS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { users = [] } = response.data;
    const allUsers: User[] = users;

    return { allUsers };
  } catch (err) {
    console.log('getAllUsers, Something Went Wrong', err);
    return defaultReturnObject;
  }
}
