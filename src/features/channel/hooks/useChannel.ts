import { useChannelStore } from '@/pages/store';
import { getUserChannels } from '../api';
import { useEffect } from 'react';

export function useChannel() {
  const setUserChannels = useChannelStore((store) => store.setUserChannels);
  useEffect(() => {
    async function getAllChannels() {
      const { channelsList } = await getUserChannels();
      setUserChannels(channelsList);
    }
    getAllChannels();
  }, []);
}
