import { useEffect } from 'react';
import { useSchoolAdminStore } from '../../Stores/schooladmin_stores';
import EmptyState from '../../components/EmptyState';
import { FaTshirt } from 'react-icons/fa';

export default function UniformAssignments() {
  const { assignments, fetchAssignments } = useSchoolAdminStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const getStatusColor = (status) => {
    return status === 'complete' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  };

  const getStatusLabel = (status) => {
    return status === 'complete' ? 'Complete' : 'In Progress';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Uniform Assignments</h2>
      
      {assignments.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Tailor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.uniform_order?.student || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.uniform_order?.parent?.user?.email || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.tailor?.shop_name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(assignment.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {getStatusLabel(assignment.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaTshirt />}
            title="No Uniform Assignments"
            message="You haven't created any uniform assignments yet. Approve uniform orders first, then assign them to tailors."
          />
        </div>
      )}
    </div>
  );
}
