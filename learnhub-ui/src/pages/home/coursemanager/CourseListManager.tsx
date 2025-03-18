import { useEffect, useState } from "react";

import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { CourseStatus } from "../../../types/Course";
import { API } from "../../../api";
import { HomeLayout } from "../../../layouts";

interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
    courseStatus: CourseStatus;
    teacher: { id: number; name: string };
}
export default function CourseListManagerHomeTest() {
    const [params, _] = useSearchParams();
    const [courses, setCourses] = useState<Course[]>([]);
    const status = params.get("status") || "";
    const handleSubmitAccountChange = async (id: number, status: CourseStatus) => {
        try {
            console.log(status);
            console.log(id);
            const resp = await API.put("/courses/update", { id, status });

            if (resp.status === 200) {
                toast.success("Change status successfully");
                window.location.reload();
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };

    useEffect(() => {
        API.get("/courses/courseListManager")
            .then((resp) => setCourses(resp.data))
            .catch((err) => {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            });
    }, []);
    let list = courses.filter((course) => {
        if (status === "PENDING") {
            return course.courseStatus === CourseStatus.PENDING;
        } else if (status === "CANCELLED") {
            return course.courseStatus === CourseStatus.CANCELLED;
        } else if (status === "PUBLIC") {
            return course.courseStatus === CourseStatus.PUBLIC;
        } else if (status === "ARCHIVED") {
            return course.courseStatus === CourseStatus.ARCHIVED;
        }
        return true;
    });

    return (
        <HomeLayout>
            <div className="container-fluid">
                <div className="db-breadcrumb">
                    <h4 className="breadcrumb-title">Courses</h4>
                    <ul className="db-breadcrumb-list">
                        <li>
                            <a href="#">
                                <i className="fa fa-home"></i>Home
                            </a>
                        </li>
                        <li>Courses</li>
                    </ul>
                </div>
                <div className="col-lg-9 col-md-8 col-sm-12">
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Course status</label>
                                        <div className="col-sm-7">
                                            <div className="email-menu-bar-inner">
                                                <ul>
                                                    <li className={status === "All" ? "active" : ""}>
                                                        <Link to="/courselistmanager/?status=All">
                                                            <i className="fa fa-book"></i>All
                                                        </Link>
                                                    </li>
                                                    <li className={status === "PENDING" ? "active" : ""}>
                                                        <Link to="/courselistmanager/?status=PENDING">
                                                            <i className="fa fa-book"></i>Pending
                                                        </Link>
                                                    </li>
                                                    <li className={status === "CANCELLED" ? "active" : ""}>
                                                        <Link to="/courselistmanager/?status=CANCELLED">
                                                            <i className="fa fa-graduation-cap"></i>Cancelled
                                                        </Link>
                                                    </li>
                                                    <li className={status === "PUBLIC" ? "active" : ""}>
                                                        <Link to="/courselistmanager/?status=PUBLIC">
                                                            <i className="fa fa-graduation-cap"></i>Public
                                                        </Link>
                                                    </li>
                                                    <li className={status === "ARCHIVED" ? "active" : ""}>
                                                        <Link to="/courselistmanager/?status=ARCHIVED">
                                                            <i className="fa fa-graduation-cap"></i>ARCHIVED
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>{" "}
                                </div>

                                {list.map((course) => (
                                    <div className="card-courses-list admin-courses" key={course.id}>
                                        <div className="card-courses-media">
                                            <img src="assets/images/courses/pic4.jpg" alt="" />
                                        </div>
                                        <div className="card-courses-full-dec">
                                            <div className="card-courses-title">
                                                <h4>{course.name}</h4>
                                            </div>
                                            <div className="card-courses-list-bx">
                                                <ul className="card-courses-view">
                                                    <li className="card-courses-user">
                                                        <div className="card-courses-user-pic">
                                                            <img src="assets/images/testimonials/pic3.jpg" alt="" />
                                                        </div>
                                                        <div className="card-courses-user-info">
                                                            <h5>Teacher</h5>
                                                            <h4>{course.teacher.name}</h4>
                                                        </div>
                                                    </li>
                                                    <li className="card-courses-categories">
                                                        <h5>3 Categories</h5>
                                                        <h4>{course.category.name}</h4>
                                                    </li>
                                                    <li className="card-courses-review">
                                                        <h5>3 Review</h5>
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
                                                    </li>
                                                    <li className="card-courses-stats">
                                                        <a href="#" className="btn button-sm green radius-xl">
                                                            {course.courseStatus}
                                                        </a>
                                                    </li>
                                                    <li className="card-courses-price">
                                                        <del>{course.price}</del>
                                                        <h5 className="text-primary">$120</h5>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="row card-courses-dec">
                                                <div className="col-md-12">
                                                    <h6 className="m-b10">Course Description</h6>
                                                    <p>
                                                        Lorem ipsum dolor sit amet, est ei idque voluptua copiosae, pro
                                                        detracto disputando reformidans at, ex vel suas eripuit. Vel
                                                        alii zril maiorum ex, mea id sale eirmod epicurei. Sit te possit
                                                        senserit, eam alia veritus maluisset ei, id cibo vocent
                                                        ocurreret per. Te qui doming doctus referrentur, usu debet
                                                        tamquam et. Sea ut nullam aperiam, mei cu tollit salutatus
                                                        delicatissimi.{" "}
                                                    </p>
                                                </div>

                                                <div className="info-bx text-center edit-course-container">
                                                    {course.courseStatus === CourseStatus.PENDING ? (
                                                        <div className="col-md-12">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="btn green radius-xl outline"
                                                                onClick={() =>
                                                                    handleSubmitAccountChange(
                                                                        course.id,
                                                                        CourseStatus.PUBLIC
                                                                    )
                                                                }>
                                                                Approve
                                                            </a>
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="btn red outline radius-xl"
                                                                onClick={() =>
                                                                    handleSubmitAccountChange(
                                                                        course.id,
                                                                        CourseStatus.CANCELLED
                                                                    )
                                                                }>
                                                                Cancel
                                                            </a>
                                                        </div>
                                                    ) : course.courseStatus === CourseStatus.PUBLIC ? (
                                                        <div className="col-md-12">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="btn red outline radius-xl"
                                                                onClick={() =>
                                                                    handleSubmitAccountChange(
                                                                        course.id,
                                                                        CourseStatus.CANCELLED
                                                                    )
                                                                }>
                                                                Banned
                                                            </a>
                                                        </div>
                                                    ) : course.courseStatus === CourseStatus.CANCELLED ? (
                                                        <div className="col-md-12">
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="btn red outline radius-xl"
                                                                onClick={() =>
                                                                    handleSubmitAccountChange(
                                                                        course.id,
                                                                        CourseStatus.PUBLIC
                                                                    )
                                                                }>
                                                                Unban
                                                            </a>
                                                            <a
                                                                href="javascript:void(0)"
                                                                className="btn red outline radius-xl"
                                                                onClick={() =>
                                                                    handleSubmitAccountChange(
                                                                        course.id,
                                                                        CourseStatus.ARCHIVED
                                                                    )
                                                                }>
                                                                Delete
                                                            </a>
                                                        </div>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}
