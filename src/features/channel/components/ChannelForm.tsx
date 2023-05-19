import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';
import { createChannelSchema } from '@/features/user/utils/schemas';

type Props = {};

const Signup = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createChannelSchema),
  });

  const { user, authenticated } = useAuth(AUTH_APP_ROUTES.SIGN_UP);
  if (user || authenticated) {
    router.push('/');
  }
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit((data) => {
              signup(data);
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
            <label>bio</label>
          </form>
          <p>
            Already have an HEI Chat account?
            <Link href={AUTH_APP_ROUTES.LOGIN}> Login.</Link>
          </p>
        </>
      )}
    </>
  );
};

export default Signup;
