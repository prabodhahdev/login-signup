// src/pages/SuperAdminDashboard.jsx
import React, { useState } from "react";
import AdminSideNavbar from "../../components/Navbar/AdminSideNavbar";
import { Outlet } from "react-router-dom";
import AdminHeader from "../../components/Navbar/AdminHeader";

const SuperAdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSideNavbar
        role="superadmin"
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
          role="superadmin"
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        {/* Page content */}
        <main className="flex-1 p-4 overflow-y-auto mt-16 ">
          {/* 👆 mt-16 pushes content below fixed navbar (64px height) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
