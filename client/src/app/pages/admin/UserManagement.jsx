import { useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Parent' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Parent' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Parent' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Parent' },
    { id: 5, name: 'Emma Davis', email: 'emma@example.com', role: 'Parent' }
  ]);

  const handleUpgrade = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: 'School Admin' }
        : user
    ));
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-gray-900">User Management</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'School Admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {user.role === 'Parent' ? (
                    <button 
                      onClick={() => handleUpgrade(user.id)}
                      className="text-blue-700 hover:text-blue-800 font-medium"
                    >
                      Upgrade to School Admin
                    </button>
                  ) : (
                    <span className="text-gray-400">Upgraded</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
