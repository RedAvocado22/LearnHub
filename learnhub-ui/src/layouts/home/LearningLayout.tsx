import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HomeLayout } from "../../../layouts";

interface Lesson {
    id: string;
    title: string;
    videoUrl: string;
    description: string;
    duration: number;
    isCompleted: boolean;
}

interface Chapter {
    id: string;
    title: string;
    lessons: Lesson[];
}

interface Course {
    id: string;
    title: string;
    chapters: Chapter[];
}

interface LearningLayoutProps {
    children: React.ReactNode;
}

export default function LearningLayout({ children }: LearningLayoutProps) {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const mockCourse: Course = {
                    id: "1",
                    title: "Introduction to Web Development",
                    chapters: [
                        {
                            id: "1",
                            title: "Getting Started",
                            lessons: [
                                {
                                    id: "1",
                                    title: "Course Overview",
                                    videoUrl: "https://www.youtube.com/embed/ugTluz9d3eg",
                                    description: "Welcome to the course! In this lesson...",
                                    duration: 300,
                                    isCompleted: false
                                }
                            ]
                        }
                    ]
                };

                setCourse(mockCourse);
                setIsLoading(false);
            } catch (error) {
                toast.error("Failed to load course content");
                setIsLoading(false);
            }
        };

        fetchCourse();
    }, [courseId]);

    const handleLessonComplete = async () => {
        try {
            toast.success("Lesson completed!");

            if (course && currentLesson) {
                const updatedCourse = { ...course };
                updatedCourse.chapters[currentChapterIndex].lessons[currentLessonIndex].isCompleted = true;
                setCourse(updatedCourse);
            }
        } catch (error) {
            toast.error("Failed to mark lesson as completed");
        }
    };

    const navigateToNextLesson = () => {
        if (!course) return;

        const currentChapter = course.chapters[currentChapterIndex];
        if (currentLessonIndex < currentChapter.lessons.length - 1) {
            const nextLesson = currentChapter.lessons[currentLessonIndex + 1];
            setCurrentLessonIndex(currentLessonIndex + 1);
            setCurrentLesson(nextLesson);
            navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
        } else if (currentChapterIndex < course.chapters.length - 1) {
            const nextChapter = course.chapters[currentChapterIndex + 1];
            const nextLesson = nextChapter.lessons[0];
            setCurrentChapterIndex(currentChapterIndex + 1);
            setCurrentLessonIndex(0);
            setCurrentLesson(nextLesson);
            navigate(`/course/${courseId}/lesson/${nextLesson.id}`);
        } else {
            toast.info("You have completed all lessons!");
        }
    };

    if (isLoading) {
        return <div className="d-flex justify-content-center p-5">Loading...</div>;
    }

    if (!course) {
        return <div className="text-center p-5">Course not found</div>;
    }

    return (
        <HomeLayout>
            <div
                className="container-fluid border-top "
                style={{
                    marginTop: "70px"
                }}>
                <div className="row">
                    <div
                        className="col-md-3 bg-light border-right  overflow-auto"
                        style={{
                            minHeight: "calc(100vh - 80px)"
                        }}>
                        <div className="p-3">
                            <h4 className="mb-4">{course.title}</h4>
                            {course.chapters.map((chapter, chapterIdx) => (
                                <div key={chapter.id} className="mb-4">
                                    <h6 className="font-weight-bold">
                                        Chapter {chapterIdx + 1}: {chapter.title}
                                    </h6>
                                    <div className="list-group">
                                        {chapter.lessons.map((lesson, lessonIdx) => (
                                            <button
                                                key={lesson.id}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center shadow-sm  btn ${
                                                    currentLesson?.id === lesson.id ? "active" : ""
                                                }`}
                                                onClick={() => {
                                                    setCurrentChapterIndex(chapterIdx);
                                                    setCurrentLessonIndex(lessonIdx);
                                                    setCurrentLesson(lesson);
                                                    navigate(`/course/${courseId}/lesson/${lesson.id}`);
                                                }}>
                                                <span className="text-truncate mr-2">{lesson.title}</span>
                                                {lesson.isCompleted && (
                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="col-md-9"
                        style={{
                            maxHeight: "calc(100vh - 80px)",
                            overflowY: "scroll"
                        }}>
                        {/* {currentLesson ? (
                            <div className="p-4">
                                <div className="mb-4">
                                    <h3>{currentLesson.title}</h3>
                                    <p className="text-muted">
                                        Duration: {Math.floor(currentLesson.duration / 60)} mins
                                    </p>
                                </div>

                                <div className="embed-responsive embed-responsive-16by9 mb-4">
                                    <iframe
                                        className="embed-responsive-item"
                                        src={currentLesson.videoUrl}
                                        allowFullScreen
                                        title={currentLesson.title}></iframe>
                                </div>

                                <div className="mb-4">
                                    <h5>Description</h5>
                                    <p>{currentLesson.description}</p>
                                </div>
                                <div className="mb-4">
                                    <h5>Materials</h5>
                                    <ul
                                        className="list-unstyled"
                                        data-toggle="tooltip"
                                        data-placement="top"
                                        title="Download">
                                        <li>
                                            <a
                                                type="button"
                                                className="link"
                                                style={{
                                                    textDecoration: "underline"
                                                }}>
                                                Material 1
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <button
                                        className={`btn btn-success ${currentLesson.isCompleted ? "disabled" : ""}`}
                                        onClick={handleLessonComplete}
                                        disabled={currentLesson.isCompleted}>
                                        {currentLesson.isCompleted ? "Completed" : "Mark as Complete"}
                                    </button>
                                    <button className="btn btn-primary" onClick={navigateToNextLesson}>
                                        Next Lesson →
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center p-5">Please select a lesson to begin</div>
                        )} */}
                        {children}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
