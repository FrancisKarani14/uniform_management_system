import { useState, useEffect } from 'react';
import { useSchoolAdminStore } from '../../Stores/schooladmin_stores';

export default function TailorApplications() {
  const { tailorApplications, fetchTailorApplications, updateTailorApplicationStatus } = useSchoolAdminStore();
  
  useEffect(() => {
    fetchTailorApplications();
  }, [fetchTailorApplications]);

  const handleAction = async (id, action) => {
    try {
      await updateTailorApplicationStatus(id, action);
    } catch (error) {
      console.error('Failed to update application:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    return status ? status.charAt(0) + status.slice(1).toLowerCase() : 'Unknown';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Tailor Applications</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Application Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tailorApplications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.tailor?.shop_name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{app.tailor?.user?.email || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.tailor?.location || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.applied_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {app.status === 'PENDING' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(app.id, 'APPROVED')}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(app.id, 'REJECTED')}
                        className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-xs"
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400">Processed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
