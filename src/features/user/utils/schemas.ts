import { array, object, string } from 'yup';

export const createChannelSchema = object({
  name: string().required('Name is required'),
  type: string(),
  members: string(),
});
