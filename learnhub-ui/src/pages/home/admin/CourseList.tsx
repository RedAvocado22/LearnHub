import { Link, useSearchParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { CourseStatus } from "../../../types/Course";

interface Course {
    id: number;
    name: string;
    status: CourseStatus;
    createdAt: Date;
    manager?: {
        id: number;
        name: string;
    } | null;
}

const itemsPerPage = 10;
export default function AdminCourseList() {
    const [params] = useSearchParams();
    const status = params.get("status") || "pending";
    const [courses, setCourses] = useState<Course[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchCourses = () => {
        API.get("courses/admin")
            .then((resp) => setCourses(resp.data))
            .catch((err) => {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            });
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    let list = courses
        .filter((course) => {
            return course.name.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .filter((user) => {
            if (status === "public") {
                return user.status === CourseStatus.PUBLIC;
            } else if (status === "cancelled") {
                return user.status === CourseStatus.CANCELLED;
            }
            return user.status === CourseStatus.PENDING;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const totalPages = Math.ceil(list.length / itemsPerPage);
    const startIdx = currPage * itemsPerPage;
    list = list.slice(startIdx, startIdx + itemsPerPage);

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Manage Courses</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="email-wrapper">
                                    <div className="email-menu-bar">
                                        <div className="email-menu-bar-inner">
                                            <ul>
                                                <li className={status === "pending" ? "active" : ""}>
                                                    <Link to="/admin/courses?status=pending">
                                                        <i className="fa fa-book"></i>Pending
                                                    </Link>
                                                </li>
                                                <li className={status === "public" ? "active" : ""}>
                                                    <Link to="/admin/courses?status=public">
                                                        <i className="fa fa-user"></i>Public
                                                    </Link>
                                                </li>
                                                <li className={status === "cancelled" ? "active" : ""}>
                                                    <Link to="/admin/courses?status=cancelled">
                                                        <i className="fa fa-graduation-cap"></i>Cancelled
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mail-list-container">
                                        <div className="mail-toolbar">
                                            <div className="mail-search-bar">
                                                <input
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                            <div className="next-prev-btn">
                                                <span className="mr-3">
                                                    Page {currPage + 1} of {totalPages || 1}
                                                </span>
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currPage > 0) {
                                                            setCurrPage(currPage - 1);
                                                        }
                                                    }}>
                                                    <i className="fa fa-angle-left"></i>
                                                </a>{" "}
                                                <a
                                                    href="#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (currPage < totalPages - 1) {
                                                            setCurrPage(currPage + 1);
                                                        }
                                                    }}>
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mail-box-list">
                                            {list.map((course) => (
                                                <div key={course.id} className="mail-list-info">
                                                    <span
                                                        className={`ml-2 badge ${course.status !== CourseStatus.CANCELLED ? "badge-success" : "badge-danger"}`}>
                                                        {course.status === CourseStatus.PUBLIC
                                                            ? "Public"
                                                            : course.status === CourseStatus.PENDING
                                                              ? "Pending"
                                                              : "Cancelled"}
                                                    </span>
                                                    <div className="mail-list-title">
                                                        <h6>
                                                            <Link
                                                                to={`/admin/courses/${course.id}`}
                                                                state={{ status: course.status }}>
                                                                {course.name}
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                    <div className="mail-list-time">
                                                        <span>{new Date(course.createdAt).toDateString()}</span>
                                                    </div>
                                                    <div className="mail-list-manager">
                                                        {course.manager ? (
                                                            <small className="text-muted">
                                                                Manager: {course.manager.name}
                                                            </small>
                                                        ) : (
                                                            <Link
                                                                to={`/admin/courses/${course.id}/assign-manager`}
                                                                className=" assign-manager">
                                                                Assign Manager
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
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
