export default function UniformAssignments() {
  const assignments = [
    { id: 1, student: 'Jane Smith', parent: 'Bob Smith', tailor: 'Frank Taylor', status: 'In Progress', date: '2025-01-19' },
    { id: 2, student: 'Mike Williams', parent: 'Carol Williams', tailor: 'Grace Miller', status: 'Complete', date: '2025-01-18' },
    { id: 3, student: 'Sarah Johnson', parent: 'Alice Johnson', tailor: 'Henry Wilson', status: 'In Progress', date: '2025-01-17' }
  ];

  const getStatusColor = (status) => {
    return status === 'Complete' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800';
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Uniform Assignments</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parent</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Tailor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignment Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{assignment.student}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.parent}</td>
                <td className="px-6 py-4 text-sm text-gray-600 font-bold">{assignment.tailor}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{assignment.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
