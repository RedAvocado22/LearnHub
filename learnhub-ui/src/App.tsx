import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
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
    FAQ,
    About,
    ContactList,
    ContactDetails,
    UserList,
    UserDetails,
    AddUser
} from "./pages";
import GuestRoute from "./routers/GuestRoute";
import ProtectedRoute from "./routers/ProtectedRoute";
import Dummy from "./pages/Dummy";
import { ToastContainer } from "react-toastify";
import { UserRole } from "./types/User";
import UserProvider from "./hooks/useUser";
import ContactsProvider from "./hooks/useContacts";

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
                <Route path="/teacher/:id" element={<TeacherDetails />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />

                {/* Routes for unauthenticated users */}
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/manager/login" element={<ManagerLogin />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Route>

                {/* Routes for authenticated users */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<UserProfile />} />
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.TEACHER_MANAGER]} />}>
                    <Route
                        element={
                            <ContactsProvider>
                                <Outlet />
                            </ContactsProvider>
                        }>
                        <Route path="/manager/contacts" element={<ContactList />} />
                        <Route path="/manager/contacts/:id" element={<ContactDetails />} />
                    </Route>
                </Route>
                <Route element={<ProtectedRoute roles={[UserRole.TEACHER_MANAGER]} />}>
                    <Route path="/manager/users" element={<UserList />} />
                    <Route path="/manager/users/:id" element={<UserDetails />} />
                    <Route path="/manager/users/add" element={<AddUser />} />
                </Route>

                {/* Error Boundary */}
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </UserProvider>
    );
}
