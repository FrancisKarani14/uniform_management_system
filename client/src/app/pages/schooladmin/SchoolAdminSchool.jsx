import { useEffect, useState } from 'react';
import API from '../../Api/Api';

export default function SchoolAdminSchool() {
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    phone_number: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchool();
  }, []);

  const fetchSchool = async () => {
    try {
      const response = await API.get('/users/users/me/');
      setSchool(response.data.school_admin_profile?.school);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch school:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await API.post('/schools/schools/', formData);
      
      // Get current user profile
      const userResponse = await API.get('/users/users/me/');
      const profileId = userResponse.data.school_admin_profile.id;
      
      // Update school admin profile with the new school
      await API.patch(`/users/school_admin_profiles/${profileId}/`, {
        school: response.data.id
      });
      
      setSchool(response.data);
      setShowCreate(false);
      setFormData({ name: '', location: '', phone_number: '' });
    } catch (error) {
      console.error('Error creating school:', error.response?.data);
      const errorMsg = error.response?.data?.detail || 
                       error.response?.data?.name?.[0] || 
                       error.response?.data?.location?.[0] || 
                       error.response?.data?.phone_number?.[0] || 
                       'Failed to create school';
      setError(errorMsg);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My School</h2>
        {!school && (
          <button
            onClick={() => setShowCreate(true)}
            className="px-6 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Create School
          </button>
        )}
      </div>

      {school ? (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h3 className="text-xl font-bold mb-4 text-gray-900">School Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">School Name:</span>
              <span className="font-bold">{school.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-bold">{school.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-bold">{school.phone_number}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl text-center">
          <p className="text-gray-600 mb-4">You haven't created a school yet.</p>
          <p className="text-gray-500">Click the "Create School" button above to get started.</p>
        </div>
      )}

      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Create Your School</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreate(false);
                    setError('');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  Create School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
