import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '../auth';
import { AUTH_APP_ROUTES } from '../constants';
import { useRouter } from 'next/router';
import { User } from '@/features/user/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const router = useRouter();
  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, connectedUser } = await getAuthenticatedUser();
      if (!authenticated) {
        router.push(AUTH_APP_ROUTES.LOGIN);
        return;
      }
      setUser(connectedUser);
      setAuthenticated(authenticated);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}
