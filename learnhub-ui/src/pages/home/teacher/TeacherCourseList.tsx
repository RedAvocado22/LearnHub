import { useState } from "react";
import { useTeacher } from "../../../hooks/useUser";
import { HomeLayout } from "../../../layouts";
import { Course, CourseStatus } from "../../../types/Course";
import { API } from "../../../api";
import { useParams, useNavigate } from "react-router-dom";

export default function TeacherCourseList() {
    const { user, refresh } = useTeacher();

    const { status = "" } = useParams<{ status: string }>();
    const navigate = useNavigate();

    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const handleEditClick = (course: Course) => {
        setEditingCourse(course);
    };

    const handleSave = async (newStatus: CourseStatus) => {
        try {
            if (!editingCourse) return;

            const updatedCourse: Course = { ...editingCourse, status: newStatus };

            await API.put(`courses/teacher`, {
                id: updatedCourse.id,
                name: updatedCourse.name,
                category: updatedCourse.category,
                price: updatedCourse.price,
                status: updatedCourse.status
            });

            refresh();

            setEditingCourse(null);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleCancel = () => {
        setEditingCourse(null);
    };

    const filteredCourses =
        status === "all"
            ? user.details.courses
            : user.details.courses.filter((course) => {
                  return course.status.toString().toLowerCase() === status!.toLowerCase();
              });

    return (
        <HomeLayout>
            <div className="page-content bg-white">
                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <ul className="ttr-gallery-listing magnific-image row" style={{ minWidth: "1200px" }}>
                                    {filteredCourses &&
                                        filteredCourses.map((course: Course) => (
                                            <div
                                                key={course.id}
                                                className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 publish m-b30">
                                                <div className="cours-bx">
                                                    <div className="action-box">
                                                        <img src="/assets/images/courses/pic1.jpg" alt="" />
                                                        {course.status !== "PENDING" && (
                                                            <div className="button-container">
                                                                <button
                                                                    onClick={() => handleEditClick(course)}
                                                                    className="btn">
                                                                    Edit
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="info-bx text-center edit-course-container">
                                                        {editingCourse?.id === course.id ? (
                                                            <div>
                                                                {editingCourse.status === "PRIVATE" && (
                                                                    <div className="button-container">
                                                                        <div>
                                                                            <button
                                                                                onClick={() =>
                                                                                    navigate(
                                                                                        `/add-material/${course.id}`
                                                                                    )
                                                                                }
                                                                                className="btn m-b15">
                                                                                Add Material
                                                                            </button>
                                                                        </div>
                                                                        <div>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleSave(CourseStatus.PENDING)
                                                                                }
                                                                                className="btn m-b15 m-r15">
                                                                                Submit Course
                                                                            </button>
                                                                            <button
                                                                                onClick={() =>
                                                                                    handleSave(CourseStatus.CANCELLED)
                                                                                }
                                                                                className="btn m-b15">
                                                                                Cancel Course
                                                                            </button>
                                                                        </div>
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
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <h5>
                                                                    <a href="#">{course.name}</a>
                                                                </h5>
                                                                <h5>
                                                                    <span>{course.status}</span>
                                                                </h5>
                                                                <span>{course.category.name}</span>
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
                                                                    <h5>${course.price}</h5>
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
        </HomeLayout>
    );
}
