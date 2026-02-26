import { create } from 'zustand';
import API from '../Api/Api';

export const useSchoolAdminStore = create((set) => ({
  parentApplications: [],
  tailorApplications: [],
  orders: [],
  assignments: [],
  students: [],
  loading: false,
  error: null,

  fetchParentApplications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/schools/parent_school_applications/');
      set({ parentApplications: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTailorApplications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/tailors/tailor_school_requests/');
      set({ tailorApplications: response.data, loading: false });
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

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/users/student_profiles/');
      set({ students: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  updateOrderStatus: async (orderId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await API.patch(`/uniform_orders/uniform_orders/${orderId}/`, { status });
      set((state) => ({
        orders: state.orders.map(order => 
          order.id === orderId ? { ...order, status } : order
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  updateTailorApplicationStatus: async (applicationId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await API.patch(`/tailors/tailor_school_requests/${applicationId}/`, { status });
      set((state) => ({
        tailorApplications: state.tailorApplications.map(app => 
          app.id === applicationId ? { ...app, status } : app
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  approveParentApplication: async (applicationId) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post(`/schools/parent_school_applications/${applicationId}/approve/`);
      set((state) => ({
        parentApplications: state.parentApplications.map(app => 
          app.id === applicationId ? { ...app, status: 'Approved' } : app
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  rejectParentApplication: async (applicationId) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post(`/schools/parent_school_applications/${applicationId}/reject/`);
      set((state) => ({
        parentApplications: state.parentApplications.map(app => 
          app.id === applicationId ? { ...app, status: 'Rejected' } : app
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  createAssignment: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post('/uniform_orders/uniform_assignments/', data);
      set((state) => ({
        assignments: [...state.assignments, response.data],
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
