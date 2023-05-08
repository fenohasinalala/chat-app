import { create } from "zustand";

export type CreateUser = {
  name: string;
  password: string;
  email: string;
};

type User = {
  id: string;
  name: string;
  password: string;
  email: string;
};
type UserStore = {
  currentUser: CreateUser | null;
  newUser: CreateUser;
  signUp: () => void;
  setNewUser: (newUser: CreateUser) => void;
};

const emptyUser: CreateUser = {
  name: "",
  password: "",
  email: "",
};

export const useUserStore = create<UserStore>((set) => ({
  currentUser: null,
  newUser: emptyUser,
  signUp() {
    set((state) => ({
      ...state,
      currentUser: state.newUser,
      newUser: emptyUser,
    }));
    localStorage.setItem("connected_user", JSON.stringify(this.currentUser));
  },
  setNewUser(UserInput) {
    set((state) => ({
      ...state,
      newUser: UserInput,
    }));
  },
}));
