import { useState } from 'react';

export default function TailorMyAssignments() {
  const [assignments, setAssignments] = useState([
    { id: 1, studentName: 'John Doe', school: 'Greenwood High School', uniformType: 'Full Set', status: 'received', dueDate: '2024-02-15', measurements: { chest: '36"', waist: '32"', height: '5\'8"', shoulder: '16"' } },
    { id: 2, studentName: 'Jane Smith', school: 'Sunrise Academy', uniformType: 'Shirt & Trousers', status: 'started', dueDate: '2024-02-20', measurements: { chest: '34"', waist: '28"', height: '5\'4"', shoulder: '14"' } },
    { id: 3, studentName: 'Mike Johnson', school: 'Greenwood High School', uniformType: 'Full Set', status: 'halfway', dueDate: '2024-02-18', measurements: { chest: '38"', waist: '34"', height: '5\'10"', shoulder: '17"' } },
    { id: 4, studentName: 'Sarah Williams', school: 'Valley View School', uniformType: 'Dress', status: 'complete', dueDate: '2024-02-10', measurements: { chest: '32"', waist: '26"', height: '5\'3"', shoulder: '13"' } },
    { id: 5, studentName: 'Tom Brown', school: 'Sunrise Academy', uniformType: 'Full Set', status: 'pending', dueDate: '2024-02-25', measurements: { chest: '40"', waist: '36"', height: '6\'0"', shoulder: '18"' } }
  ]);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const handleViewDetails = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDetailsModal(true);
  };

  const updateStatus = (newStatus) => {
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? { ...a, status: newStatus } : a
    ));
    setSelectedAssignment({ ...selectedAssignment, status: newStatus });
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
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.studentName}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assignment.school}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assignment.uniformType}</td>
                <td className="px-6 py-4 text-sm">{getStatusBadge(assignment.status)}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assignment.dueDate}</td>
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

      {/* Details Modal */}
      {showDetailsModal && selectedAssignment && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-lg p-8 max-w-2xl w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Assignment Details</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <span className="font-bold text-gray-700">Student:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.studentName}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">School:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.school}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Uniform Type:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.uniformType}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Due Date:</span>
                <span className="ml-2 text-gray-600">{selectedAssignment.dueDate}</span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Current Status:</span>
                <span className="ml-2">{getStatusBadge(selectedAssignment.status)}</span>
              </div>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h4 className="font-bold text-gray-700 mb-3">Measurements:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-sm text-gray-600">Chest:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.measurements.chest}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Waist:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.measurements.waist}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Height:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.measurements.height}</span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Shoulder:</span>
                  <span className="ml-2 font-medium text-gray-900">{selectedAssignment.measurements.shoulder}</span>
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
