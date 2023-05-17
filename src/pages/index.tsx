import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { CreateUser } from './store';
import { useRouter } from 'next/router';
import { AUTH_APP_ROUTES } from '@/features/authentication/constants';
import { User } from '@/features/user/types';
import { useAuth } from '@/features/authentication/hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const logOutHandler = () => {
    localStorage.clear();
    //localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push(AUTH_APP_ROUTES.LOGIN);
  };

  const { user, authenticated } = useAuth();
  console.log(user);
  console.log(authenticated);

  if (!user || !authenticated) {
    return <div>Home</div>;
  }
  return (
    <>
      <div>
        <h1>Home</h1>
        <p>User connected: {user.name}</p>
        <button onClick={logOutHandler}>Log out</button>
      </div>
    </>
  );
}
