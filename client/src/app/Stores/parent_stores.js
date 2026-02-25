import { create } from 'zustand';
import API from '../Api/Api';

export const useParentStore = create((set) => ({
  schools: [],
  students: [],
  applications: [],
  orders: [],
  assignments: [],
  loading: false,
  error: null,

  fetchSchools: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/schools/schools/');
      set({ schools: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/users/student_profiles/');
      set({ students: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchApplications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/schools/parent_school_applications/');
      set({ applications: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/uniform_orders/uniform_orders/');
      set({ orders: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchAssignments: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/uniform_orders/uniform_assignments/');
      set({ assignments: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createApplication: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post('/schools/parent_school_applications/', data);
      set((state) => ({ 
        applications: [...state.applications, response.data], 
        loading: false 
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createOrder: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post('/uniform_orders/uniform_orders/', data);
      set((state) => ({ 
        orders: [...state.orders, response.data], 
        loading: false 
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
