import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserRole } from "../../types/Account";
import StudentHome from "./StudentHome";
import TeacherHome from "./TeacherHome";
import TeacherManagerHome from "./TeacherManagerHome";

export default function Home() {
    const { account } = useAuth();
    switch (account?.role) {
        case UserRole.STUDENT:
            return <StudentHome />;
        case UserRole.TEACHER:
            return <TeacherHome />;
        case UserRole.TEACHER_MANAGER:
            return <TeacherManagerHome />;
        default:
            return <Navigate to="/login" replace />;
    }
}
