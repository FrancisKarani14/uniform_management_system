import { useState, useEffect } from 'react';
import { useTailorStore } from '../../Stores/tailor_stores';

export default function TailorBrowseSchools() {
  const { schools, applications, fetchSchools, fetchApplications, applyToSchool } = useTailorStore();
  
  useEffect(() => {
    fetchSchools();
    fetchApplications();
  }, [fetchSchools, fetchApplications]);

  const getApplicationStatus = (schoolId) => {
    const app = applications.find(a => a.school === schoolId);
    return app ? app.status : null;
  };

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [address, setAddress] = useState('');

  const handleApply = (school) => {
    setSelectedSchool(school);
    setShowApplyModal(true);
  };

  const submitApplication = async () => {
    try {
      await applyToSchool({ school: selectedSchool.id });
      setShowApplyModal(false);
      setSelectedSchool(null);
      setAddress('');
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Browse Schools</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school) => {
          const appStatus = getApplicationStatus(school.id);
          return (
            <div key={school.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{school.name}</h3>
              <p className="text-gray-600 mb-1">Location: {school.location}</p>
              <p className="text-gray-600 mb-4">Students: {school.students?.length || 0}</p>
              
              {appStatus === 'APPROVED' && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Approved
                </span>
              )}
              {appStatus === 'PENDING' && (
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  Pending
                </span>
              )}
              {appStatus === 'REJECTED' && (
                <span className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                  Rejected
                </span>
              )}
              {!appStatus && (
                <button
                  onClick={() => handleApply(school)}
                  className="w-full px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
                >
                  Apply
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="pointer-events-auto bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Apply to {selectedSchool?.name}</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Business Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your business address/location"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowApplyModal(false);
                  setSelectedSchool(null);
                  setAddress('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={submitApplication}
                disabled={!address.trim()}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
