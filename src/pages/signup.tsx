import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { CreateUser } from './store';

type Props = {};
function Signup({}: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (name.length > 0 && email.length > 0 && password.length > 0) {
      const newUser: CreateUser = {
        name: name,
        email: email,
        password: password,
      };
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      router.push('/');
    }

    // Call your API to sign up the user
    // ...
  };
  return (
    <>
      <h1>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}

export default Signup;
