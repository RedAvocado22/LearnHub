import { Navigate, useSearchParams } from "react-router-dom";
import { UserRole } from "../../types/User";
import { useUser } from "../../hooks/useUser";
import TeacherCourseList from "./teacher/TeacherCourseList";
import StudentCourseList from "./student/StudentCourseList";

export default function UserProfile() {
    const { user } = useUser();
    const [params] = useSearchParams();
    const status = params.get("status") || "all";
    if (user?.role === UserRole.STUDENT) {
        return <StudentCourseList status={status} />;
    } else if (user?.role === UserRole.TEACHER) {
        return <TeacherCourseList />;
    } else {
        return <Navigate to="/404" replace />;
    }
}
