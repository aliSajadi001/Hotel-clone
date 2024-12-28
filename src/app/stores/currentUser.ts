import { create } from "zustand";
import { User } from "../interface/user";

interface UserState {
  loading: true | false;
  user: User | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: true | false) => void;
}

let useUserStore = create<UserState>((set) => ({
  loading: false,
  user: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
}));

export default useUserStore;
