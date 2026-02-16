import { useState } from 'react';

export default function AdminSchools() {
  const [schools, setSchools] = useState([
    { id: 1, name: 'Greenwood High School', location: 'Nairobi', students: 450, admin: 'John Admin' },
    { id: 2, name: 'Sunrise Academy', location: 'Mombasa', students: 320, admin: 'Sarah Admin' },
    { id: 3, name: 'Valley View School', location: 'Kisumu', students: 280, admin: 'Mike Admin' },
    { id: 4, name: 'Hilltop Secondary', location: 'Nakuru', students: 510, admin: 'Jane Admin' },
    { id: 5, name: 'Riverside Primary', location: 'Eldoret', students: 190, admin: 'Tom Admin' }
  ]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [schoolToDelete, setSchoolToDelete] = useState(null);

  const handleDeleteClick = (school) => {
    setSchoolToDelete(school);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    setSchools(schools.filter(school => school.id !== schoolToDelete.id));
    setShowConfirm(false);
    setSchoolToDelete(null);
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Schools Management</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">School Admin</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {schools.map((school) => (
              <tr key={school.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{school.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.location}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.students}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{school.admin}</td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => handleDeleteClick(school)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{schoolToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setSchoolToDelete(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
