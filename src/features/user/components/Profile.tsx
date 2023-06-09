import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { ChannelLayout } from '@/features/layout/ChannelLayout';
import { AUTH_APP_ROUTES } from '@/constants';
import { useUserStore } from '@/pages/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { editProfileSchema } from '../utils/schemas';
import { useEffect } from 'react';
import { editProfileAPI } from '../api';
import { EditUser } from '../types';

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
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editProfileSchema),
  });

  useEffect(() => {
    reset({
      name: currentUser ? currentUser?.name : '',
      bio: currentUser ? currentUser?.bio : '',
      email: currentUser ? currentUser.email : '',
      currentPassword: '',
      confirmPassword: '',
      newPassword: '',
    });
  }, [reset, currentUser]);

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
      <form
        name="editProfileForm"
        onSubmit={handleSubmit((data) => {
          console.log(data);
          const userToUpdated: EditUser = {
            name: data.name,
            email: data.email,
            bio: data.bio,
            oldPassword: data.oldPassword,
            password: data.password,
          };
          editProfileAPI(userToUpdated).then((res) => {
            setCurrentUser(res);
          });
        })}
      >
        <label>name</label>
        <input type="text" {...register('name')} name="name" />
        {errors.name && <p>{errors.name.message}</p>}
        <br />
        <label>email</label>
        <input {...register('email')} type="email" name="email" />
        {errors.email && <p>{errors.email.message}</p>}
        <br />
        <label>current password</label>
        <input
          {...register('currentPassword')}
          type="password"
          name="currentPassword"
        />

        {errors.currentPassword && <p>{errors.currentPassword.message}</p>}
        <br />
        <label>new password</label>
        <input
          {...register('newPassword')}
          type="password"
          name="newPassword"
        />
        {errors.newPassword && <p>{errors.newPassword.message}</p>}
        <br />
        <label>confirm password</label>
        <input
          {...register('confirmPassword')}
          type="password"
          name="confirmPassword"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        <br />
        <label>bio</label>
        <textarea {...register('bio')} name="bio"></textarea>
        {errors.bio && <p>{errors.bio.message}</p>}
        <br />
        <button type="submit" className="updateProfileButton">
          Update Profile
        </button>
      </form>
    </>
  );
}

export default Profile;
