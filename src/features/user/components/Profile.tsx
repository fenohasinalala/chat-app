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

  if (!currentUser) {
    return <div>Profile</div>;
  }
  return (
    <>
      <div>
        <h1>Profile</h1>
        <p>
          name: {currentUser.name}
          <br />
          email: {currentUser.email}
          <br />
          bio: {currentUser.bio}
        </p>
        <button onClick={logOutHandler}>Log out</button>
      </div>
      <form name="editProfileForm">
        <label>name</label>
        <input type="text" name="name" />

        <br />
        <label>email</label>
        <input type="email" name="email" />
        <br />
        <label>password</label>
        <input type="password" name="currentPassword" />

        <br />
        <label>new password</label>
        <input type="password" name="newPassword" />
        <br />
        <label>confirm password</label>
        <input type="password" name="confirmPassword" />
        <br />
        <label>bio</label>
        <textarea name="bio"></textarea>
      </form>
    </>
  );
}

export default Profile;
