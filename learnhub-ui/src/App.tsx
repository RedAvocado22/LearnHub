import "react-toastify/ReactToastify.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { NotFound, Home, Login, Register, Unauthorized, ForgotPassword, ResetPassword } from "./pages";
import GuestRoute from "./routers/GuestRoute";
import ProtectedRoute from "./routers/ProtectedRoute";
import Dummy from "./pages/Dummy";
import AuthProvider from "./hooks/useAuth";
import { ToastContainer } from "react-toastify";

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
                <Route path="/activate/:token" element={<Login />} />
                <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
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
                <Route element={<ProtectedRoute />}>
                    <Route path="/dummy" element={<Dummy />} />
                </Route>
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/*" element={<NotFound />} />
            </Routes>
            <ToastContainer position="top-right" style={{ zIndex: 999999 }} />
        </AuthProvider>
    );
}
