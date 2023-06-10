import { array, object, string } from 'yup';

export const createChannelSchema = object({
  channelName: string().required('Name is required'),
  type: string().required('Type is required'),
  members: array(),
});

export const createMessageSchema = object({
  message: string().required('Message is required'),
});
