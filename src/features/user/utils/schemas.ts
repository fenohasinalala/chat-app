import { array, object, string } from 'yup';

export const createChannelSchema = object({
  channelName: string().required('Name is required'),
  type: string(),
  members: array(),
});
