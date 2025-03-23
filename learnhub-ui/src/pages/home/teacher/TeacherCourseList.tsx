import { useState } from "react";
import { Course, useUser } from "../../../hooks/useUser";
import { HomeLayout } from "../../../layouts";
import { CourseStatus } from "../../../types/Course";
import { API } from "../../../api";
import { Link, useSearchParams } from "react-router-dom";

export default function TeacherCourseList() {
    const { user, refreshUser } = useUser();
    const [params] = useSearchParams();
    const status = params.get("status") || "all";
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const handleEditClick = (course: Course) => {
        setEditingCourse(course);
    };

    const handleSave = async (newStatus: CourseStatus) => {
        try {
            if (!editingCourse) return;

            const updatedCourse: Course = { ...editingCourse, status: newStatus };
            const data = new FormData();
            data.append(
                "metadata",
                new Blob([JSON.stringify({ status: updatedCourse.status })], { type: "application/json" })
            );

            await API.put(`courses/${updatedCourse.id}/teacher`, data, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            refreshUser();
            setEditingCourse(null);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleCancel = () => {
        setEditingCourse(null);
    };

    user?.teacher?.courses.map((course) => {
        console.log(course);
    });

    const filteredCourses =
        status === "all"
            ? user?.teacher?.courses
            : user?.teacher?.courses.filter((course) => {
                  return course.status.toString().toLowerCase() === status!.toLowerCase();
              });

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="page-content bg-white">
                    <div className="content-block">
                        <div className="section-area section-sp1 p-0">
                            <div className="container">
                                <div className="row">
                                    <ul
                                        className="ttr-gallery-listing magnific-image row"
                                        style={{ minWidth: "1200px" }}>
                                        {filteredCourses &&
                                            filteredCourses.map((course: Course) => (
                                                <div
                                                    key={course.id}
                                                    className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 publish m-b30">
                                                    <div className="cours-bx">
                                                        <div className="action-box" style={{ maxHeight: "222px" }}>
                                                            <img
                                                                src={
                                                                    course.image
                                                                        ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${course.image}`
                                                                        : "/assets/images/courses/pic1.jpg"
                                                                }
                                                                style={{ height: "222px", objectFit: "cover" }}
                                                                alt="Course Image"
                                                            />
                                                            <div className="button-container">
                                                                <button
                                                                    onClick={() => handleEditClick(course)}
                                                                    className="btn">
                                                                    Edit
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="info-bx text-center edit-course-container">
                                                            {editingCourse?.id === course.id ? (
                                                                <div>
                                                                    {editingCourse.status === "PRIVATE" && (
                                                                        <div className="button-container">
                                                                            <Link
                                                                                to={`/home/courses/${course.id}`}
                                                                                className="btn m-b15 mr-2">
                                                                                Add Material
                                                                            </Link>
                                                                            <button
                                                                                onClick={handleCancel}
                                                                                className="btn m-b15">
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {editingCourse.status === "PUBLIC" && (
                                                                        <div className="button-container">
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleSave(CourseStatus.PRIVATE)
                                                                                }
                                                                                className="btn m-b15 m-r15">
                                                                                Update Course
                                                                            </button>
                                                                            <button
                                                                                onClick={handleCancel}
                                                                                className="btn m-b15">
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {editingCourse.status === "CANCELLED" && (
                                                                        <div className="button-container">
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleSave(CourseStatus.PRIVATE)
                                                                                }
                                                                                className="btn m-b15 m-r15">
                                                                                Reactivate Course
                                                                            </button>
                                                                            <button
                                                                                onClick={handleCancel}
                                                                                className="btn m-b15">
                                                                                Cancel
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                    {editingCourse.status === "PENDING" && (
                                                                        <div className="button-container">
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleSave(CourseStatus.PRIVATE)
                                                                                }
                                                                                className="btn m-b15 m-r15">
                                                                                Cancel Submission
                                                                            </button>
                                                                            <button
                                                                                onClick={handleCancel}
                                                                                className="btn m-b15">
                                                                                Cancels
                                                                            </button>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    <div className="d-flex justify-content-center align-baseline mb-0">
                                                                        <h5 className="mb-0">{course.name}</h5>
                                                                        <p className="badge">{course.status}</p>
                                                                    </div>
                                                                    <span className="badge">
                                                                        #{course.category.name}
                                                                    </span>
                                                                    <div className="review">
                                                                        <span>3 Review</span>
                                                                        <ul className="cours-star">
                                                                            <li className="active">
                                                                                <i className="fa fa-star"></i>
                                                                            </li>
                                                                            <li className="active">
                                                                                <i className="fa fa-star"></i>
                                                                            </li>
                                                                            <li className="active">
                                                                                <i className="fa fa-star"></i>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-star"></i>
                                                                            </li>
                                                                            <li>
                                                                                <i className="fa fa-star"></i>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="price">
                                                                        <h5>
                                                                            {course.price > 0
                                                                                ? `$${course.price}`
                                                                                : "FREE"}
                                                                        </h5>
                                                                    </div>
                                                                    <div>
                                                                        <Link
                                                                            id=""
                                                                            className="btn btn-primary btn-block"
                                                                            role="button"
                                                                            to={`/home/courses/${course.id}`}>
                                                                            View detail
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
