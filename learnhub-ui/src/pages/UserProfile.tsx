import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { UserRole } from "../types/Account";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";

export default function UserProfile() {
    const { account } = useAuth();
    if (account?.role === UserRole.STUDENT) {
        return <StudentProfile />;
    } else if (account?.role === UserRole.TEACHER) {
        return <TeacherProfile />;
    } else {
        return <Navigate to="/404" replace />;
    }
}
