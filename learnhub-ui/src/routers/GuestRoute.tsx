import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function GuestRoute() {
    const { user } = useUser();
    if (user) {
        return <Navigate to="/home" replace />;
    }
    return <Outlet />;
}
