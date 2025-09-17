// src/components/AdminSideNavbar.jsx
import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  UsersIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  UserCircleIcon,
  UserPlusIcon,
  LockClosedIcon,
  ViewfinderCircleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { getAuth, signOut } from "firebase/auth";

const AdminSideNavbar = ({ isOpen, onClose, role }) => {
  const auth = getAuth();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("role"); 
      Navigate("/"); 
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActive = (href) => location.pathname === href;

  const handleLinkClick = () => {
    if (onClose) onClose(); // Close sidebar on mobile
  };

  const getLinks = () => {
    if (role === "superadmin") {
      return [
        { name: "Dashboard", href: "/superadmin-dashboard", icon: HomeIcon },
        {
          name: "User Management",
          icon: UserGroupIcon,
          children: [
            { name: "View All Users", href: "/superadmin-dashboard/users", icon: UsersIcon },
            { name: "Add User", href: "/superadmin-dashboard/users/add", icon: UserPlusIcon },
            { name: "Locked Users", href: "/superadmin-dashboard/users/locked", icon: LockClosedIcon },
          ],
        },
        {
          name: "Admin Management",
          icon: UsersIcon,
          children: [
            { name: "View All Admins", href: "/superadmin-dashboard/admins", icon: ViewfinderCircleIcon },
            { name: "Add Admin", href: "/superadmin-dashboard/admins/add", icon: UserPlusIcon },
          ],
        },
        { name: "Profile", href: "/superadmin-dashboard/profile", icon: UserCircleIcon },
      ];
    } else if (role === "admin") {
      return [
        { name: "Dashboard", href: "/admin-dashboard", icon: HomeIcon },
        {
          name: "User Management",
          icon: UserGroupIcon,
          children: [
            { name: "View All Users", href: "/admin-dashboard/users", icon: UsersIcon },
            { name: "Add User", href: "/admin-dashboard/users/add", icon: UserPlusIcon },
                        { name: "Locked Users", href: "/admin-dashboard/users/locked", icon: LockClosedIcon },

          ],
        },
        { name: "Profile", href: "/admin-dashboard/profile", icon: UserCircleIcon },
      ];
    } else {
      return [{ name: "Dashboard", href: "/dashboard", icon: HomeIcon }];
    }
  };

  const sidebarLinks = getLinks();

  return (
 <div
  className={`fixed top-0 left-0 h-full mt-14 bg-white shadow-lg border-r px-2 border-gray-200 transform transition-transform duration-300 ease-in-out z-40
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    w-64 md:w-20 lg:w-64 md:translate-x-0
  `}
>


      {/* Sidebar Links */}
      <nav className="mt-4 flex flex-col gap-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return link.children ? (
            <div key={link.name}>
              {/* Dropdown button */}
              <button
                onClick={() => toggleDropdown(link.name)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded text-left transition ${
                  active ? "bg-indigo-50 text-indigo-500 font-semibold" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 w-full">
                  {Icon && <Icon className="h-6 w-6" />}
                  <span className="inline md:hidden lg:inline">{link.name}</span>
                </div>
                <div className="flex items-center  md:hidden lg:flex">
                  {openDropdown === link.name ? (
                    <ChevronDownIcon className="h-5 w-5" />
                  ) : (
                    <ChevronRightIcon className="h-5 w-5" />
                  )}
                </div>
              </button>

              {/* Dropdown items */}
              {openDropdown === link.name &&
                link.children.map((child) => {
                  const ChildIcon = child.icon;
                  const childActive = isActive(child.href);
                  return (
                    <Link
                      key={child.name}
                      to={child.href}
                      onClick={handleLinkClick} // Close sidebar on mobile
                      className={`flex items-center my-2 gap-3 px-4 py-3 rounded transition ${
                        childActive
                          ? "bg-indigo-50 text-indigo-500 font-semibold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {ChildIcon && <ChildIcon className="h-6 w-6" />}
                      <span className="inline md:hidden lg:inline">{child.name}</span>
                    </Link>
                  );
                })}
            </div>
          ) : (
            <Link
              key={link.name}
              to={link.href}
              onClick={handleLinkClick} // Close sidebar on mobile
              className={`flex items-center gap-3 px-4 py-3 rounded transition ${
                active ? "bg-indigo-50 text-indigo-500 font-semibold" : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {Icon && <Icon className="h-6 w-6" />}
              <span className="inline md:hidden lg:inline">{link.name}</span>
            </Link>
          );
        })}

        {/* Logout */}
        <button
          className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full rounded mt-4 transition"
          onClick={() => {
            handleLogout();
            if (onClose) onClose(); // Close sidebar on mobile
          }}
        >
          <PowerIcon className="h-6 w-6" />
          <span className="inline md:hidden lg:inline">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default AdminSideNavbar;
