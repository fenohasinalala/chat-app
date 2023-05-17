import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {};

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  console.log(watch('email')); // you can watch individual input by pass the name of the input

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <label>Email</label>
      <input {...register('email')} defaultValue="test" />
      <label>Password</label>
      <input {...register('password', { required: true, maxLength: 10 })} />
      {errors.password && <p>This field is required</p>}
      <input type="submit" />
    </form>
  );
};

export default Login;
