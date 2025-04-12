import { Link } from "react-router-dom";
import { Course, useUser } from "../../../hooks/useUser";
import { HomeLayout } from "../../../layouts";
import placeholder from "/assets/images/blog/default/thum1.jpg";
import avaPlaceholder from "/assets/images/testimonials/default.jpg";
import { EnrollmentStatus, MaterialType } from "../../../types/Course";

const countMaterials = (course: Course): { lessonCount: number; quizCount: number } => {
    let lessonCount = 0;
    let quizCount = 0;

    course.chapters.forEach((c) => {
        c.materials.forEach((m) => {
            if (m.type === MaterialType.LESSON) {
                lessonCount++;
            } else if (m.type === MaterialType.QUIZ) {
                quizCount++;
            }
        });
    });

    return { lessonCount, quizCount };
};

export default function StudentCourseList({ status }: { status: string }) {
    const { user } = useUser();
    if (!user?.student) {
        return null;
    }
    const enrolls = user.student.enrollments.filter((e) => {
        if (status === "progress") {
            return e.status === EnrollmentStatus.IN_PROGRESS;
        } else if (status === "finished") {
            return e.status === EnrollmentStatus.FINISHED;
        }
        return true;
    });
    return (
        <HomeLayout>
            <div
                className="container-fluid "
                style={{ marginTop: "80px", maxHeight: "calc(100vh - 80px)", padding: "0 100px" }}>
                <h1>{status === "progress" ? "In Progress" : status === "finished" ? "Finished" : "All"}</h1>
                <ul>
                    {enrolls.map((e, idx) => {
                        const { lessonCount, quizCount } = countMaterials(e.course);
                        const total = lessonCount + quizCount;
                        const progress = total > 0 ? Math.floor((e.finishedMaterials.length / total) * 100) : 0;
                        return (
                            <li key={idx} className="row px-0 shadow p-4 mb-4" style={{ borderRadius: "10px" }}>
                                <div className="col-3">
                                    <img
                                        src={
                                            e.course.image
                                                ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${e.course.image}`
                                                : placeholder
                                        }
                                        loading="lazy"
                                        style={{
                                            objectFit: "cover",
                                            width: "100%",
                                            height: "100%",
                                            borderRadius: "10px"
                                        }}
                                    />
                                </div>
                                <div className="col-9">
                                    <div className="row d-flex flex-column" style={{ gap: "8px" }}>
                                        <div className="col-12 p-0">
                                            <h1 className="m-0" style={{ fontSize: "30px" }}>
                                                {e.course.name}
                                            </h1>
                                        </div>
                                        <ul className="col-12 p-0 list-unstyled d-flex " style={{ gap: "100px" }}>
                                            <li className="d-flex align-items-center" style={{ gap: "6px" }}>
                                                <img
                                                    src={
                                                        e.course.teacher.avatar
                                                            ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${e.course.teacher.avatar}`
                                                            : avaPlaceholder
                                                    }
                                                    loading="lazy"
                                                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                                />
                                                <span>{e.course.teacher.fullName}</span>
                                            </li>
                                            <li className="d-flex align-items-center" style={{ gap: "6px" }}>
                                                <i className="fa fa-book" aria-hidden="true"></i>
                                                <span>{lessonCount} lessons</span>
                                            </li>
                                            <li className="d-flex align-items-center" style={{ gap: "6px" }}>
                                                <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                                <span>{quizCount} quizzes</span>
                                            </li>
                                        </ul>
                                        <div className="row col-12 align-items-center ">
                                            <div className="progress col-9 p-0">
                                                <div
                                                    className="progress-bar "
                                                    role="progressbar"
                                                    style={{ width: `${progress}%` }}
                                                    aria-valuenow={progress}
                                                    aria-valuemin={0}
                                                    aria-valuemax={100}
                                                />
                                            </div>
                                            <div className="col-3">
                                                <Link to={`/home/courses/${e.course.id}`} className="btn btn-primary">
                                                    {e.status === EnrollmentStatus.FINISHED
                                                        ? "Review Course"
                                                        : "Continue Course"}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </HomeLayout>
    );
}
