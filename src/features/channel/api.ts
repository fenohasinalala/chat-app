import { API_ROUTES } from '@/constants';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../authentication/auth';
import { ChannelApi } from './types';

export async function getUserChannels() {
  const defaultReturnObject = { channelsList: [] };
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'GET',
      url: API_ROUTES.CHANNELS,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { channels = [] } = response.data;
    const channelsList: ChannelApi[] = channels;
    return { channelsList };
  } catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}
