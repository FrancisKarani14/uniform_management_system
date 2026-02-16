import { useState } from 'react';

export default function TailorApplications() {
  const [applications, setApplications] = useState([
    { id: 1, name: 'Frank Taylor', email: 'frank@example.com', location: 'Nairobi', status: 'Pending', date: '2025-01-20' },
    { id: 2, name: 'Grace Miller', email: 'grace@example.com', location: 'Mombasa', status: 'Pending', date: '2025-01-19' },
    { id: 3, name: 'Henry Wilson', email: 'henry@example.com', location: 'Kisumu', status: 'Approved', date: '2025-01-18' }
  ]);

  const handleAction = (id, action) => {
    setApplications(applications.map(app =>
      app.id === id ? { ...app, status: action } : app
    ));
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
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{app.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {app.status === 'Pending' ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAction(app.id, 'Approved')}
                        className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-xs"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleAction(app.id, 'Rejected')}
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
