import { create } from 'zustand';
import API from '../Api/Api';

export const useAdminStore = create((set) => ({
  users: [],
  schools: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/users/users/');
      set({ users: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSchools: async () => {
    set({ loading: true, error: null });
    try {
      const response = await API.get('/schools/schools/');
      set({ schools: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  upgradeToSchoolAdmin: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await API.post(`/users/users/${userId}/upgrade_to_school_admin/`);
      set((state) => ({
        users: state.users.map(user => 
          user.id === userId ? { ...user, role: 'School_Admin' } : user
        ),
        loading: false
      }));
      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  deleteSchool: async (schoolId) => {
    set({ loading: true, error: null });
    try {
      await API.delete(`/schools/schools/${schoolId}/`);
      set((state) => ({
        schools: state.schools.filter(school => school.id !== schoolId),
        loading: false
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
}));
