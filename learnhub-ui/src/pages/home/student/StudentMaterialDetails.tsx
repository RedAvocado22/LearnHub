import { ChapterMaterial, Enrollment, useUser } from "../../../hooks/useUser";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../../error/NotFound";
import { MaterialType } from "../../../types/Course";
import CourseLesson from "./CourseLesson";
import CourseQuiz from "./CourseQuiz";
import LearningLayout from "../../../layouts/home/LearningLayout";
import { toast } from "react-toastify";
import { API } from "../../../api";
import { useState } from "react";

interface LearningContext {
    chapterIdx: number;
    materialIdx: number;
    material: ChapterMaterial;
}

const findMaterial = (id: number, enrollment: Enrollment | null): LearningContext | null => {
    if (!enrollment) {
        return null;
    }
    for (let i = 0; i < enrollment.course.chapters.length; i++) {
        const chapter = enrollment.course.chapters[i];
        for (let j = 0; j < chapter.materials.length; j++) {
            const material = chapter.materials[j];
            if (material.id === id) {
                return { chapterIdx: i, materialIdx: j, material };
            }
        }
    }
    return null;
};

export default function StudentMaterialDetails() {
    const { cid, mid } = useParams();
    const id = parseInt(mid || "0");
    const { user, refreshUser } = useUser();
    const navigate = useNavigate();
    const enrollment: Enrollment | null =
        user?.student?.enrollments.find((e) => e.course.id.toString() === cid) || null;
    const [context, setContext] = useState<LearningContext | null>(findMaterial(id, enrollment));
    const handleLessonComplete = async () => {
        if (!enrollment || !user || !context?.material) return;
        try {
            const resp = await API.post(
                `/enrollments/students/${user.id}/courses/${enrollment.course.id}/materials/${context.material.id}`
            );
            if (resp.status === 200) {
                toast.success("Lesson completed!");
                refreshUser();
            }
        } catch (error) {
            toast.error("Failed to mark lesson as completed");
        }
    };

    const navigateToNextLesson = () => {
        if (!enrollment || !context) return;

        let chapterIdx = context.chapterIdx;
        let materialIdx = context.materialIdx;

        const currentChapter = enrollment.course.chapters[chapterIdx];
        if (!currentChapter) return;
        if (materialIdx < currentChapter.materials.length - 1) {
            const nextLesson = currentChapter.materials[materialIdx + 1];
            setContext({ ...context, materialIdx: materialIdx + 1, material: nextLesson });
            navigate(`/home/courses/${cid}/materials/${nextLesson.id}`);
            return;
        }

        while (chapterIdx < enrollment.course.chapters.length - 1) {
            chapterIdx++;
            const nextChapter = enrollment.course.chapters[chapterIdx];
            if (nextChapter.materials.length > 0) {
                const nextLesson = nextChapter.materials[0];
                setContext({ ...context, materialIdx: 0, material: nextLesson });
                navigate(`/home/courses/${cid}/materials/${nextLesson.id}`);
                return;
            }
        }
        toast.info("You have completed all lessons!");
    };

    if (!user || !user.student || isNaN(id) || !enrollment || !context) {
        return <NotFound />;
    }

    const isCompleted = enrollment.finishedMaterials.some((m) => m.materialId === context.material.id);

    let display = null;
    if (context.material.type === MaterialType.LESSON) {
        display = <CourseLesson material={context.material} />;
    } else if (context.material.type == MaterialType.QUIZ) {
        display = (
            <CourseQuiz course={enrollment.course} material={context.material} attempts={enrollment.quizAttempts} />
        );
    }

    return (
        <LearningLayout
            course={enrollment.course}
            context={context}
            setContext={setContext}
            finished={enrollment.finishedMaterials}>
            <div className="p-4">
                {display}
                <div className="d-flex justify-content-between align-items-center">
                    {context.material.type === MaterialType.LESSON && (
                        <button
                            className={`btn btn-success ${isCompleted ? "disabled" : ""}`}
                            onClick={handleLessonComplete}
                            disabled={isCompleted}>
                            {isCompleted ? "Completed" : "Mark as Complete"}
                        </button>
                    )}
                    {context.material.type === MaterialType.QUIZ && (
                        <Link
                            to={`/home/courses/${enrollment.course.id}/quizzes/${context.material.id}/do-quiz`}
                            className="btn">
                            Do Quiz
                        </Link>
                    )}
                    <button className="btn btn-primary" onClick={navigateToNextLesson}>
                        Next Lesson →
                    </button>
                </div>
            </div>
        </LearningLayout>
    );
}
