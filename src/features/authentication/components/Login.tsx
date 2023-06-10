import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { storeTokenInLocalStorage } from '../auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { APP_ROUTES, AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';

type Props = {};

const Login = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const { user, authenticated } = useAuth(AUTH_APP_ROUTES.LOGIN);
  const router = useRouter();

  if (user || authenticated) {
    router.push(APP_ROUTES.PROFILE);
  }
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

      router.push(APP_ROUTES.PROFILE);
    } catch (err) {
      console.log('Something went wrong during login (2): ', err);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <h1>LOGIN</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : user ? null : (
        <>
          <form
            name="loginForm"
            onSubmit={handleSubmit((data) => {
              login(data);
            })}
          >
            <label>Email</label>
            <input {...register('email')} type="email" name="email" />
            {errors.email && <p>{errors.email.message}</p>}
            <label>Password</label>
            <input {...register('password')} type="password" name="password" />
            {errors.password && <p>{errors.password.message}</p>}
            <button type="submit" className="loginButton">
              Login
            </button>
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
