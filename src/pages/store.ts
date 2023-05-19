import { create } from 'zustand';
import * as yup from 'yup';
import { User } from '@/features/user/types';
export type CreateUser = {
  name: string;
  password: string;
  email: string;
};

type UserStore = {
  currentUser: User | null;
  currentChannelUsers: User[];
  allUsers: User[];
  setCurrentUser: (newUser: User | null) => void;
  setCurrentChannelUsers: (users: User[]) => void;
};

const emptyUser: CreateUser = {
  name: '',
  password: '',
  email: '',
};

const userStore = (set): UserStore => ({
  currentUser: null,
  currentChannelUsers: [],
  allUsers: [],
  setCurrentUser: (newUser) => {
    set((state) => ({
      currentUser: newUser,
    }));
  },
  setCurrentChannelUsers(users) {
    set((state) => ({
      currentUsersChannel: users,
    }));
  },
});

export const useUserStore = create(userStore);

const channelStore = (set) => ({
  currentChannel: null,
  userChannels: [],
  currentChannelMessages: [],
});
