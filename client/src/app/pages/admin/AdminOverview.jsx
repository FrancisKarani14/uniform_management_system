import { useEffect } from 'react';
import { useAdminStore } from '../../Stores/admin_stores';

export default function AdminOverview() {
  const { users, schools, fetchUsers, fetchSchools } = useAdminStore();
  
  useEffect(() => {
    fetchUsers();
    fetchSchools();
  }, [fetchUsers, fetchSchools]);

  const parents = users.filter(u => u.role === 'Parent');
  const tailors = users.filter(u => u.role === 'Tailor');
  const schoolAdmins = users.filter(u => u.role === 'School_Admin');

  const stats = {
    totalSchools: schools.length,
    totalUsers: users.length,
    parents: parents.length,
    tailors: tailors.length,
    schoolAdmins: schoolAdmins.length
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">System Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Schools</h3>
          <p className="text-4xl font-bold text-blue-700">{stats.totalSchools}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Users</h3>
          <p className="text-4xl font-bold text-green-600">{stats.totalUsers}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">All User Roles</h3>
          <p className="text-4xl font-bold text-purple-600">
            {stats.parents + stats.tailors + stats.schoolAdmins}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-gray-900">User Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Parents</span>
            <span className="font-bold text-blue-700">{stats.parents}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Tailors</span>
            <span className="font-bold text-green-600">{stats.tailors}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-700">School Admins</span>
            <span className="font-bold text-purple-600">{stats.schoolAdmins}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
