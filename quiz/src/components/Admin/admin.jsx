import SideBar from "./SideBar";
// import "./Admin.scss";
import { FaBars } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const [collapsed, setCollapsed] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập delay khi tải trang (có thể thay bằng API logic thật)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <div className="">
        <SideBar collapsed={collapsed} />
      </div>
      <div className="w-full">
        <div className="admin-toggle cursor-pointer p-2">
          <FaBars onClick={() => setCollapsed(!collapsed)} />
        </div>
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Admin;
