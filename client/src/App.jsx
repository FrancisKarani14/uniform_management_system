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
      </Routes>
    </BrowserRouter>
  );
}
