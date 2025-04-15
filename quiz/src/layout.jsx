import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User/user.jsx";
import Admin from "./components/Admin/admin.jsx";
import HomePage from "./components/Home/homePage.jsx";
import DashBoard from "./components/Admin/Content/dashBoard.jsx";
import ManageUser from "./components/Admin/Content/manageUser.jsx";
import Login from "./components/Admin/Content/Auth/login.jsx";
import SignUp from "./components/Admin/Content/Auth/signUp.jsx";
import QuizList from "./components/User/quizList.jsx";
import DetailQuiz from "./components/User/detailQuiz.jsx";
import NotFound from "./components/NotFound/notFound.jsx";
import ManageQuiz from "./components/Admin/Content/Quiz/manageQuiz.jsx";

const Layout = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="/user" element={<QuizList />} />
                    </Route>
                    <Route path="/quiz/:id" element={<DetailQuiz />} />
                    <Route path="/admin" element={<Admin />}>
                        <Route index element={<DashBoard />} />
                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path="manage-quizzes" element={<ManageQuiz />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Layout;