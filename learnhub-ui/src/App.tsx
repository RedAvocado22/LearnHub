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
    Mailbox
} from "./pages";
import GuestRoute from "./routers/GuestRoute";
import ProtectedRoute from "./routers/ProtectedRoute";
import Dummy from "./pages/Dummy";
import { ToastContainer } from "react-toastify";
import { UserRole } from "./types/Account";
import UserProfile from "./pages/home/UserProfile";
import AuthProvider from "./hooks/useAuth";

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
                <Route element={<ProtectedRoute />}>
                    <Route path="/dummy" element={<Dummy />} />
                </Route>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/activate/:token" element={<Login />} />
                <Route path="/courses" element={<CourseList />} />
                <Route path="/teacher/:id" element={<TeacherDetails />}></Route>

                {/* Routes for unathenticated users */}
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

                {/* Error Boundary */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </AuthProvider>
    );
}
