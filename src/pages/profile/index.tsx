import { getUserChannels } from '@/features/channel/api';
import ItemList from '@/features/channel/components/ItemList';
import Profile from '@/features/user/components/Profile';
import { useUserStore } from '../store';

function ProfilePage() {
  // const { channelsList } = getUserChannels();
  const currentUser = useUserStore((store) => store.currentUser);
  return (
    <>
      <Profile />
      <ItemList Items={[currentUser]} />
    </>
  );
}

export default ProfilePage;
