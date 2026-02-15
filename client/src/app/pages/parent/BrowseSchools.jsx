export default function BrowseSchools() {
  const schools = [
    { id: 1, name: 'Greenwood High School', location: 'Nairobi', status: 'Available' },
    { id: 2, name: 'Sunrise Academy', location: 'Mombasa', status: 'Available' },
    { id: 3, name: 'Valley View School', location: 'Kisumu', status: 'Available' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Browse Schools</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{school.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.location}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    {school.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  <button className="text-blue-700 hover:text-blue-800 font-medium">Apply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
