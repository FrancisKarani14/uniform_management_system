export default function SchoolAdminOverview() {
  const stats = {
    parentApplications: 12,
    tailorApplications: 5,
    uniformApplications: 28,
    approvedUniformApplications: 15,
    assignedUniformApplications: 10
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">School Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Parent Applications</h3>
          <p className="text-4xl font-bold text-blue-700">{stats.parentApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Tailor Applications</h3>
          <p className="text-4xl font-bold text-green-600">{stats.tailorApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Uniform Applications</h3>
          <p className="text-4xl font-bold text-purple-600">{stats.uniformApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Approved Uniforms</h3>
          <p className="text-4xl font-bold text-green-600">{stats.approvedUniformApplications}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Assigned Uniforms</h3>
          <p className="text-4xl font-bold text-orange-600">{stats.assignedUniformApplications}</p>
        </div>
      </div>
    </div>
  );
}
