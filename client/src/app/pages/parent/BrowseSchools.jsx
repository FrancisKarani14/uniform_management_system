import { useEffect, useState } from 'react';
import { useParentStore } from '../../Stores/parent_stores';
import EmptyState from '../../components/EmptyState';
import { FaSchool } from 'react-icons/fa';
import API from '../../Api/Api';

export default function BrowseSchools() {
  const { schools, applications, students, fetchSchools, fetchApplications, fetchStudents, createApplication } = useParentStore();
  const [showModal, setShowModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSchools();
    fetchApplications();
    fetchStudents();
  }, [fetchSchools, fetchApplications, fetchStudents]);

  const handleApplyClick = (school) => {
    setSelectedSchool(school);
    setShowModal(true);
    setError('');
  };

  const handleApply = async () => {
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    try {
      const response = await API.get('/users/users/me/');
      const parentProfileId = response.data.parent_profile.id;
      
      await createApplication({ 
        parent: parentProfileId,
        school: selectedSchool.id,
        student: selectedStudent
      });
      
      setShowModal(false);
      setSelectedStudent('');
      setSelectedSchool(null);
      fetchApplications();
    } catch (error) {
      console.error('Failed to apply:', error);
      setError(error.response?.data?.detail || 'Failed to submit application');
    }
  };

  const getApplicationStatus = (schoolId) => {
    const app = applications.find(a => a.school?.id === schoolId);
    return app ? app.status : null;
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-green-100 text-green-800';
    switch (status?.toUpperCase()) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-blue-100 text-blue-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return 'Available';
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Browse Schools</h2>
      
      {schools.length > 0 ? (
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
            {schools.map((school) => {
              const appStatus = getApplicationStatus(school.id);
              return (
                <tr key={school.id}>
                  <td className="px-6 py-4 text-sm text-gray-900 font-bold">{school.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{school.location}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(appStatus)}`}>
                      {getStatusLabel(appStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {!appStatus ? (
                      <button 
                        onClick={() => handleApplyClick(school)}
                        className="text-blue-700 hover:text-blue-800 font-medium"
                      >
                        Apply
                      </button>
                    ) : (
                      <span className="text-gray-400">Applied</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaSchool />}
            title="No Schools Available"
            message="There are currently no schools in the system. Please check back later or contact the administrator."
          />
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Apply to {selectedSchool?.name}</h3>
            
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student *
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-700"
              >
                <option value="">-- Select a student --</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.user?.first_name} {student.user?.last_name} ({student.admission_number})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedStudent('');
                  setSelectedSchool(null);
                  setError('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
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
