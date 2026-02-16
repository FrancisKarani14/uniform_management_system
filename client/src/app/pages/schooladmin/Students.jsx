export default function Students() {
  const students = [
    { id: 1, name: 'John Doe', parent: 'Alice Johnson', grade: 'Grade 8', gender: 'Male' },
    { id: 2, name: 'Jane Smith', parent: 'Bob Smith', grade: 'Grade 10', gender: 'Female' },
    { id: 3, name: 'Mike Williams', parent: 'Carol Williams', grade: 'Grade 6', gender: 'Male' },
    { id: 4, name: 'Sarah Johnson', parent: 'Alice Johnson', grade: 'Grade 5', gender: 'Female' }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">Students</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{student.name}</h3>
            <p className="text-gray-600 mb-1"><span className="font-bold">Parent:</span> {student.parent}</p>
            <p className="text-gray-600 mb-1"><span className="font-bold">Grade:</span> {student.grade}</p>
            <p className="text-gray-600"><span className="font-bold">Gender:</span> {student.gender}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
