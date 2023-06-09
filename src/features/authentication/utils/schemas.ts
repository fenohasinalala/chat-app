import { object, ref, string } from 'yup';

export const loginSchema = object({
  email: string().email('Email is not valid').required('Email is required'),
  password: string().required('Password is required'),
  //.min(8, 'Password length must be > 8'),
});

export const signUpSchema = loginSchema.shape({
  name: string().required('Name is Required'),
  bio: string(),
  confirmPassword: string().oneOf([ref('password')], "Passwords don't match"),
});
