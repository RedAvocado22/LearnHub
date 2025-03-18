import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { UserRole } from "../../types/User";
import StudentHome from "./student/StudentHome";
import TeacherHome from "./teacher/TeacherHome";
import AdminHome from "./admin/AdminHome";

export default function Home() {
    const { user } = useUser();
    switch (user?.role) {
        case UserRole.STUDENT:
            return <StudentHome />;
        case UserRole.TEACHER:
            return <TeacherHome />;
        case UserRole.ADMIN:
            return <AdminHome />;
        default:
            return <Navigate to="/login" replace />;
    }
}
