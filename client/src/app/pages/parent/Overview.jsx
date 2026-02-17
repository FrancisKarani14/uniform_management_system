export default function Overview() {
  const stats = {
    uniformApplications: 5,
    approvedSchools: 2,
    myStudents: 3
  };

  const recentApplications = [
    { id: 1, student: 'John Doe', school: 'Greenwood High School', tailorProgress: 'received', tailor: 'Mike Tailor', date: '2025-01-15' },
    { id: 2, student: 'Jane Doe', school: 'Greenwood High School', tailorProgress: 'halfway', tailor: 'Sarah Tailor', date: '2025-01-10' },
    { id: 3, student: 'Mike Doe', school: 'Sunrise Academy', tailorProgress: 'started', tailor: 'Mike Tailor', date: '2025-01-18' },
    { id: 4, student: 'Jane Doe', school: 'Greenwood High School', tailorProgress: 'complete', tailor: 'Mike Tailor', date: '2025-01-12' }
  ];

  const getTailorProgressBadge = (progress) => {
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

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Uniform Applications</h3>
          <p className="text-4xl font-bold text-blue-700">{stats.uniformApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Approved Schools</h3>
          <p className="text-4xl font-bold text-green-600">{stats.approvedSchools}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">My Students</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.myStudents}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Recent Application Progress</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tailor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentApplications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.student}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.school}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 font-bold">{app.tailor}</td>
                  <td className="px-6 py-4 text-sm">{getTailorProgressBadge(app.tailorProgress)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{app.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
