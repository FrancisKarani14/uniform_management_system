import { useEffect } from 'react';
import { useParentStore } from '../../Stores/parent_stores';
import EmptyState from '../../components/EmptyState';
import { FaTshirt } from 'react-icons/fa';

export default function UniformApplications() {
  const { orders, assignments, fetchOrders, fetchAssignments } = useParentStore();

  useEffect(() => {
    fetchOrders();
    fetchAssignments();
  }, [fetchOrders, fetchAssignments]);

  const getAssignmentForOrder = (orderId) => {
    return assignments.find(a => a.uniform_order?.id === orderId);
  };

  const getTailorProgressBadge = (progress) => {
    if (!progress) return null;
    const badges = {
      pending: 'bg-yellow-100 text-yellow-700',
      received: 'bg-blue-100 text-blue-700',
      started: 'bg-purple-100 text-purple-700',
      halfway: 'bg-orange-100 text-orange-700',
      complete: 'bg-green-100 text-green-700'
    };
    const labels = {
      pending: 'Pending',
      received: 'Received',
      started: 'Started',
      halfway: 'Halfway Done',
      complete: 'Complete'
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${badges[progress]}`}>
        {labels[progress]}
      </span>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    return status ? status.charAt(0) + status.slice(1).toLowerCase() : 'Unknown';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Uniform Applications</h2>
      
      {orders.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tailor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((app) => {
              const assignment = getAssignmentForOrder(app.id);
              return (
                <tr key={app.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.gender || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.school?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment?.tailor?.shop_name || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    {assignment?.status ? getTailorProgressBadge(assignment.status) : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-700 hover:text-blue-800 font-medium">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaTshirt />}
            title="No Uniform Applications"
            message="You haven't submitted any uniform applications yet. Apply to schools first, then submit uniform orders."
          />
        </div>
      )}
    </div>
  );
}
