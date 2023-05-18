export const API_URL = 'http://localhost:8080';

export const API_ROUTES = {
  SIGN_UP: `${API_URL}/users`,
  LOGIN: `${API_URL}/users/login`,
  GET_USER: `${API_URL}/user`,
};

export const APP_ROUTES = {
  SIGN_UP: '/sign-up',
  LOGIN: '/login',
  CHANNEL: '/channel',
  CREATE_CHANNEL: '/channel/create',
  EDIT_CHANNEL: '/channel/edit',
  PROFILE: '/profile',
  MESSAGE: '/message',
};

export const AUTH_API_ROUTES = {
  SIGN_UP: `${API_URL}/users`,
  LOGIN: `${API_URL}/users/login`,
  GET_USER: `${API_URL}/user`,
};

export const AUTH_APP_ROUTES = {
  SIGN_UP: '/sign-up',
  LOGIN: '/login',
};
