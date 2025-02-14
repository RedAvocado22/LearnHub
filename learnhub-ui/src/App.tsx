import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
    NotFound,
    Home,
    Login,
    Register,
    Unauthorized,
    ForgotPassword,
    ResetPassword,
    StudentDashboard,
    TeacherDashboard,
    CourseList,
    TeacherDetail
} from "./pages";
import { ManagerDashboard, ManagerLogin } from "./pages/manager";
import GuestRoute from "./routers/GuestRoute";
import ProtectedRoute from "./routers/ProtectedRoute";
import Dummy from "./pages/Dummy";
import AuthProvider from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { UserRole } from "./types/Account";
import ContactUs from "./pages/ContactUs";
import { DashboardLayout } from "./layouts";
import Mailbox from "./pages/manager/teacher/Mailbox";
import UserProfile from "./pages/UserProfile";

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
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/test"
                    element={
                        <DashboardLayout>
                            <></>
                        </DashboardLayout>
                    }
                />

                <Route path="/activate/:token" element={<Login />} />
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route path="/user-profile" element={<UserProfile />}></Route>
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
                <Route path="/teacher-profile/:id" element={<TeacherDetail />}></Route>
                <Route path="/contact" element={<ContactUs />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/dummy" element={<Dummy />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.STUDENT]} />}>
                    <Route path="/learning" element={<StudentDashboard />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.TEACHER]} />}>
                    <Route path="/dashboard" element={<TeacherDashboard />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.TEACHER_MANAGER, UserRole.COURSE_MANAGER]} />}>
                    <Route path="/manager/dashboard" element={<ManagerDashboard />} />
                </Route>
                <Route path="/courses" element={<CourseList />} />
                <Route element={<ProtectedRoute roles={[UserRole.TEACHER_MANAGER]} />}>
                    <Route path="/manager/mailbox" element={<Mailbox />} />
                </Route>
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </AuthProvider>
    );
}
