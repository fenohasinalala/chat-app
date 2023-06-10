import { object, string, ref } from 'yup';

export const editProfileSchema = object({
  name: string().required('Name is required'),
  email: string().email('Email is not valid').required('Email is required'),
  currentPassword: string().required('Current Password is required'),
  newPassword: string().required('New Password is required'),
  confirmPassword: string().oneOf(
    [ref('newPassword')],
    "Passwords don't match"
  ),
  bio: string(),
});
