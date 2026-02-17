import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './app/pages/LandingPage';
import LoginPage from './app/pages/LoginPage';
import RegisterPage from './app/pages/RegisterPage';
import ParentDashboard from './app/pages/ParentDashboard';
import Overview from './app/pages/parent/Overview';
import BrowseSchools from './app/pages/parent/BrowseSchools';
import MyStudents from './app/pages/parent/MyStudents';
import UniformApplications from './app/pages/parent/UniformApplications';
import MySchools from './app/pages/parent/MySchools';
import SystemAdminDashboard from './app/pages/SystemAdminDashboard';
import AdminOverview from './app/pages/admin/AdminOverview';
import UserManagement from './app/pages/admin/UserManagement';
import AdminSchools from './app/pages/admin/AdminSchools';
import SchoolAdminDashboard from './app/pages/SchoolAdminDashboard';
import SchoolAdminOverview from './app/pages/schooladmin/SchoolAdminOverview';
import ParentApplications from './app/pages/schooladmin/ParentApplications';
import TailorApplications from './app/pages/schooladmin/TailorApplications';
import UniformApplicationsSA from './app/pages/schooladmin/UniformApplications';
import UniformAssignments from './app/pages/schooladmin/UniformAssignments';
import Students from './app/pages/schooladmin/Students';
import TailorDashboard from './app/pages/TailorDashboard';
import TailorOverview from './app/pages/tailor/TailorOverview';
import TailorBrowseSchools from './app/pages/tailor/TailorBrowseSchools';
import TailorMySchools from './app/pages/tailor/TailorMySchools';
import TailorMyAssignments from './app/pages/tailor/TailorMyAssignments';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />}>
          <Route index element={<Overview />} />
          <Route path="browse-schools" element={<BrowseSchools />} />
          <Route path="my-students" element={<MyStudents />} />
          <Route path="uniform-applications" element={<UniformApplications />} />
          <Route path="my-schools" element={<MySchools />} />
        </Route>
        <Route path="/admin-dashboard" element={<SystemAdminDashboard />}>
          <Route index element={<AdminOverview />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="schools" element={<AdminSchools />} />
        </Route>
        <Route path="/school-admin-dashboard" element={<SchoolAdminDashboard />}>
          <Route index element={<SchoolAdminOverview />} />
          <Route path="parent-applications" element={<ParentApplications />} />
          <Route path="tailor-applications" element={<TailorApplications />} />
          <Route path="uniform-applications" element={<UniformApplicationsSA />} />
          <Route path="uniform-assignments" element={<UniformAssignments />} />
          <Route path="students" element={<Students />} />
        </Route>
        <Route path="/tailor-dashboard" element={<TailorDashboard />}>
          <Route index element={<TailorOverview />} />
          <Route path="browse-schools" element={<TailorBrowseSchools />} />
          <Route path="my-schools" element={<TailorMySchools />} />
          <Route path="my-assignments" element={<TailorMyAssignments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
