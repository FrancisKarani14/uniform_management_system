import { create } from 'zustand';
import API from '../Api/Api';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('access_token'),
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post('/users/token/', { email, password });
      const { access, refresh } = response.data;
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      set({ token: access, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.detail || error.message, loading: false });
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, token: null });
  },

  fetchCurrentUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/users/users/me/');
      set({ user: response.data, loading: false });
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
