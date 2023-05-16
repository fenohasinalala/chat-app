import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useEffect, useState } from 'react';
import { CreateUser } from './store';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CreateUser | null>(null);
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
      router.push('/');
    } else {
      router.push('/signup');
    }
  }, []);

  const logOutHandler = () => {
    localStorage.clear();
    //localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push('/signup');
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
