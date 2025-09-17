import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/AdminDashboard";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ActionHandler from "./pages/ActionHandler";
import ProtectedRoute from "./components/ProtectedRoute";
import SuperAdminDashboard from "./layouts/SuperAdminDashboard";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ViewAllUser from "./pages/admin/ViewAllUser";
import AddUser from "./pages/admin/AddUser";
import LockedUsers from "./pages/admin/LockedUsers";
import ViewAllAdmin from "./pages/admin/superAdmin/ViewAllAdmin";
import AddAdmin from "./pages/admin/superAdmin/AddAdmin";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./layouts/AdminDashboard";

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
>
  {/* Nested routes */}
  <Route index element={<Dashboard />} /> {/* default page */}
  <Route path="users" element={<ViewAllUser />} />
  <Route path="users/add" element={<AddUser />} />
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
          <Route path="users/add" element={<AddUser />} />
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
