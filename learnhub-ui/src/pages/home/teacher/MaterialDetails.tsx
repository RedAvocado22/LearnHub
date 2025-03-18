import { Link, useParams } from "react-router-dom";
import { ChapterMaterial, Course, CourseChapter, useUser } from "../../../hooks/useUser";
import NotFound from "../../error/NotFound";
import { HomeLayout } from "../../../layouts";
import { CourseStatus, MaterialType } from "../../../types/Course";
import LessonDetails from "./LessonDetails";
import QuizDetails from "./QuizDetails";
import { useEffect, useState } from "react";

const findMaterial = (
    id: number,
    courses: Course[] | undefined | null
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
    const [context, setContext] = useState<{
        course: Course;
        chapter: CourseChapter;
        material: ChapterMaterial;
    } | null>(null);
    const id = parseInt(mid || "");
    useEffect(() => {
        setContext(findMaterial(id, user?.teacher?.courses));
    }, [user]);
    if (!user || !user.teacher || isNaN(id) || !context) {
        return <NotFound />;
    }
    const { course, material } = context;
    let display = null;
    if (material.type === MaterialType.LESSON) {
        if (course.status === CourseStatus.PRIVATE) {
            display = <LessonDetails context={context} editable={true} />;
        } else {
            display = <LessonDetails context={context} editable={false} />;
        }
    } else if (material.type === MaterialType.QUIZ) {
        if (course.status === CourseStatus.PRIVATE) {
            display = <QuizDetails context={context} editable={true} />;
        } else {
            display = <QuizDetails context={context} editable={false} />;
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
