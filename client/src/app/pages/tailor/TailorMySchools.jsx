import { useEffect } from 'react';
import { useTailorStore } from '../../Stores/tailor_stores';
import EmptyState from '../../components/EmptyState';
import { FaSchool } from 'react-icons/fa';

export default function TailorMySchools() {
  const { applications, assignments, fetchApplications, fetchAssignments } = useTailorStore();

  useEffect(() => {
    fetchApplications();
    fetchAssignments();
  }, [fetchApplications, fetchAssignments]);

  const approvedSchools = applications.filter(app => app.status === 'APPROVED');

  const getAssignmentCountForSchool = (schoolId) => {
    return assignments.filter(a => a.school?.id === schoolId).length;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">My Schools</h2>
      
      {approvedSchools.length > 0 ? (
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
            {approvedSchools.map((app) => (
              <tr key={app.id}>
                <td className="px-6 py-4 text-sm text-gray-900 font-bold">{app.school?.name || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.school?.location || 'N/A'}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{app.school?.students?.length || 0}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{getAssignmentCountForSchool(app.school?.id)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaSchool />}
            title="No Approved Schools"
            message="You don't have any approved school applications yet. Browse schools and apply to start receiving assignments."
          />
        </div>
      )}
    </div>
  );
}
