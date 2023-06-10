import { useChannelStore } from '@/pages/store';
import { getChannelById, getPrivateMessage, getUserChannels } from '../api';
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
export function useGetPrivateMessage(id: number) {
  const setCurrentPrivateMessages = useChannelStore(
    (store) => store.setCurrentPrivateMessages
  );
  useEffect(() => {
    async function getAllChannels() {
      const AllMessages = await getPrivateMessage(id);
      setCurrentPrivateMessages(AllMessages);
    }
    getAllChannels();
  }, []);
}
