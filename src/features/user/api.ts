import { API_ROUTES } from '@/constants';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../authentication/auth';
import { EditUser, User } from './types';

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

export async function editProfileAPI(data: EditUser) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'PUT',
      url: API_ROUTES.USER,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { user } = response.data;
    const updatedUser: User = user;
    return updatedUser;
  } catch (err) {
    console.log('editProfileAPI', err);
    return null;
  }
}
