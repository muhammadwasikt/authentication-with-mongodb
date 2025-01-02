import React from "react";

const DashboardContent = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Total Users</h2>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        {/* Card 2 */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Active Projects</h2>
          <p className="text-3xl font-bold text-blue-600">57</p>
        </div>
        {/* Card 3 */}
        <div className="p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
          <p className="text-3xl font-bold text-blue-600">$12,345</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
