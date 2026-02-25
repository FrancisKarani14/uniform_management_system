import { useEffect } from 'react';
import { useSchoolAdminStore } from '../../Stores/schooladmin_stores';
import EmptyState from '../../components/EmptyState';
import { FaUserGraduate } from 'react-icons/fa';

export default function Students() {
  const { students, fetchStudents } = useSchoolAdminStore();

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Students</h2>
      
      {students.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{student.user?.first_name} {student.user?.last_name}</h3>
              <p className="text-gray-600 mb-1"><span className="font-bold">Parent:</span> {student.parent?.user?.email || 'N/A'}</p>
              <p className="text-gray-600 mb-1"><span className="font-bold">Admission:</span> {student.admission_number}</p>
              <p className="text-gray-600"><span className="font-bold">Gender:</span> {student.gender}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <EmptyState
            icon={<FaUserGraduate />}
            title="No Students Enrolled"
            message="There are no students enrolled in your school yet. Parents need to apply and enroll their children first."
          />
        </div>
      )}
    </div>
  );
}
