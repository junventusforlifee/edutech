export interface Program {
  id: number;
  title: string;
  description: string;
  icon?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  image: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  // a minimal user shape used across the app
  user: null | { id?: string; name?: string; email?: string };
  login: () => void;
  logout: () => void;
}
