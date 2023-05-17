import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { CreateUser } from './store';
import { useRouter } from 'next/router';
import {
  AUTH_API_ROUTES,
  AUTH_APP_ROUTES,
} from '@/features/authentication/constants';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CreateUser | null>(null);
  useEffect(() => {
    let connectedUser = localStorage.getItem('currentUser');
    if (connectedUser) {
      setCurrentUser(JSON.parse(connectedUser));
      router.push('/');
    } else {
      router.push(AUTH_APP_ROUTES.SIGN_UP);
    }
  }, []);

  const logOutHandler = () => {
    localStorage.clear();
    //localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push(AUTH_APP_ROUTES.SIGN_UP);
  };

  return (
    <>
      {currentUser ? (
        <div>
          <h1>Home</h1>
          <p>User connected: {currentUser.name}</p>
          <button onClick={logOutHandler}>Log out</button>
        </div>
      ) : null}
    </>
  );
}
