import { Link } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import { ChapterMaterial, Course, FinishedMaterial } from "../../hooks/useUser";
import { MaterialType } from "../../types/Course";

interface LearningLayoutProps {
    children: React.ReactNode;
    course: Course;
    context: {
        chapterIdx: number;
        materialIdx: number;
        material: ChapterMaterial;
    };
    setContext: React.Dispatch<
        React.SetStateAction<{
            chapterIdx: number;
            materialIdx: number;
            material: ChapterMaterial;
        } | null>
    >;
    finished: FinishedMaterial[];
}

export default function LearningLayout({ children, course, context, setContext, finished }: LearningLayoutProps) {
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
                            <h4 className="mb-4">
                                <Link to={`/home/courses/${course.id}`}>{course.name}</Link>
                            </h4>
                            {course.chapters.map((chapter, chapterIdx) => (
                                <div key={chapter.id} className="mb-4">
                                    <h6 className="font-weight-bold">
                                        Chapter {chapterIdx + 1}: {chapter.name}
                                    </h6>
                                    <div className="list-group">
                                        {chapter.materials.map((material, materialIdx) => (
                                            <Link
                                                key={material.id}
                                                to={`/home/courses/${course.id}/materials/${material.id}`}
                                                onClick={() => setContext({ chapterIdx, materialIdx, material })}
                                                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center shadow-sm btn mb-1 ${context.material.id === material.id ? "active" : ""}`}>
                                                <div>
                                                    <i
                                                        className={`${material.type === MaterialType.LESSON ? `ti-video-clapper` : `ti-help`} mr-2`}
                                                    />
                                                    <span className="text-truncate mr-2">{material.name}</span>
                                                </div>
                                                {finished.some((m) => m.materialId === material.id) && (
                                                    <i className="fa fa-check" aria-hidden="true"></i>
                                                )}
                                            </Link>
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
                        {children}
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
