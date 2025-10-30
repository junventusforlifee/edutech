import { create } from "zustand";
import { AuthState } from "@/types";

interface AppState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));

// Authentication store used by components throughout the app
interface LocalAuthState {
  isAuthenticated: boolean;
  user?: { id?: string; name?: string; email?: string } | null;
  setAuthenticated: (value: boolean) => void;
  setUser: (user: LocalAuthState["user"]) => void;
}

export const useAuthStore = create<LocalAuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  setAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
}));
