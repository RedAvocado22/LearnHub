import { Navigate } from "react-router-dom";
import { UserRole } from "../../types/User";
import { useUser } from "../../hooks/useUser";
import TeacherCourseList from "./teacher/TeacherCourseList";
import StudentCourseList from "./student/StudentCourseList";

export default function UserProfile() {
    const { user } = useUser();
    if (user?.role === UserRole.STUDENT) {
        return <StudentCourseList />;
    } else if (user?.role === UserRole.TEACHER) {
        return <TeacherCourseList />;
    } else {
        return <Navigate to="/404" replace />;
    }
}
