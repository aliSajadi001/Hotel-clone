import { create } from "zustand";
import { User } from "../interface/user";


interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

let useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

export default useUserStore