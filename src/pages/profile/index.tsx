import Profile from '@/features/user/components/Profile';
import { useChannelStore, useUserStore } from '../store';
import ChannelItemList from '@/features/channel/components/ChannelItemList';
import { useChannel } from '@/features/channel/hooks/useChannel';
import { useAllUsers } from '@/features/user/hooks/useAllUser';
import UserItemList from '@/features/user/components/UserItemList';

function ProfilePage() {
  useChannel();
  useAllUsers();
  const userChanels = useChannelStore((store) => store.userChannels);
  const allUsers = useUserStore((store) => store.allUsers);

  return (
    <>
      <Profile />
      <ChannelItemList Items={userChanels} />
      <UserItemList Items={allUsers} />
    </>
  );
}

export default ProfilePage;
