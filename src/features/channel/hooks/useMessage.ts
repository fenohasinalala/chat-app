import { useChannelStore } from '@/pages/store';
import { getChannelById, getUserChannels } from '../api';
import { useEffect } from 'react';

export function useChannelFetchSelected(id: number | undefined | null) {
  const setCurrentChannel = useChannelStore((store) => store.setCurrentChannel);
  useEffect(() => {
    async function getChannel() {
      if (id) {
        const { selectedChannel } = await getChannelById(id);
        setCurrentChannel(selectedChannel);
      }
    }
    getChannel();
  }, []);
}
export function useGetPrivateMessage() {
  const setUserChannels = useChannelStore((store) => store.setUserChannels);
  useEffect(() => {
    async function getAllChannels() {
      const { channelsList } = await getUserChannels();
      setUserChannels(channelsList);
    }
    getAllChannels();
  }, []);
}
