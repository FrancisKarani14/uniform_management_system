import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './app/pages/LandingPage';
import LoginPage from './app/pages/LoginPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
