import { useState, useEffect } from 'react';
import { useTailorStore } from '../../Stores/tailor_stores';
import EmptyState from '../../components/EmptyState';
import { FaTshirt } from 'react-icons/fa';

export default function TailorMyAssignments() {
  const { assignments, fetchAssignments, updateAssignmentStatus } = useTailorStore();

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const updateStatus = async (newStatus) => {
    try {
      await updateAssignmentStatus(selectedAssignment.id, newStatus);
      setSelectedAssignment({ ...selectedAssignment, status: newStatus });
    } catch (error) {
      console.error('Failed to update status:', error);
    }
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
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Assignments</h2>
      
      {assignments.length > 0 ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uniform Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.uniform_order?.student || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assignment.school?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assignment.uniform_order?.gender || 'N/A'}</td>
                <td className="px-6 py-4 text-sm">{getStatusBadge(assignment.status || 'pending')}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{new Date(assignment.created_at).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleViewDetails(assignment)}
                    className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
                  >
                    View Details
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
            icon={<FaTshirt />}
            title="No Assignments Yet"
            message="You don't have any uniform assignments yet. Make sure you're approved by schools to start receiving assignments."
          />
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedAssignment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Assignment Details</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <span className="font-bold text-gray-700">Student:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.uniform_order?.student || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">School:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.school?.name || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Uniform Type:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.uniform_order?.gender || 'N/A'}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Assignment Date:</span>
                <span className="ml-2 text-gray-600">{new Date(selectedAssignment.created_at).toLocaleDateString()}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Current Status:</span>
                <span className="ml-2">{getStatusBadge(selectedAssignment.status || 'pending')}</span>
              </div>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-3">Measurements:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-sm text-gray-600">Shirt:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.uniform_order?.shirt_size || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Trouser:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.uniform_order?.trouser_size || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Shoes:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.uniform_order?.shoes_size || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Sweater:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.uniform_order?.sweater_size || 'N/A'}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-bold text-gray-700 mb-3">Update Progress:</h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => updateStatus('received')}
                  disabled={selectedAssignment.status === 'received'}
                  className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Mark as Received
                </button>
                <button
                  onClick={() => updateStatus('started')}
                  disabled={selectedAssignment.status === 'started' || selectedAssignment.status === 'pending'}
                  className="px-4 py-2 bg-purple-700 text-white rounded-md hover:bg-purple-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Mark as Started
                </button>
                <button
                  onClick={() => updateStatus('halfway')}
                  disabled={selectedAssignment.status === 'halfway' || selectedAssignment.status === 'pending' || selectedAssignment.status === 'received'}
                  className="px-4 py-2 bg-orange-700 text-white rounded-md hover:bg-orange-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Mark as Halfway Done
                </button>
                <button
                  onClick={() => updateStatus('complete')}
                  disabled={selectedAssignment.status === 'complete' || selectedAssignment.status === 'pending'}
                  className="px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Mark as Complete
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedAssignment(null);
                }}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
