export default function TailorOverview() {
  const stats = {
    completedAssignments: 12,
    totalAssignments: 18,
    approvedSchools: 3,
    appliedSchools: 5
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
    </div>
  );
}
