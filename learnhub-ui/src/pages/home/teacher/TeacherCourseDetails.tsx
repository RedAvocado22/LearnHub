import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { HomeLayout } from "../../../layouts";
import NotFound from "../../error/NotFound";
import { useState } from "react";
import { CourseStatus } from "../../../types/Course";
import UpdateCourseForm from "./UpdateCourseForm";
import defaultThumbnail from "/assets/images/blog/default/thum1.jpg";
import CourseCurriculum from "./CourseCurriculum";
import { toast } from "react-toastify";
import { API } from "../../../api";

export default function CourseDetails() {
    const { user, refreshUser } = useUser();
    const courses = user?.teacher?.courses || [];
    const { id } = useParams();
    const course = courses.find((course) => course.id.toString() === id);
    const [currImage, setCurrImage] = useState<string>(
        course?.image ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${course.image}` : defaultThumbnail
    );
    const navigate = useNavigate();

    const handleChangeStatus = async (status: CourseStatus) => {
        if (!course) return;
        try {
            const data = new FormData();
            data.append("metadata", new Blob([JSON.stringify({ status })], { type: "application/json" }));

            const resp = await API.put(`courses/${course.id}/teacher`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if (resp.status === 200) {
                toast.success("Update course status successfully");
                refreshUser();
                navigate("/home/courses");
            }
        } catch (err) {
            toast.error("Update course failed");
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
                                                <img
                                                    src={currImage}
                                                    alt="Course Thumbnail"
                                                    className="w-100"
                                                    style={{
                                                        height: "600px",
                                                        objectFit: "cover"
                                                    }}
                                                />
                                            </div>
                                            <div className="ttr-post-info">
                                                <div className="ttr-post-title ">
                                                    <div className="ml-auto d-flex justify-content-between align-items-center">
                                                        <h2 className="post-title">{course.name}</h2>
                                                        {course.status === CourseStatus.PRIVATE && (
                                                            <div>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleChangeStatus(CourseStatus.PENDING)
                                                                    }
                                                                    className="btn mr-3">
                                                                    Submit course
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                        handleChangeStatus(CourseStatus.CANCELLED)
                                                                    }
                                                                    className="btn red">
                                                                    Remove course
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
                                                    {course.status === CourseStatus.PRIVATE ? (
                                                        <UpdateCourseForm
                                                            course={course}
                                                            setPreviewImage={setCurrImage}
                                                        />
                                                    ) : (
                                                        <>
                                                            <h5 className="m-b5">Course Description</h5>
                                                            <p>{course.description}</p>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <CourseCurriculum
                                            course={course}
                                            editable={course.status === CourseStatus.PRIVATE}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
