import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUpSchema } from '../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { AUTH_API_ROUTES, AUTH_APP_ROUTES } from '../constants';
import { storeTokenInLocalStorage } from '../auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

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
    resolver: yupResolver(signUpSchema),
  });

  //check value of form
  //console.log(watch('email'));

  const signup = async (body) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: AUTH_API_ROUTES.SIGN_UP,
        data: body,
      });
      if (!response?.data?.user?.token) {
        console.log('Something went wrong during signup (1):', response);
        return;
      }
      storeTokenInLocalStorage(response.data.user.token);
      router.push('/');
    } catch (err) {
      console.log('Something went wrong during signup (2): ', err);
    } finally {
      setIsLoading(false);
    }
  };
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
            <label>Email</label>
            <input {...register('email')} />
            {errors.email && <p>{errors.email.message}</p>}
            <label>Password</label>
            <input {...register('password')} />
            {errors.password && <p>{errors.password.message}</p>}
            <label>name</label>
            <input {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
            <label>bio</label>
            <input {...register('bio')} />
            {errors.bio && <p>{errors.bio.message}</p>}
            <button type="submit">Sign up</button>
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
