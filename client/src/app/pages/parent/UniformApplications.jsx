export default function UniformApplications() {
  const applications = [
    { id: 1, student: 'John Doe', school: 'Greenwood High School', status: 'Approved', date: '2025-01-15', tailorProgress: 'received', tailor: 'Mike Tailor' },
    { id: 2, student: 'Jane Doe', school: 'Greenwood High School', status: 'Approved', date: '2025-01-10', tailorProgress: 'halfway', tailor: 'Sarah Tailor' },
    { id: 3, student: 'Mike Doe', school: 'Sunrise Academy', status: 'Pending', date: '2025-01-18', tailorProgress: null, tailor: null },
    { id: 4, student: 'John Doe', school: 'Greenwood High School', status: 'Rejected', date: '2025-01-05', tailorProgress: null, tailor: null },
    { id: 5, student: 'Jane Doe', school: 'Greenwood High School', status: 'Approved', date: '2025-01-12', tailorProgress: 'complete', tailor: 'Mike Tailor' }
  ];

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
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Uniform Applications</h2>
      
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
            {applications.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.student}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.school}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{app.tailor || '-'}</td>
                <td className="px-6 py-4 text-sm">
                  {app.tailorProgress ? getTailorProgressBadge(app.tailorProgress) : <span className="text-gray-400">-</span>}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-700 hover:text-blue-800 font-medium">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
