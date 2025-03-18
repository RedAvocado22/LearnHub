import { ChapterMaterial, Course, CourseChapter } from "../../../hooks/useUser";

interface LessonDetailsProps {
    context: { course: Course; chapter: CourseChapter; material: ChapterMaterial };
}

export default function LessonDetails({ context }: LessonDetailsProps) {
    if (!context.material.lesson) {
        return null;
    }

    return (
        <div className="row">
            <div className="col-12 mb-5">
                <div className="embed-responsive embed-responsive-16by9">
                    <video className="embed-responsive-item" controls>
                        <source
                            src={`http://d3dpldjcl8ur47.cloudfront.net/${context.material.lesson.videoUrl}`}
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className="col-12">
                <div className="ml-auto d-flex justify-content-between align-items-center">
                    <h3>1. Description</h3>
                </div>
                <div>
                    <p>{context.material.description}</p>
                </div>
            </div>
            <div className="seperator"></div>

            <div className="col-12 m-t20">
                <div className="ml-auto m-b5">
                    <h3>2. Materials</h3>
                </div>
            </div>
            <div className="col-12">
                <table id="item-add" style={{ width: "100%" }}>
                    <tbody>
                        {context.material.lesson.materials.map((m, index) => (
                            <tr key={index} className="list-item">
                                <td>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label className="col-form-label">Name</label>
                                            <div>{m.name}</div>
                                        </div>
                                        <div className="col-md-2">
                                            <label className="col-form-label">Download</label>
                                            <div className="form-group">
                                                <a
                                                    className="download"
                                                    target="_blank"
                                                    href={`https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${m.fileUrl}`}
                                                    download>
                                                    <i className="fa fa-download"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
