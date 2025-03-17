import { Link, useParams } from "react-router-dom";
import { ChapterMaterial, Course, CourseChapter, useUser } from "../../../hooks/useUser";
import NotFound from "../../error/NotFound";
import { HomeLayout } from "../../../layouts";
import { CourseStatus, MaterialType } from "../../../types/Course";
import LessonDetails from "./LessonDetails";
import QuizDetails from "./QuizDetails";

const findMaterial = (
    id: number,
    courses: Course[]
): { course: Course; chapter: CourseChapter; material: ChapterMaterial } | null => {
    if (!courses || courses.length === 0) {
        return null;
    }
    for (const course of courses) {
        for (const chapter of course.chapters) {
            for (const material of chapter.materials) {
                if (material.id === id) {
                    return { course, chapter, material };
                }
            }
        }
    }
    return null;
};

export default function MaterialDetails() {
    const { user } = useUser();
    const { mid } = useParams();
    const id = parseInt(mid || "");
    if (!user || !user.teacher || isNaN(id)) {
        return <NotFound />;
    }
    const result = findMaterial(id, user.teacher.courses);
    if (!result) {
        return <NotFound />;
    }
    console.log(result);
    const { course, material } = result;
    let display = null;
    if (material.type === MaterialType.LESSON) {
        if (course.status === CourseStatus.PRIVATE) {
            display = <LessonDetails context={result} editable={true} />;
        } else {
            display = <LessonDetails context={result} editable={false} />;
        }
    } else if (material.type === MaterialType.QUIZ) {
        if (course.status === CourseStatus.PRIVATE) {
            display = <QuizDetails context={result} editable={true} />;
        } else {
            display = <QuizDetails context={result} editable={false} />;
        }
    }

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">{material.name}</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to={`/home/courses/${course.id}`}>
                                    <i className="fa fa-home"></i>Course
                                </Link>
                            </li>
                            <li>Material</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="widget-inner">{display}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
