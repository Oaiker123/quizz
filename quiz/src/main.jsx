import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/user.jsx";
import Admin from "./components/Admin/admin.jsx";
import HomePage from "./components/Home/homePage.jsx";
import DashBoard from "./components/Admin/Content/dashBoard.jsx";
import ManageUser from "./components/Admin/Content/manageUser.jsx";
import { HeroUIProvider } from "@heroui/react";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/user" element={<User />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route index element={<DashBoard />} />
            <Route path="manage-user" element={<ManageUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HeroUIProvider>
  </StrictMode>
);
