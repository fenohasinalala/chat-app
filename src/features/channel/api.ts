import { API_ROUTES } from '@/constants';
import axios from 'axios';
import { getTokenFromLocalStorage } from '../authentication/auth';
import {
  AddMembers,
  ChannelApi,
  CreateChannel,
  sendMessageToPM,
} from './types';

export async function getChannelById(channelId: number) {
  const defaultReturnObject = { selectedChannel: null };
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'GET',
      url: API_ROUTES.CHANNEL + '/' + channelId,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { channel } = response.data;
    const selectedChannel: ChannelApi = channel;

    return { selectedChannel };
  } catch (err) {
    console.log('getChannels, Something Went Wrong', err);
    return defaultReturnObject;
  }
}
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
  createChannel: CreateChannel //: yup.InferType<typeof createChannelSchema>
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

export async function addMembersChannelsAPI(id: number, members: AddMembers) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'POST',
      url: API_ROUTES.CHANNELS + '/' + id + '/members',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: members,
    });
  } catch (err) {
    console.log('getChannels, Something Went Wrong', err);
  }
}

export async function sendMessage(id: number, msg: sendMessageToPM) {
  try {
    const token = getTokenFromLocalStorage();
    const response = await axios({
      method: 'POST',
      url: API_ROUTES.CHANNELS + '/' + id + '/members',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: members,
    });
  } catch (err) {
    console.log('getChannels, Something Went Wrong', err);
  }
}
