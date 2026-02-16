import { useState } from 'react';

export default function UniformApplications() {
  const [applications, setApplications] = useState([
    { id: 1, parent: 'Alice Johnson', student: 'John Doe', shirt: 'M', trouser: '32', shoes: '42', status: 'Pending', date: '2025-01-20' },
    { id: 2, parent: 'Bob Smith', student: 'Jane Smith', shirt: 'S', trouser: '28', shoes: '38', status: 'Approved', date: '2025-01-19' },
    { id: 3, parent: 'Carol Williams', student: 'Mike Williams', shirt: 'L', trouser: '34', shoes: '44', status: 'Approved', date: '2025-01-18' }
  ]);

  const tailors = [
    { id: 1, name: 'Frank Taylor' },
    { id: 2, name: 'Grace Miller' },
    { id: 3, name: 'Henry Wilson' }
  ];

  const [showDetails, setShowDetails] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [selectedApp, setSelectedApp] = useState(null);
  const [selectedTailor, setSelectedTailor] = useState('');

  const handleAction = (id, action) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: action } : app
    ));
    setShowDetails(false);
  };

  const handleAssign = () => {
    alert(`Assigned to ${tailors.find(t => t.id === parseInt(selectedTailor))?.name}`);
    setShowAssign(false);
    setSelectedTailor('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
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
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.parent}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
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
                    {app.status === 'Approved' && (
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
              <div><span className="font-bold">Parent:</span> {selectedApp.parent}</div>
              <div><span className="font-bold">Student:</span> {selectedApp.student}</div>
              <div><span className="font-bold">Shirt Size:</span> {selectedApp.shirt}</div>
              <div><span className="font-bold">Trouser Size:</span> {selectedApp.trouser}</div>
              <div><span className="font-bold">Shoe Size:</span> {selectedApp.shoes}</div>
              <div><span className="font-bold">Date Applied:</span> {selectedApp.date}</div>
              <div><span className="font-bold">Status:</span> <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedApp.status)}`}>{selectedApp.status}</span></div>
            </div>
            {selectedApp.status === 'Pending' && (
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
            <p className="mb-4">Assign uniform application for <strong>{selectedApp.student}</strong> to a tailor:</p>
            <select
              value={selectedTailor}
              onChange={(e) => setSelectedTailor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-6 focus:ring-2 focus:ring-blue-700"
            >
              <option value="">Select Tailor</option>
              {tailors.map(tailor => (
                <option key={tailor.id} value={tailor.id}>{tailor.name}</option>
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
