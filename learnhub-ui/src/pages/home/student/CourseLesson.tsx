import { ChapterMaterial } from "../../../hooks/useUser";

interface CourseLessonProps {
    material: ChapterMaterial;
}

export default function CourseLesson({ material }: CourseLessonProps) {
    return (
        <>
            <div className="mb-4">
                <h3>{material.name}</h3>
            </div>

            <div className="embed-responsive embed-responsive-16by9 mb-4">
                <video
                    preload="metadata"
                    key={material.lesson?.videoUrl}
                    className="embed-responsive-item"
                    controls
                    title={material.name}>
                    {material.lesson && (
                        <source
                            src={`http://d3dpldjcl8ur47.cloudfront.net/${material.lesson.videoUrl}`}
                            type="video/mp4"
                        />
                    )}
                    Your browser does not support the video tag.
                </video>
            </div>

            <div className="mb-4">
                <h5>Description</h5>
                <p>{material.description}</p>
            </div>
            <div className="mb-4">
                <h5>Materials</h5>
                <ul className="list-unstyled" data-toggle="tooltip" data-placement="top" title="Download">
                    {material.lesson?.materials.map((m, idx) => (
                        <li key={idx}>
                            <a
                                href={`https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${m.fileUrl}`}
                                download
                                target="_blank"
                                type="button"
                                className="link"
                                style={{
                                    textDecoration: "underline"
                                }}>
                                {m.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
