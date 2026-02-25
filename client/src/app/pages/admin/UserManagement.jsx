import { useState, useEffect } from 'react';
import { FaCrown } from 'react-icons/fa';
import { useAdminStore } from '../../Stores/admin_stores';

export default function UserManagement() {
  const { users, fetchUsers, upgradeToSchoolAdmin } = useAdminStore();
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const parents = users.filter(u => u.role === 'Parent');
  const tailors = users.filter(u => u.role === 'Tailor');
  const schoolAdmins = users.filter(u => u.role === 'School_Admin');

  const [showConfirm, setShowConfirm] = useState(false);
  const [userToUpgrade, setUserToUpgrade] = useState(null);

  const handleUpgradeClick = (user) => {
    setUserToUpgrade(user);
    setShowConfirm(true);
  };

  const confirmUpgrade = async () => {
    try {
      await upgradeToSchoolAdmin(userToUpgrade.id);
      setShowConfirm(false);
      setUserToUpgrade(null);
    } catch (error) {
      console.error('Failed to upgrade user:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">User Management</h2>
      
      {/* Parents Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Parents ({parents.length})</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {parents.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => handleUpgradeClick(user)}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-blue-700 text-blue-700 rounded-md hover:bg-gray-100 transition-all font-medium"
                    >
                      <FaCrown className="w-4 h-4" />
                      Upgrade to School Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tailors Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Tailors ({tailors.length})</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tailors.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* School Admins Section */}
      <div>
        <h3 className="text-xl font-bold mb-4 text-gray-900">School Administrators ({schoolAdmins.length})</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schoolAdmins.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{user.first_name} {user.last_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{user.email}</td>
                  <td className="px-6 py-4 text-sm">
                    {user.school_admin_profile?.school ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{user.school_admin_profile.school.name}</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-medium">No school created</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Confirm Upgrade</h3>
            <p className="text-gray-700 mb-4">
              You are about to upgrade <strong>{userToUpgrade?.first_name} {userToUpgrade?.last_name}</strong> to School Administrator.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
              <h4 className="font-bold text-yellow-800 mb-2">Consequences:</h4>
              <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                <li>User will be removed from Parents list</li>
                <li>User will gain school management privileges</li>
                <li>User can approve/reject uniform applications</li>
                <li>User can manage school enrollment</li>
                <li>This action cannot be easily reversed</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setUserToUpgrade(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpgrade}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
              >
                Confirm Upgrade
              </button>
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}
