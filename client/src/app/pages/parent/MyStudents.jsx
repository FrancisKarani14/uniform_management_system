import { useState, useEffect } from 'react';
import { useParentStore } from '../../Stores/parent_stores';
import EmptyState from '../../components/EmptyState';
import { FaUserGraduate } from 'react-icons/fa';
import API from '../../Api/Api';

export default function MyStudents() {
  const { students, fetchStudents } = useParentStore();
  
  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    gender: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await API.get('/users/users/me/');
      const parentProfileId = response.data.parent_profile.id;
      
      const timestamp = Date.now();
      const admissionNumber = `STU${timestamp}`;
      
      await API.post('/users/student_profiles/', {
        parent: parentProfileId,
        first_name: formData.first_name,
        last_name: formData.last_name,
        admission_number: admissionNumber,
        gender: formData.gender,
        school: null,
        user: null
      });
      
      setShowModal(false);
      setFormData({ first_name: '', last_name: '', gender: '' });
      await fetchStudents();
    } catch (error) {
      console.error('Failed to add student:', error);
      const errorMsg = error.response?.data?.email?.[0]
        || error.response?.data?.detail
        || error.response?.data?.message
        || 'Failed to add student';
      setError(errorMsg);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Students</h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
        >
          Add Child
        </button>
      </div>
      
      {students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{student.first_name || student.user?.first_name} {student.last_name || student.user?.last_name}</h3>
              <p className="text-gray-600 mb-1">{student.school?.name || 'Not Enrolled'}</p>
              <p className="text-gray-500 text-sm">Admission: {student.admission_number}</p>
              <p className="text-gray-500 text-sm">Gender: {student.gender}</p>
              <button className="mt-4 w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all">
                View Details
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaUserGraduate />}
            title="No Students Added"
            message="You haven't added any students yet. Click the button above to add your first child."
            actionLabel="Add Child"
            onAction={() => setShowModal(true)}
          />
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Add Child</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
                >
                  Add Child
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
