import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/user.jsx";
import Admin from "./components/Admin/admin.jsx";
import HomePage from "./components/Home/homePage.jsx";
import DashBoard from "./components/Admin/Content/dashBoard.jsx";
import ManageUser from "./components/Admin/Content/manageUser.jsx";
import Login from "./components/Admin/Content/Auth/login.jsx";
import SignUp from "./components/Admin/Content/Auth/signUp.jsx";

const Layout = () => {
    return (
        <>
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Layout;