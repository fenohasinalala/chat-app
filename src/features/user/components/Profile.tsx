import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { ChannelLayout } from '@/features/layout/ChannelLayout';
import { AUTH_APP_ROUTES } from '@/constants';
import { useUserStore } from '@/pages/store';

const inter = Inter({ subsets: ['latin'] });

function Profile() {
  const router = useRouter();
  const setCurrentUser = useUserStore((store) => store.setCurrentUser);

  const logOutHandler = () => {
    localStorage.clear();
    //localStorage.removeItem("token");
    setCurrentUser(null);
    router.push(AUTH_APP_ROUTES.LOGIN);
  };

  const { user, authenticated } = useAuth();

  const currentUser = useUserStore((store) => store.currentUser);
  //console.log(authenticated);

  if (!currentUser) {
    return <div>Profile</div>;
  }
  return (
    <>
      <div>
        <h1>Profile</h1>
        <p>User connected: {currentUser.name}</p>
        <button onClick={logOutHandler}>Log out</button>
      </div>
    </>
  );
}

export default Profile;
