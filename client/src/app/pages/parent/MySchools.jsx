import { useState, useEffect } from 'react';
import { useParentStore } from '../../Stores/parent_stores';
import EmptyState from '../../components/EmptyState';
import { FaSchool } from 'react-icons/fa';

export default function MySchools() {
  const { applications, students, fetchApplications, fetchStudents } = useParentStore();
  
  useEffect(() => {
    fetchApplications();
    fetchStudents();
  }, [fetchApplications, fetchStudents]);

  const approvedSchools = applications.filter(app => app.status === 'APPROVED');
  const uniqueSchools = [...new Map(approvedSchools.map(app => [app.school?.id, app.school])).values()];

  const [showModal, setShowModal] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedChildren, setSelectedChildren] = useState([]);

  const handleEnrollClick = (school) => {
    setSelectedSchool(school);
    setShowModal(true);
  };

  const toggleChild = (childId) => {
    setSelectedChildren(prev =>
      prev.includes(childId)
        ? prev.filter(id => id !== childId)
        : [...prev, childId]
    );
  };

  const handleEnroll = async () => {
    // TODO: Implement enroll student API call
    alert(`Enrolled ${selectedChildren.length} child(ren) to ${selectedSchool.name}`);
    setShowModal(false);
    setSelectedChildren([]);
    setSelectedSchool(null);
  };

  const getStudentCountForSchool = (schoolId) => {
    return students.filter(s => s.school?.id === schoolId).length;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Schools</h2>
      
      {uniqueSchools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {uniqueSchools.map((school) => (
          <div key={school.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{school.name}</h3>
            <p className="text-gray-600 mb-1">Location: {school.location}</p>
            <p className="text-gray-600 mb-1">Students Enrolled: {getStudentCountForSchool(school.id)}</p>
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs mt-2">
              Active
            </span>
            <button 
              onClick={() => handleEnrollClick(school)}
              className="mt-4 w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all"
            >
              Enroll Child
            </button>
          </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaSchool />}
            title="No Approved Schools"
            message="You don't have any approved school applications yet. Browse schools and apply to get started."
          />
        </div>
      )}

      {/* Enrollment Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Enroll Children</h3>
            <p className="text-gray-600 mb-6">Select children to enroll in {selectedSchool?.name}</p>
            
            <div className="space-y-3 mb-6">
              {students.map((child) => (
                <label
                  key={child.id}
                  className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedChildren.includes(child.id)}
                    onChange={() => toggleChild(child.id)}
                    className="w-4 h-4 text-blue-700 rounded focus:ring-2 focus:ring-blue-700"
                  />
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">{child.user?.first_name} {child.user?.last_name}</p>
                    <p className="text-sm text-gray-600">{child.admission_number} • {child.gender}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedChildren([]);
                  setSelectedSchool(null);
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleEnroll}
                disabled={selectedChildren.length === 0}
                className="flex-1 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Enroll ({selectedChildren.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
