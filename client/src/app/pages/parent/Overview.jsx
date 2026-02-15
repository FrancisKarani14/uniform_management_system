export default function Overview() {
  const stats = {
    uniformApplications: 5,
    approvedSchools: 2,
    myStudents: 3
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
    </div>
  );
}
