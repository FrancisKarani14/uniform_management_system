import { create } from 'zustand';
import API from '../Api/Api';

export const useTailorStore = create((set) => ({
  schools: [],
  applications: [],
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

  fetchApplications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/tailors/tailor_school_requests/');
      set({ applications: response.data, loading: false });
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

  applyToSchool: async (data) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post('/tailors/tailor_school_requests/', data);
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

  updateAssignmentStatus: async (assignmentId, status) => {
    set({ loading: true, error: null });
    try {
      const response = await API.patch(`/uniform_orders/uniform_assignments/${assignmentId}/`, { status });
      set((state) => ({
        assignments: state.assignments.map(assignment => 
          assignment.id === assignmentId ? { ...assignment, status } : assignment
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
