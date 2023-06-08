import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { signUpSchema } from '../utils/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { storeTokenInLocalStorage } from '../auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { APP_ROUTES, AUTH_API_ROUTES, AUTH_APP_ROUTES } from '@/constants';

type Props = {};

const Signup = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const signup = async (body: FieldValues) => {
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
    router.push(APP_ROUTES.PROFILE);
  }

  function checkConfirmPassword() {
    return getValues('password') == getValues('confirmPassword') ? true : false;
  }
  return (
    <>
      <h1>SIGN UP</h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <form
            name="registrationForm"
            onSubmit={handleSubmit((data) => {
              if (checkConfirmPassword()) {
                signup(data);
              }
              console.log(data);
            })}
          >
            <label>name</label>
            <input {...register('name')} type="text" name="name" />
            {errors.name && <p>{errors.name.message}</p>}
            <label>email</label>
            <input {...register('email')} type="email" name="email" />
            {errors.email && <p>{errors.email.message}</p>}
            <label>password</label>
            <input {...register('password')} type="password" name="password" />
            {errors.password && <p>{errors.password.message}</p>}
            <label>confirmPassword</label>
            <input
              {...register('confirmPassword')}
              type="password"
              name="confirmPassword"
            />
            {!checkConfirmPassword() && <p>{'Not the same password'}</p>}
            <button type="submit" className="registerButton">
              Register
            </button>
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
