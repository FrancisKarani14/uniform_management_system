import { useEffect } from 'react';
import { useSchoolAdminStore } from '../../Stores/schooladmin_stores';

export default function SchoolAdminOverview() {
  const { parentApplications, tailorApplications, orders, assignments, fetchParentApplications, fetchTailorApplications, fetchOrders, fetchAssignments } = useSchoolAdminStore();

  useEffect(() => {
    fetchParentApplications();
    fetchTailorApplications();
    fetchOrders();
    fetchAssignments();
  }, [fetchParentApplications, fetchTailorApplications, fetchOrders, fetchAssignments]);

  const stats = {
    parentApplications: parentApplications.length,
    tailorApplications: tailorApplications.length,
    uniformApplications: orders.length,
    approvedUniformApplications: orders.filter(o => o.status === 'APPROVED').length,
    assignedUniformApplications: assignments.length
  };

  const getStatusBadge = (status) => {
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
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badges[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">School Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Parent Applications</h3>
          <p className="text-4xl font-bold text-blue-700">{stats.parentApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Tailor Applications</h3>
          <p className="text-4xl font-bold text-green-600">{stats.tailorApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Uniform Applications</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.uniformApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Approved Uniforms</h3>
          <p className="text-4xl font-bold text-green-600">{stats.approvedUniformApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Assigned Uniforms</h3>
          <p className="text-4xl font-bold text-orange-600">{stats.assignedUniformApplications}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Recent Assignments</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tailor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uniform Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {assignments.slice(0, 4).map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.uniform_order?.student || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.uniform_order?.parent?.user?.email || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.tailor?.shop_name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{assignment.uniform_order?.gender || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm">{getStatusBadge(assignment.status || 'pending')}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(assignment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all">
            View More
          </button>
        </div>
      </div>
    </div>
  );
}
