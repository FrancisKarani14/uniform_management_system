import { useEffect, useState } from 'react';
import API from '../../Api/Api';

export default function TailorProfile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [formData, setFormData] = useState({ shop_name: '', location: '', phone_number: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('/users/users/me/');
        setUser(response.data);
        setProfile(response.data.tailor_profile);
        setFormData({
          shop_name: response.data.tailor_profile?.shop_name || '',
          location: response.data.tailor_profile?.location || '',
          phone_number: response.data.tailor_profile?.phone_number || ''
        });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await API.patch(`/users/tailor_profiles/${profile.id}/`, formData);
      setProfile({ ...profile, ...formData });
      setShowEdit(false);
    } catch (error) {
      setError(error.response?.data?.shop_name?.[0] || error.response?.data?.location?.[0] || error.response?.data?.phone_number?.[0] || 'Failed to update profile');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Profile</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">User Information</h3>
          <button
            onClick={() => setShowEdit(true)}
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
          >
            Edit Profile
          </button>
        </div>
        <div className="space-y-3 mb-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-bold">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Name:</span>
            <span className="font-bold">{user?.first_name} {user?.last_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Role:</span>
            <span className="font-bold">{user?.role}</span>
          </div>
        </div>

        <h3 className="text-xl font-bold mb-4 text-gray-900">Profile Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Shop Name:</span>
            <span className="font-bold">{profile?.shop_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-bold">{profile?.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phone Number:</span>
            <span className="font-bold">{profile?.phone_number}</span>
          </div>
        </div>
      </div>

      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Edit Profile</h3>
            {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name *</label>
                <input
                  type="text"
                  value={formData.shop_name}
                  onChange={(e) => setFormData({ ...formData, shop_name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
                  required
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowEdit(false)} className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
