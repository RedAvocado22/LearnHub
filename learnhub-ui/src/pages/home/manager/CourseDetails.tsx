import { HomeLayout } from "../../../layouts";
import { CourseStatus } from "../../../types/Course";
import NotFound from "../../error/NotFound";
import defaultThumbnail from "/assets/images/blog/default/thum1.jpg";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import { Course } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import CourseCurriculum from "./CourseCurriculum";
import { isAxiosError } from "axios";

export const ManagerCourseDetail: React.FC = () => {
    const { id } = useParams();
    const [course, setCourse] = useState<Course | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        API.get(`courses/manager/${id}`)
            .then((resp) => setCourse(resp?.data))
            .catch((err) => toast.error(err.response?.data || "Something went wrong"));
    }, [id]);

    const currImage = course?.image
        ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${course.image}`
        : defaultThumbnail;

    const handleSave = async (newStatus: CourseStatus) => {
        try {
            const resp = await API.put(`courses/manager`, {
                id: course?.id,
                status: newStatus
            });

            if (resp.status === 200) {
                toast.success("Course updated successfully");
                navigate("/manager/courses");
            }
        } catch (error) {
            if (isAxiosError(error)) {
                toast.error(error.response?.data || "Failed to update course");
            }
        }
    };

    if (!course) {
        return <NotFound />;
    }

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="page-content bg-white">
                        <div className="content-block">
                            <div className="section-area">
                                <div className="row d-flex flex-row-reverse">
                                    <div className="col-lg-12 col-md-8 col-sm-12">
                                        <div className="courses-post">
                                            <div className="ttr-post-media media-effect">
                                                <img src={currImage} alt="Course Thumbnail" />
                                            </div>
                                            <div className="ttr-post-info">
                                                <div className="ttr-post-title ">
                                                    <div className="ml-auto d-flex justify-content-between align-items-center">
                                                        <h2 className="post-title">{course.name}</h2>
                                                        {course.status === CourseStatus.PENDING && (
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    className="btn mr-3"
                                                                    onClick={() => handleSave(CourseStatus.PUBLIC)}>
                                                                    Accept course
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    className="btn red"
                                                                    onClick={() => handleSave(CourseStatus.PRIVATE)}>
                                                                    Decline course
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="courese-overview" id="overview">
                                            <h4>Overview</h4>
                                            <div className="row">
                                                <div className="col-md-12 col-lg-4">
                                                    <ul className="course-features">
                                                        <li>
                                                            <i className="ti-book"></i>{" "}
                                                            <span className="label">Lectures</span>{" "}
                                                            <span className="value">8</span>
                                                        </li>
                                                        <li>
                                                            <i className="ti-help-alt"></i>{" "}
                                                            <span className="label">Quizzes</span>{" "}
                                                            <span className="value">1</span>
                                                        </li>
                                                        <li>
                                                            <i className="ti-user"></i>{" "}
                                                            <span className="label">Students</span>{" "}
                                                            <span className="value">32</span>
                                                        </li>
                                                        <li>
                                                            <i className="ti-pencil"></i>{" "}
                                                            <span className="label">Category</span>{" "}
                                                            <span className="value">{course.category.name}</span>
                                                        </li>
                                                        <li>
                                                            <i className="ti-money"></i>{" "}
                                                            <span className="label">Price</span>{" "}
                                                            <span className="value">
                                                                {course.price > 0 ? `$${course.price}` : "FREE"}
                                                            </span>
                                                        </li>
                                                        <li>
                                                            <i className="ti-check-box"></i>{" "}
                                                            <span className="label">Status</span>{" "}
                                                            <span className="value">{course.status}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-12 col-lg-8">
                                                    <h5 className="m-b5">Course Description</h5>
                                                    <p>{course.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <CourseCurriculum course={course} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
};

export default ManagerCourseDetail;
