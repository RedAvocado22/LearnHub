import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../types/Account";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
    roles?: UserRole[];
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
    const { account } = useAuth();
    if (!account) {
        return <Navigate to="/login" replace />;
    }
    if (roles && !roles.includes(account.role)) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
