import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '../auth';
import { AUTH_APP_ROUTES } from '../constants';
import { useRouter } from 'next/router';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();
  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      if (!authenticated) {
        router.push(AUTH_APP_ROUTES.LOGIN);
        return;
      }
      setUser(user);
      setAuthenticated(authenticated);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}
