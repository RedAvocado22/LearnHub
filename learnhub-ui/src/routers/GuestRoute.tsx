import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function GuestRoute() {
    const { account } = useAuth();
    if (account) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
