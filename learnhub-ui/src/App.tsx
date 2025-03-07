import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
    NotFound,
    Landing,
    Login,
    ManagerLogin,
    Register,
    Unauthorized,
    ForgotPassword,
    ResetPassword,
    CourseList,
    TeacherDetails,
    ContactUs,
    Home,
    UserProfile,
    Mailbox,
    FAQ,
    About,
    CourseQuiz,
    DoQuiz,
    QuizResult
} from "./pages";
import GuestRoute from "./routers/GuestRoute";
import ProtectedRoute from "./routers/ProtectedRoute";
import Dummy from "./pages/Dummy";
import { ToastContainer } from "react-toastify";
import { UserRole } from "./types/User";
import UserProvider from "./hooks/useUser";

export default function App() {
    const [isLoading, setLoading] = useState(true);
    function fakeRequest() {
        return new Promise<void>((resolve) => setTimeout(() => resolve(), 1000));
    }

    useEffect(() => {
        fakeRequest().then(() => {
            const loadingIcon = document.querySelector("#loading-icon-bx");
            if (loadingIcon) {
                loadingIcon.remove();
            }
            setLoading(false);
        });
    }, []);
    if (isLoading) {
        return null;
    }

    return (
        <UserProvider>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route path="/dummy" element={<Dummy />} />
                </Route>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/activate/:token" element={<Login />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/teacher/:id" element={<TeacherDetails />}></Route>
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />

                {/* Routes for unauthenticated users */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<GuestRoute />}>
                    <Route path="/manager/login" element={<ManagerLogin />} />
                </Route>
                <Route element={<GuestRoute />}>
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<GuestRoute />}>
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>
                <Route element={<GuestRoute />}>
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Route>

                {/* Routes for authenticated users */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<UserProfile />}></Route>
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.TEACHER_MANAGER]} />}>
                    <Route path="/manager/mailbox" element={<Mailbox />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.STUDENT]} />}>
                    <Route path="/quiz/:qid" element={<CourseQuiz />} />
                    <Route path="/quiz/:qid/do-quiz" element={<DoQuiz />} />
                    <Route path="/quiz/result/:id" element={<QuizResult />} />
                </Route>

                {/* Error Boundary */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </UserProvider>
    );
}
