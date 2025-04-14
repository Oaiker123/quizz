import React, { useEffect, useState } from "react";
import Header from "./components/Header/header.jsx";
import { Outlet } from "react-router-dom";
import "./index.css";

const App = () => {
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
    <div>
      <Header />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
