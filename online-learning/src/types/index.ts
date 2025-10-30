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
  user: null | any;
  login: () => void;
  logout: () => void;
}