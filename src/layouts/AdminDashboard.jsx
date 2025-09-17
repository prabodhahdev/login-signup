// src/pages/SuperAdminDashboard.jsx
import React, { useState } from "react";
import SuperAdminNavbar from "../components/Navbar/AdminSideNavbar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Navbar/AdminHeader";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <SuperAdminNavbar
        role="admin"
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
    ${isSidebarOpen ? "ml-64" : "ml-0"} 
    md:ml-20 
    lg:ml-64`}
      >
        {/* Top Navbar */}
        <AdminHeader
          role="admin"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Page content */}
        <main className="flex-1 p-4 overflow-y-auto mt-16 ">
          {/* 👆 mt-16 pushes content below fixed navbar (64px height) */}
          <h1 className="text-2xl font-bold mb-4">Test Content</h1>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
