import { Navigate, useParams } from "react-router-dom";
import { Enrollment, StudentProfile, useUser } from "../../hooks/useUser";
import { UserRole } from "../../types/User";
import StudentCourseDetails from "./student/StudentCourseDetails";
import TeacherCourseDetails from "./teacher/TeacherCourseDetails";

const isStudentHasCourse = (student: StudentProfile | null, id: string | undefined): Enrollment | null => {
    return student?.enrollments.find((e) => e.course.id.toString() === id) || null;
};

export default function CourseDetails() {
    const { user } = useUser();
    const { id } = useParams();
    if (user?.role === UserRole.STUDENT) {
        const enrollment = isStudentHasCourse(user.student, id);
        if (enrollment) {
            return <StudentCourseDetails enrollment={enrollment} />;
        }
    } else if (user?.role === UserRole.TEACHER) {
        return <TeacherCourseDetails />;
    } else {
        return <Navigate to="/404" replace />;
    }
}
