import { useState, useEffect } from 'react';
import { useParentStore } from '../../Stores/parent_stores';
import EmptyState from '../../components/EmptyState';
import { FaTshirt } from 'react-icons/fa';
import API from '../../Api/Api';

export default function UniformApplications() {
  const { orders, assignments, students, applications, fetchOrders, fetchAssignments, fetchStudents, fetchApplications } = useParentStore();
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [formData, setFormData] = useState({
    student: '',
    school: '',
    gender: '',
    blouse_size: '',
    skirt_size: '',
    sweater_size: '',
    trouser_size: '',
    shoes_size: '',
    shirt_size: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchAssignments();
    fetchStudents();
    fetchApplications();
  }, [fetchOrders, fetchAssignments, fetchStudents, fetchApplications]);

  const approvedSchools = applications.filter(app => app.status?.toUpperCase() === 'APPROVED');
  const uniqueSchools = [...new Map(approvedSchools.map(app => [app.school_details?.id || app.school, app.school_details])).values()].filter(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await API.get('/users/users/me/');
      const parentProfileId = response.data.parent_profile.id;
      
      if (selectedOrder) {
        await API.patch(`/uniform_orders/uniform_orders/${selectedOrder.id}/`, {
          gender: formData.gender,
          blouse_size: formData.blouse_size,
          skirt_size: formData.skirt_size,
          sweater_size: formData.sweater_size,
          trouser_size: formData.trouser_size,
          shoes_size: formData.shoes_size,
          shirt_size: formData.shirt_size
        });
      } else {
        await API.post('/uniform_orders/uniform_orders/', {
          parent: parentProfileId,
          school: formData.school,
          gender: formData.gender,
          blouse_size: formData.blouse_size,
          skirt_size: formData.skirt_size,
          sweater_size: formData.sweater_size,
          trouser_size: formData.trouser_size,
          shoes_size: formData.shoes_size,
          shirt_size: formData.shirt_size
        });
      }
      
      setShowModal(false);
      setSelectedOrder(null);
      setFormData({
        student: '',
        school: '',
        gender: '',
        blouse_size: '',
        skirt_size: '',
        sweater_size: '',
        trouser_size: '',
        shoes_size: '',
        shirt_size: ''
      });
      await fetchOrders();
    } catch (error) {
      console.error('Failed to submit uniform order:', error);
      setError(error.response?.data?.detail || 'Failed to submit uniform order');
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Are you sure you want to delete this uniform application?')) return;
    
    try {
      await API.delete(`/uniform_orders/uniform_orders/${orderId}/`);
      await fetchOrders();
      setShowDetailsModal(false);
    } catch (error) {
      console.error('Failed to delete order:', error);
      alert('Failed to delete application');
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const handleEdit = (order) => {
    setSelectedOrder(order);
    setFormData({
      student: '',
      school: order.school,
      gender: order.gender,
      blouse_size: order.blouse_size,
      skirt_size: order.skirt_size,
      sweater_size: order.sweater_size,
      trouser_size: order.trouser_size,
      shoes_size: order.shoes_size,
      shirt_size: order.shirt_size
    });
    setShowDetailsModal(false);
    setShowModal(true);
  };

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

  const getStatusColor = (status, assignment) => {
    if (assignment) return 'bg-purple-100 text-purple-800';
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

  const getStatusLabel = (status, assignment) => {
    if (assignment) return 'Assigned';
    return status ? status.charAt(0) + status.slice(1).toLowerCase() : 'Unknown';
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Uniform Applications</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
        >
          Apply for Uniform
        </button>
      </div>
      
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
                  <td className="px-6 py-4 text-sm text-gray-600">{app.school_details?.name || app.school?.name || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{new Date(app.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status, assignment)}`}>
                      {getStatusLabel(app.status, assignment)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment?.tailor?.shop_name || '-'}</td>
                  <td className="px-6 py-4 text-sm">
                    {assignment?.status ? getTailorProgressBadge(assignment.status) : <span className="text-gray-400">-</span>}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button 
                      onClick={() => handleViewDetails(app)}
                      className="text-blue-700 hover:text-blue-800 font-medium"
                    >
                      View
                    </button>
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

      {/* Apply for Uniform Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">{selectedOrder ? 'Update' : 'Apply for'} Uniform</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
                <select
                  value={formData.student}
                  onChange={(e) => setFormData({ ...formData, student: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.first_name || student.user?.first_name} {student.last_name || student.user?.last_name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">School *</label>
                <select
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                  disabled={!!selectedOrder}
                >
                  <option value="">Select School</option>
                  {uniqueSchools.map((school) => (
                    <option key={school.id} value={school.id}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blouse Size</label>
                  <input
                    type="text"
                    value={formData.blouse_size}
                    onChange={(e) => setFormData({ ...formData, blouse_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skirt Size</label>
                  <input
                    type="text"
                    value={formData.skirt_size}
                    onChange={(e) => setFormData({ ...formData, skirt_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sweater Size</label>
                  <input
                    type="text"
                    value={formData.sweater_size}
                    onChange={(e) => setFormData({ ...formData, sweater_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trouser Size</label>
                  <input
                    type="text"
                    value={formData.trouser_size}
                    onChange={(e) => setFormData({ ...formData, trouser_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shoes Size</label>
                  <input
                    type="text"
                    value={formData.shoes_size}
                    onChange={(e) => setFormData({ ...formData, shoes_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Shirt Size</label>
                  <input
                    type="text"
                    value={formData.shirt_size}
                    onChange={(e) => setFormData({ ...formData, shirt_size: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setSelectedOrder(null);
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
                >
                  {selectedOrder ? 'Update' : 'Submit'} Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Application Details</h3>
            
            <div className="space-y-3 mb-6">
              <div><span className="font-bold">School:</span> {selectedOrder.school_details?.name || 'N/A'}</div>
              <div><span className="font-bold">Gender:</span> {selectedOrder.gender}</div>
              <div><span className="font-bold">Status:</span> <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedOrder.status)}`}>{getStatusLabel(selectedOrder.status)}</span></div>
              <div><span className="font-bold">Blouse Size:</span> {selectedOrder.blouse_size || '-'}</div>
              <div><span className="font-bold">Skirt Size:</span> {selectedOrder.skirt_size || '-'}</div>
              <div><span className="font-bold">Sweater Size:</span> {selectedOrder.sweater_size || '-'}</div>
              <div><span className="font-bold">Trouser Size:</span> {selectedOrder.trouser_size || '-'}</div>
              <div><span className="font-bold">Shoes Size:</span> {selectedOrder.shoes_size || '-'}</div>
              <div><span className="font-bold">Shirt Size:</span> {selectedOrder.shirt_size || '-'}</div>
              <div><span className="font-bold">Date:</span> {new Date(selectedOrder.created_at).toLocaleDateString()}</div>
            </div>
            
            {selectedOrder.status === 'PENDING' && (
              <div className="flex gap-3 mb-3">
                <button
                  onClick={() => handleEdit(selectedOrder)}
                  className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(selectedOrder.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
                >
                  Delete
                </button>
              </div>
            )}
            
            <button
              onClick={() => setShowDetailsModal(false)}
              className="w-full px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
