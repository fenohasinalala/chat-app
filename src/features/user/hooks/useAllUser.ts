import { useUserStore } from '@/pages/store';
import { useEffect } from 'react';
import { getAllUsersAPI } from '../api';

export function useAllUsers() {
  const setAllUsers = useUserStore((store) => store.setAllUsers);
  useEffect(() => {
    async function getAllUser() {
      const { allUsers } = await getAllUsersAPI();
      setAllUsers(allUsers);
    }
    getAllUser();
  }, []);
}
