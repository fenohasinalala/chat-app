import axios from 'axios';
import { AUTH_API_ROUTES } from './constants';
import { User } from '../user/types';
import { convertUserStatus } from '../user/utils';

export function storeTokenInLocalStorage(token: string) {
  localStorage.setItem('token', token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, connectedUser: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'GET',
      url: AUTH_API_ROUTES.GET_USER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { status = false } = response.data;
    const authenticated = status;
    const { user } = response.data;
    const connectedUser: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      googleId: user.googleId,
      bio: user.bio,
      status: convertUserStatus(user.status),
    };
    return { authenticated, connectedUser };
  } catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}
