import { useState, useEffect } from 'react';
import { useSchoolAdminStore } from '../../Stores/schooladmin_stores';
import { useTailorStore } from '../../Stores/tailor_stores';
import API from '../../Api/Api';

export default function UniformApplications() {
  const { orders, fetchOrders, updateOrderStatus, createAssignment } = useSchoolAdminStore();
  const { applications: tailorApps, fetchApplications: fetchTailorApps } = useTailorStore();
  
  useEffect(() => {
    fetchOrders();
    fetchTailorApps();
  }, [fetchOrders, fetchTailorApps]);

  const approvedTailors = tailorApps.filter(app => app.status === 'APPROVED');

  const [showDetails, setShowDetails] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedTailor, setSelectedTailor] = useState('');

  const handleAction = async (id, action) => {
    if (!confirm(`Are you sure you want to ${action.toLowerCase()} this application?`)) return;
    
    try {
      console.log('Updating order:', id, 'to status:', action.toUpperCase());
      const response = await API.patch(`/uniform_orders/uniform_orders/${id}/`, { status: action.toUpperCase() });
      console.log('Update response:', response.data);
      alert('Application updated successfully');
      await fetchOrders();
      setShowDetails(false);
    } catch (error) {
      console.error('Full error:', error);
      console.error('Error response:', error.response);
      const errorMsg = error.response?.data?.error || error.response?.data?.detail || JSON.stringify(error.response?.data) || error.message || 'Failed to update application';
      alert('Error: ' + errorMsg);
    }
  };

  const handleAssign = async () => {
    try {
      await createAssignment({
        uniform_order: selectedApp.id,
        tailor: parseInt(selectedTailor),
        school: selectedApp.school
      });
      setShowAssign(false);
      setSelectedTailor('');
    } catch (error) {
      console.error('Failed to assign tailor:', error);
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
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Uniform Applications</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.parent_details?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedApp(app);
                        setShowDetails(true);
                      }}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all text-xs"
                    >
                      View Details
                    </button>
                    {app.status === 'APPROVED' && (
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setShowAssign(true);
                        }}
                        className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all text-xs"
                      >
                        Assign Tailor
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {showDetails && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Application Details</h3>
            <div className="space-y-3 mb-6">
              <div><span className="font-bold">Parent:</span> {selectedApp.parent_details?.name || 'N/A'}</div>
              <div><span className="font-bold">Gender:</span> {selectedApp.gender}</div>
              <div><span className="font-bold">Shirt Size:</span> {selectedApp.shirt_size}</div>
              <div><span className="font-bold">Trouser Size:</span> {selectedApp.trouser_size}</div>
              <div><span className="font-bold">Shoe Size:</span> {selectedApp.shoes_size}</div>
              <div><span className="font-bold">Blouse Size:</span> {selectedApp.blouse_size}</div>
              <div><span className="font-bold">Skirt Size:</span> {selectedApp.skirt_size}</div>
              <div><span className="font-bold">Sweater Size:</span> {selectedApp.sweater_size}</div>
              <div><span className="font-bold">Date Applied:</span> {new Date(selectedApp.created_at).toLocaleDateString()}</div>
              <div><span className="font-bold">Status:</span> <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApp.status)}`}>{getStatusLabel(selectedApp.status)}</span></div>
            </div>
            {selectedApp.status === 'PENDING' && (
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => handleAction(selectedApp.id, 'Approved')}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(selectedApp.id, 'Rejected')}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                >
                  Reject
                </button>
              </div>
            )}
            <button
              onClick={() => setShowDetails(false)}
              className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Assign Tailor Modal */}
      {showAssign && selectedApp && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Assign Tailor</h3>
            <p className="mb-4">Assign uniform application for <strong>{selectedApp.parent_details?.name}</strong> to a tailor:</p>
            <select
              value={selectedTailor}
              onChange={(e) => setSelectedTailor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Select Tailor</option>
              {approvedTailors.map(tailor => (
                <option key={tailor.tailor} value={tailor.tailor}>{tailor.tailor?.shop_name || `Tailor ${tailor.tailor}`}</option>
              ))}
            </select>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAssign(false);
                  setSelectedTailor('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedTailor}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-400"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
