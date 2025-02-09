import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types/Account";
import NotFound from "../NotFound";
import CourseManagerDashboard from "./course/CourseManagerDashboard";
import TeacherManagerDashboard from "./teacher/TeacherManagerDashboard";

export default function ManagerDashboard() {
    const { account } = useAuth();
    switch (account?.role) {
        case UserRole.TEACHER_MANAGER:
            return <TeacherManagerDashboard />;
        case UserRole.COURSE_MANAGER:
            return <CourseManagerDashboard />;
        default:
            return <NotFound />;
    }
}
