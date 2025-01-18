import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: string | null;
  setUser: (user: string) => void;
  emerald: number;
  setEmerald: (emerald: number) => void;
  lastCommentDate: Date | null;
  setLastCommentDate: (date: Date) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      emerald: 0,
      setEmerald: (emerald) => set({ emerald }),
      lastCommentDate: null,
      setLastCommentDate: (date) => set({ lastCommentDate: date }),
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    },
  ),
);
