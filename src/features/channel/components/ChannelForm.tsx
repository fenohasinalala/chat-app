import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { APP_ROUTES, AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';
import { createChannelSchema } from '@/features/user/utils/schemas';
import { createChannelsAPI } from '../api';
import { useAuth } from '@/features/authentication/hooks/useAuth';
import { useUserStore } from '@/pages/store';

type Props = {};

const ChannelForm = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user, authenticated } = useAuth();
  const currentUser = useUserStore((store) => store.currentUser);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createChannelSchema),
  });

  if (!user) {
    return <div>Loading...</div>;
  }
  console.log(user);

  return (
    <>
      <h1>Create new channel</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit((data) => {
              createChannelsAPI(data);
            })}
          >
            <label>name</label>
            <input {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
            <label>type</label>
            <input {...register('type')} />
            {errors.type && <p>{errors.type.message}</p>}
            <label>members</label>
            <input {...register('members')} />
            {errors.members && <p>{errors.members.message}</p>}
            <button type="submit">Create</button>
          </form>
        </>
      )}
    </>
  );
};

export default ChannelForm;
