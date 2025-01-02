import React from "react";
import { FaHome, FaUser, FaChartBar, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="flex items-center justify-center h-16 text-blue-600 font-bold text-xl border-b">
        Dashboard
      </div>
      <ul className="mt-4 space-y-2">
        <li className="group flex items-center gap-4 p-3 hover:bg-blue-100">
          <FaHome className="text-gray-600 group-hover:text-blue-500" />
          <span className="text-gray-700 group-hover:text-blue-500">Home</span>
        </li>
        <li className="group flex items-center gap-4 p-3 hover:bg-blue-100">
          <FaUser className="text-gray-600 group-hover:text-blue-500" />
          <span className="text-gray-700 group-hover:text-blue-500">Profile</span>
        </li>
        <li className="group flex items-center gap-4 p-3 hover:bg-blue-100">
          <FaChartBar className="text-gray-600 group-hover:text-blue-500" />
          <span className="text-gray-700 group-hover:text-blue-500">Reports</span>
        </li>
        <li className="group flex items-center gap-4 p-3 hover:bg-blue-100">
          <FaCog className="text-gray-600 group-hover:text-blue-500" />
          <span className="text-gray-700 group-hover:text-blue-500">Settings</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
