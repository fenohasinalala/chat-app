import { API_ROUTES } from '@/constants';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../authentication/auth';
import { ChannelApi } from './types';
import * as yup from 'yup';
import { FieldValues } from 'react-hook-form';

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
    console.log('getChannels, Something Went Wrong', err);
    return defaultReturnObject;
  }
}

export async function createChannelsAPI(
  createChannel: FieldValues //: yup.InferType<typeof createChannelSchema>
) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'POST',
      url: API_ROUTES.CHANNEL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: createChannel,
    });
  } catch (err) {
    console.log('getChannels, Something Went Wrong', err);
  }
}
