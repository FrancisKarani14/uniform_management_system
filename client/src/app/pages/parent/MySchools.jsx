export default function MySchools() {
  const schools = [
    { id: 1, name: 'Greenwood High School', location: 'Nairobi', students: 2, status: 'Active' },
    { id: 2, name: 'Sunrise Academy', location: 'Mombasa', students: 1, status: 'Active' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Schools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {schools.map((school) => (
          <div key={school.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{school.name}</h3>
            <p className="text-gray-600 mb-1">Location: {school.location}</p>
            <p className="text-gray-600 mb-1">Students Enrolled: {school.students}</p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs mt-2">
              {school.status}
            </span>
            <button className="mt-4 w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
