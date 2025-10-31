import { Account } from "@/lib/domain/account/types";
import { create } from "zustand";

interface AccountStore {
  // State
  account: Account | null;
  isLoading: boolean;
  error: Error | null;

  // Actions
  setAccount: (account: Account | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  reset: () => void;
}

export const useAccountStore = create<AccountStore>(set => ({
  // Initial state
  account: null,
  isLoading: false,
  error: null,

  // Actions
  setAccount: account => set({ account, error: null }),
  setLoading: isLoading => set({ isLoading }),
  setError: error => set({ error }),

  reset: () =>
    set({
      account: null,
      isLoading: false,
      error: null,
    }),
}));
