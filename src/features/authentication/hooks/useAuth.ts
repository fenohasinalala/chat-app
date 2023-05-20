import { useState, useEffect } from 'react';
import { getAuthenticatedUser } from '../auth';
import { useRouter } from 'next/router';
import { User } from '@/features/user/types';
import { AUTH_APP_ROUTES } from '@/constants';
import { useUserStore } from '@/pages/store';

export function useAuth(path = AUTH_APP_ROUTES.LOGIN) {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);

  const setCurrentUser = useUserStore((store) => store.setCurrentUser);
  const router = useRouter();
  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, connectedUser } = await getAuthenticatedUser();
      if (!authenticated) {
        setCurrentUser(null);
        router.push(path);
        return;
      }
      setCurrentUser(connectedUser);
      setUser(connectedUser);
      setAuthenticated(authenticated);
    }
    getUserDetails();
  }, []);

  return { user, authenticated };
}
