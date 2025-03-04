import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { useTeacher } from "../../../hooks/useUser";
import { HomeLayout } from "../../../layouts";
import NotFound from "../../error/NotFound";
import { Course, CourseStatus } from "../../../types/Course";
import { API } from "../../../api";
import { useParams, useNavigate } from "react-router-dom";

export default function TeacherCourseList() {
    const { user } = useTeacher();
    const id = user.id;

    const { status = "" } = useParams<{ status: string }>();
    const navigate = useNavigate();

    const [notFound, setNotFound] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [newStatus, setNewStatus] = useState<CourseStatus>();

    useEffect(() => {
        const fetchTeacherData = async () => {
            try {
                const response = await API.get(`courses/teacher`);
                setCourses(response?.data);
            } catch (error) {
                if (isAxiosError(error) && error.response?.status === 404) {
                    setNotFound(true);
                }
            }
        };

        fetchTeacherData();
    }, [id, status]);

    const handleEditClick = (course: Course) => {
        setEditingCourse(course);
        setNewStatus(course.status);
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedStatus = e.target.value as unknown as CourseStatus;
        setNewStatus(selectedStatus);
    };

    const handleSave = async (courseId: number) => {
        try {
            if (!editingCourse) return;

            const updatedCourse: Course = { ...editingCourse, status: newStatus! };

            await API.put(`courses/teacher`, {
                id: updatedCourse.id,
                name: updatedCourse.name,
                category: updatedCourse.category,
                price: updatedCourse.price,
                status: updatedCourse.status
            });

            setCourses((prevCourses) => prevCourses.map((course) => (course.id === courseId ? updatedCourse : course)));

            setEditingCourse(null);
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    const handleCancel = () => {
        setEditingCourse(null);
    };

    if (!id || id == 0 || notFound) {
        return <NotFound />;
    }

    const filteredCourses =
        status === "all"
            ? courses
            : courses.filter((course) => {
                  return course.status.toString().toLowerCase() === status!.toLowerCase();
              });

    console.log(filteredCourses);

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
                                                                <div className="button-container">
                                                                    <button
                                                                        onClick={() =>
                                                                            navigate(`/add-material/${course.id}`)
                                                                        }
                                                                        className="btn m-b15">
                                                                        Add Material
                                                                    </button>
                                                                </div>
                                                                <div>
                                                                    <select
                                                                        value={newStatus}
                                                                        onChange={handleStatusChange}>
                                                                        <option value={CourseStatus.PUBLIC}>
                                                                            Public
                                                                        </option>
                                                                        <option value={CourseStatus.PRIVATE}>
                                                                            Private
                                                                        </option>
                                                                        <option value={CourseStatus.PENDING}>
                                                                            Pending
                                                                        </option>
                                                                        <option value={CourseStatus.CANCELLED}>
                                                                            Canceled
                                                                        </option>
                                                                    </select>
                                                                    <button
                                                                        onClick={() => handleSave(course.id)}
                                                                        className="btn-save">
                                                                        Save
                                                                    </button>
                                                                    <button
                                                                        onClick={handleCancel}
                                                                        className="btn-cancel">
                                                                        Cancel
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <h5>
                                                                    <a href="#">{course.name}</a>
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
