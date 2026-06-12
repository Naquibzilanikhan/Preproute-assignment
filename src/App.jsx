import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout.jsx';
import Login from './pages/Login/Login.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import TestTracking from './pages/TestTracking/TestTracking.jsx';
import TestCreation from './pages/TestCreation/TestCreation.jsx';
import QuestionCreation from './pages/TestCreation/QuestionCreation/QuestionCreation.jsx';
import Publish from './pages/TestCreation/Publish/Publish.jsx';
import Success from './pages/TestCreation/Success/Success.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route index element={<Navigate to="/test-creation" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/test-tracking" element={<TestTracking />} />
          <Route path="/test-creation" element={<TestCreation />} />
          <Route path="/test-creation/questions" element={<QuestionCreation />} />
          <Route path="/test-creation/publish" element={<Publish />} />
          <Route path="/test-creation/success" element={<Success />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
