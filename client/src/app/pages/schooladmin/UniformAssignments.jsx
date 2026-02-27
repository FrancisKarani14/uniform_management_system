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
    const badges = {
      pending: 'bg-yellow-100 text-yellow-700',
      received: 'bg-blue-100 text-blue-700',
      started: 'bg-purple-100 text-purple-700',
      halfway: 'bg-orange-100 text-orange-700',
      complete: 'bg-green-100 text-green-700'
    };
    return badges[status] || 'bg-gray-100 text-gray-700';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      received: 'Received',
      started: 'Started',
      halfway: 'Halfway Done',
      complete: 'Complete'
    };
    return labels[status] || 'Unknown';
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
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.uniform_order_details?.gender || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.uniform_order_details?.parent?.user?.email || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.tailor_details?.shop_name || '-'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(assignment.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status || 'pending')}`}>
                    {getStatusLabel(assignment.status || 'pending')}
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
