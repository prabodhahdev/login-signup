import React, { useState } from "react";
import { MagnifyingGlassIcon, PencilIcon, TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";


const TABLE_HEAD = ["Member", "Email", "Phone", "Role", "Status", "Actions"];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    phone: "+1 234 567 890",
    role: "Manager",
    online: true,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    phone: "+1 987 654 321",
    role: "Programmer",
    online: false,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    phone: "+44 123 456 789",
    role: "Executive",
    online: false,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    phone: "+61 234 567 890",
    role: "Programmer",
    online: true,
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    phone: "+1 345 678 901",
    role: "Manager",
    online: false,
  },
];

const ViewAllUserTable = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filteredRows = TABLE_ROWS.filter(
    (row) =>
      row.name.toLowerCase().includes(search.toLowerCase()) ||
      row.email.toLowerCase().includes(search.toLowerCase()) ||
      row.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 bg-white shadow rounded-lg w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between mb-6 items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-500">Members List</h2>
          <p className="text-gray-500 text-sm sm:text-base">See information about all members</p>
        </div>
        
      </div>

      {/* Tabs and Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-2.5 text-gray-400" />
        </div>
         <button className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1 sm:py-2 bg-indigo-500 text-white rounded text-sm hover:bg-indigo-400">
            <UserPlusIcon className="h-4 w-4" /> Add Member
          </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left border-collapse min-w-[600px] sm:min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-2 sm:p-3 text-gray-500 text-xs sm:text-sm font-normal border-b">Member</th>
              <th className="p-2 sm:p-3 text-gray-500 text-xs sm:text-sm font-normal border-b">Email</th>
              <th className="p-2 sm:p-3 text-gray-500 text-xs sm:text-sm font-normal border-b hidden lg:block ">Phone</th>
              <th className="p-2 sm:p-3 text-gray-500 text-xs sm:text-sm font-normal border-b">Role</th>
              <th className="p-2 sm:p-3 text-gray-500 text-xs sm:text-sm font-normal border-b">Status</th>
              <th className="p-2 sm:p-3 text-gray-500 text-xs sm:text-sm font-normal border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, idx) => (
              <tr key={row.name} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-3">
                  <img src={row.img} alt={row.name} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover" />
                  <span className="text-gray-800 text-xs sm:text-sm hidden lg:block">{row.name}</span>
                </td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-700">{row.email}</td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-700 hidden lg:block">{row.phone}</td>
                <td className="p-2 sm:p-3 text-xs sm:text-sm text-gray-700">{row.role}</td>
                <td className="p-2 sm:p-3">
                  <span
                    className={`px-2 py-1 text-[10px] sm:text-xs rounded-full font-semibold ${
                      row.online ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {row.online ? "Online" : "Offline"}
                  </span>
                </td>
                <td className="p-2 sm:p-3 flex gap-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <PencilIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <TrashIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-0">
        <span className="text-gray-500 text-xs sm:text-sm">Page 1 of 10</span>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-xs sm:text-sm">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-xs sm:text-sm">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllUserTable;
