import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ActionHandler from './pages/ActionHandler';
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminDashboard from './pages/SuperAdminDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<LoginPage />} />
        <Route path="/action" element={<ActionHandler />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        <Route
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={["user"]}>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/admin-dashboard"
    element={
      <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />
  <Route
    path="/superadmin-dashboard"
    element={
      <ProtectedRoute allowedRoles={["superadmin"]}>
        <SuperAdminDashboard />
      </ProtectedRoute>
    }
  />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
