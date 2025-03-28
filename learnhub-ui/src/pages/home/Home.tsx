import { Navigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { UserRole } from "../../types/User";
import TeacherHome from "./teacher/TeacherHome";
import AdminHome from "./admin/AdminHome";
import CourseManagerHome from "./manager/CourseManagerHome";

export default function Home() {
    const { user } = useUser();
    switch (user?.role) {
        case UserRole.STUDENT:
            return <Navigate to="/home/courses" replace />;
        case UserRole.TEACHER:
            return <TeacherHome />;
        case UserRole.ADMIN:
            return <AdminHome />;
        case UserRole.COURSE_MANAGER:
            return <CourseManagerHome />;
        default:
            return <Navigate to="/login" replace />;
    }
}
