import { useState, useEffect } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useAdminStore } from '../../Stores/admin_stores';
import EmptyState from '../../components/EmptyState';
import { FaSchool } from 'react-icons/fa';

export default function AdminSchools() {
  const { schools, fetchSchools, deleteSchool } = useAdminStore();
  
  useEffect(() => {
    fetchSchools();
  }, [fetchSchools]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  const handleDeleteClick = (school) => {
    setSchoolToDelete(school);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSchool(schoolToDelete.id);
      setShowConfirm(false);
      setSchoolToDelete(null);
    } catch (error) {
      console.error('Failed to delete school:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Schools Management</h2>
      
      {schools.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{school.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.students?.length || 0}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{school.school_admin_profile?.user?.email || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => handleDeleteClick(school)}
                    className="flex items-center gap-2 px-4 py-2 border-2 border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-all font-medium"
                  >
                    <AiOutlineDelete className="w-4 h-4" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaSchool />}
            title="No Schools in System"
            message="There are currently no schools registered in the system. School admins need to create their schools first."
          />
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{schoolToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSchoolToDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
