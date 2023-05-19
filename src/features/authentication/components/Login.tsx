import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { storeTokenInLocalStorage } from '../auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';

type Props = {};

const Login = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  //check value of form
  //console.log(watch('email'));

  const login = async (body) => {
    try {
      setIsLoading(true);
      const response = await axios({
        method: 'post',
        url: AUTH_API_ROUTES.LOGIN,
        data: body,
      });
      if (!response?.data?.user?.token) {
        console.log('Something went wrong during login (1):', response);
        return;
      }
      storeTokenInLocalStorage(response.data.user.token);

      router.push('/');
    } catch (err) {
      console.log('Something went wrong during login (2): ', err);
    } finally {
      setIsLoading(false);
    }
  };
  const { user, authenticated } = useAuth();
  if (user || authenticated) {
    router.push('/');
  }
  return (
    <>
      {isLoading ? (
        <p>Loading</p>
      ) : user ? null : (
        <>
          <form
            onSubmit={handleSubmit((data) => {
              login(data);
            })}
          >
            <label>Email</label>
            <input {...register('email')} />
            {errors.password && <p>{errors.password.message}</p>}
            <label>Password</label>
            <input {...register('password')} />
            {errors.email && <p>{errors.email.message}</p>}
            <button type="submit">Login</button>
          </form>
          <p>
            New to HEI Chat ?
            <Link href={AUTH_APP_ROUTES.SIGN_UP}> Create an account.</Link>
          </p>
        </>
      )}
    </>
  );
};

export default Login;
