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
import ManageQuiz from "./components/Admin/Content/Quizz/manageQuiz.jsx";
import Question from "./components/Admin/Content/Question/question.jsx";
import PrivateRoute from "./Routes/privateRoute.jsx";
import { Suspense } from "react";
import Setting from "./components/User/Setting.jsx";

const Layout = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />}>
                        <Route index element={<HomePage />} />
                        <Route path="/user" element={

                            <PrivateRoute>
                                <QuizList />
                            </PrivateRoute>
                            
                        } />
                        <Route path="/setting" element={<Setting />} />
                    </Route>
                    <Route path="/quiz/:id" element={<DetailQuiz />} />
                    <Route path="/admin" element={
                        
                        <PrivateRoute>
                            <Admin />
                        </PrivateRoute>
                        
                    }>
                        <Route index element={<DashBoard />} />
                        <Route path="manage-user" element={<ManageUser />} />
                        <Route path="manage-quizzes" element={<ManageQuiz />} />
                        <Route path="manage-question" element={<Question />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </Suspense>
    )
}

export default Layout;