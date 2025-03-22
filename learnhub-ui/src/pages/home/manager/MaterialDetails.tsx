import { Link, useParams } from "react-router-dom";
import { ChapterMaterial, Course, CourseChapter, useUser } from "../../../hooks/useUser";
import NotFound from "../../error/NotFound";
import { HomeLayout } from "../../../layouts";
import { MaterialType } from "../../../types/Course";
import LessonDetails from "./LessonDetails";
import QuizDetails from "./QuizDetails";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

const findMaterial = (
    id: number,
    course: Course | undefined
): { course: Course; chapter: CourseChapter; material: ChapterMaterial } | null => {
    if (!course) {
        return null;
    }

    for (const chapter of course.chapters) {
        for (const material of chapter.materials) {
            if (material.id === id) {
                return { course, chapter, material };
            }
        }
    }

    return null;
};

export default function MaterialDetails() {
    const id = useParams().id;
    const courseId = useParams().cid;
    const [course, setCourse] = useState<Course>();

    useEffect(() => {
        API.get(`courses/managers/${courseId}`)
            .then((resp) => setCourse(resp.data))
            .catch((err) => {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            });
    }, [courseId]);

    const material = course?.chapters
        .flatMap((chapter) => chapter.materials)
        .find((material) => material.id.toString() === id);

    const result = findMaterial(parseInt(id || "0"), course);

    console.log(course);

    if (!result) {
        return <NotFound />;
    }

    let display = null;
    if (material?.type === MaterialType.LESSON) {
        display = <LessonDetails context={result} />;
    } else if (material?.type === MaterialType.QUIZ) {
        display = <QuizDetails context={result} />;
    }

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">{material?.name}</h4>
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
