import { useEffect } from 'react';
import { useParentStore } from '../../Stores/parent_stores';
import EmptyState from '../../components/EmptyState';
import { FaSchool } from 'react-icons/fa';

export default function BrowseSchools() {
  const { schools, applications, fetchSchools, fetchApplications, createApplication } = useParentStore();

  useEffect(() => {
    fetchSchools();
    fetchApplications();
  }, [fetchSchools, fetchApplications]);

  const handleApply = async (schoolId) => {
    try {
      await createApplication({ school: schoolId });
    } catch (error) {
      console.error('Failed to apply:', error);
    }
  };

  const getApplicationStatus = (schoolId) => {
    const app = applications.find(a => a.school === schoolId);
    return app ? app.status : null;
  };

  const getStatusColor = (status) => {
    if (!status) return 'bg-green-100 text-green-800';
    switch (status) {
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
                        onClick={() => handleApply(school.id)}
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
    </div>
  );
}
