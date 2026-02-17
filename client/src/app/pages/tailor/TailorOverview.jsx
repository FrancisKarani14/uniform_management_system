export default function TailorOverview() {
  const stats = {
    completedAssignments: 12,
    totalAssignments: 18,
    approvedSchools: 3,
    appliedSchools: 5
  };

  const recentAssignments = [
    { id: 1, studentName: 'John Doe', school: 'Greenwood High School', uniformType: 'Full Set', status: 'received', dueDate: '2024-02-15' },
    { id: 2, studentName: 'Jane Smith', school: 'Sunrise Academy', uniformType: 'Shirt & Trousers', status: 'started', dueDate: '2024-02-20' },
    { id: 3, studentName: 'Mike Johnson', school: 'Greenwood High School', uniformType: 'Full Set', status: 'halfway', dueDate: '2024-02-18' },
    { id: 4, studentName: 'Sarah Williams', school: 'Valley View School', uniformType: 'Dress', status: 'complete', dueDate: '2024-02-10' },
    { id: 5, studentName: 'Tom Brown', school: 'Sunrise Academy', uniformType: 'Full Set', status: 'started', dueDate: '2024-02-25' }
  ];

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
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Completed Assignments</h3>
          <p className="text-4xl font-bold text-green-600">{stats.completedAssignments}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Assignments</h3>
          <p className="text-4xl font-bold text-blue-600">{stats.totalAssignments}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Schools Approved In</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.approvedSchools}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Schools Applied To</h3>
          <p className="text-4xl font-bold text-orange-600">{stats.appliedSchools}</p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Recent Assignments</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uniform Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentAssignments.slice(0, 4).map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.studentName}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{assignment.school}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{assignment.uniformType}</td>
                  <td className="px-6 py-4 text-sm">{getStatusBadge(assignment.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{assignment.dueDate}</td>
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
