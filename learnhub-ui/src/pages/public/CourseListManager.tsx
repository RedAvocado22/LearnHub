import { useEffect, useState } from "react";
import { MainLayout } from "../../layouts";
import { CourseStatus } from "../../types/Course";
import { API } from "../../api";
import Course from "../home/coursemanager/Course";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Link, useSearchParams } from "react-router-dom";
interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
    courseStatus: CourseStatus;
    teacher: { id: number; name: string };
}
export default function CourseListManager() {
    const [params, _] = useSearchParams();
    const [courses, setCourses] = useState<Course[]>([]);
    const [status, setStatus] = useState<CourseStatus>();
    const Status = params.get("status") || "PENDING";

    const handleSubmitAccountChange = async () => {
        useEffect(() => {
            API.get("/public/courseListManager").then((resp) => {
                setCourses(resp?.data || []);
                console.log(courses);
            });
        }, []);
        let list = courses.filter((course) => {
            if (Status === "PENDING") {
                return course.courseStatus === CourseStatus.PENDING;
            } else if (Status === "PRIVATE") {
                return course.courseStatus === CourseStatus.PRIVATE;
            } else if (Status === "CANCELLED") {
                return course.courseStatus === CourseStatus.CANCELLED;
            }
            return true;
        });

        return (
            <MainLayout>
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
                                                        <li className={Status === "PENDING" ? "active" : ""}>
                                                            <Link to="/courselistmanager/?status=PENDING">
                                                                <i className="fa fa-book"></i>PENDING
                                                            </Link>
                                                        </li>
                                                        <li className={Status === "PRIVATE" ? "active" : ""}>
                                                            <Link to="/courselistmanager/?status=coursemanagers">
                                                                <i className="fa fa-user"></i>PRIVATE
                                                            </Link>
                                                        </li>
                                                        <li className={Status === "CANCLLED" ? "active" : ""}>
                                                            <Link to="/courselistmanager/?status=students">
                                                                <i className="fa fa-graduation-cap"></i>CANCLLED
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>{" "}
                                    </div>

                                    {courses && courses.length > 0 ? (
                                        courses.map((course) => (
                                            <div className="card-courses-list admin-courses">
                                                <div className="card-courses-media">
                                                    <img src="assets/images/courses/pic4.jpg" alt="" />
                                                </div>
                                                <div className="card-courses-full-dec">
                                                    <div className="card-courses-title">
                                                        <h4>Become a PHP Master and Make Money</h4>
                                                    </div>
                                                    <div className="card-courses-list-bx">
                                                        <ul className="card-courses-view">
                                                            <li className="card-courses-user">
                                                                <div className="card-courses-user-pic">
                                                                    <img
                                                                        src="assets/images/testimonials/pic3.jpg"
                                                                        alt=""
                                                                    />
                                                                </div>
                                                                <div className="card-courses-user-info">
                                                                    <h5>Teacher</h5>
                                                                    <h4>Keny White</h4>
                                                                </div>
                                                            </li>
                                                            <li className="card-courses-categories">
                                                                <h5>3 Categories</h5>
                                                                <h4>Backend</h4>
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
                                                                    Pending
                                                                </a>
                                                            </li>
                                                            <li className="card-courses-price">
                                                                <del>$190</del>
                                                                <h5 className="text-primary">$120</h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="row card-courses-dec">
                                                        <div className="col-md-12">
                                                            <h6 className="m-b10">Course Description</h6>
                                                            <p>
                                                                Lorem ipsum dolor sit amet, est ei idque voluptua
                                                                copiosae, pro detracto disputando reformidans at, ex vel
                                                                suas eripuit. Vel alii zril maiorum ex, mea id sale
                                                                eirmod epicurei. Sit te possit senserit, eam alia
                                                                veritus maluisset ei, id cibo vocent ocurreret per. Te
                                                                qui doming doctus referrentur, usu debet tamquam et. Sea
                                                                ut nullam aperiam, mei cu tollit salutatus
                                                                delicatissimi.{" "}
                                                            </p>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <a href="#" className="btn green radius-xl outline">
                                                                Approve
                                                            </a>
                                                            <a href="#" className="btn red outline radius-xl ">
                                                                Cancel
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>Loading courses...</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    };
}
