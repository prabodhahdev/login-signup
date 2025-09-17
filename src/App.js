import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ActionHandler from "./pages/ActionHandler";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ViewAllUser from "./pages/admin/ViewAllUser";
import LockedUsers from "./pages/admin/LockedUsers";
import ViewAllAdmin from "./pages/superAdmin/ViewAllAdmin";
import AddAdmin from "./pages/superAdmin/AddAdmin";
import ProfilePage from "./pages/user/ProfilePage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard";
import AddUserPage from "./pages/admin/AddUserPage";
import UserDashboard from "./pages/user/UserDashboard";
import Dashboard from "./pages/admin/Dashboard";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import ResetPasswordPage from "./pages/user/ResetPasswordPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/action" element={<ActionHandler />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["user"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          {/* Nested routes */}
          <Route index element={<Dashboard />} /> {/* default page */}
          <Route path="users" element={<ViewAllUser />} />
          <Route path="users/add" element={<AddUserPage />} />
          <Route path="users/locked" element={<LockedUsers />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route
          path="/superadmin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["superadmin"]}>
              <SuperAdminDashboard /> {/* layout with sidebar + top navbar */}
            </ProtectedRoute>
          }
        >
          {/* Default content */}
          <Route index element={<Dashboard />} />

          {/* User Management */}
          <Route path="users" element={<ViewAllUser />} />
          <Route path="users/add" element={<AddUserPage />} />
          <Route path="users/locked" element={<LockedUsers />} />

          {/* Admin Management */}
          <Route path="admins" element={<ViewAllAdmin />} />
          <Route path="admins/add" element={<AddAdmin />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}

export default App;
