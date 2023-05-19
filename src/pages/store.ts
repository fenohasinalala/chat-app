import { create } from 'zustand';
import * as yup from 'yup';
import { User } from '@/features/user/types';
import { ChannelApi } from '@/features/channel/types';
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
  setAllUsers: (users: User[]) => void;
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
  setAllUsers(users) {
    set((state) => ({
      allUsers: users,
    }));
  },
});

export const useUserStore = create(userStore);

type ChannelStore = {
  currentChannel: ChannelApi | null;
  userChannels: ChannelApi[];
  currentChannelMessages: User[];
  setCurrentChannel: (newChannel: ChannelApi | null) => void;
  setUserChannels: (channels: ChannelApi[]) => void;
  setCurrentChannelMessages: (messages: string[]) => void;
};

const channelStore = (set): ChannelStore => ({
  currentChannel: null,
  userChannels: [],
  currentChannelMessages: [],
  setCurrentChannel: (newChannel) => {
    set(() => ({
      currentChannel: newChannel,
    }));
  },
  setUserChannels: (newChannels) => {
    set(() => ({
      userChannels: newChannels,
    }));
  },
  setCurrentChannelMessages: (messageList) => {
    set(() => ({
      currentChannelMessages: messageList,
    }));
  },
});

export const useChannelStore = create(channelStore);
