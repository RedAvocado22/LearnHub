import { Navigate } from "react-router-dom";
import { UserRole } from "../../types/User";
import { useUser } from "../../hooks/useUser";
import StudentProfile from "./student/StudentProfile";
import TeacherProfile from "./teacher/TeacherProfile";

export default function UserProfile() {
    const { user } = useUser();
    if (user?.role === UserRole.STUDENT) {
        return <StudentProfile />;
    } else if (user?.role === UserRole.TEACHER) {
        return <TeacherProfile />;
    } else {
        return <Navigate to="/404" replace />;
    }
}
