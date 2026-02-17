import { useState } from 'react';

export default function TailorMySchools() {
  const [schools] = useState([
    { id: 1, name: 'Greenwood High School', location: 'Nairobi', students: 450, assignmentsCount: 8 },
    { id: 2, name: 'Sunrise Academy', location: 'Mombasa', students: 320, assignmentsCount: 5 },
    { id: 3, name: 'Valley View School', location: 'Kisumu', students: 280, assignmentsCount: 5 }
  ]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Schools</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assignments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{school.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.students}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.assignmentsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
