import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Course, useUser } from "../../hooks/useUser";
import { API } from "../../api";
import { toast } from "react-toastify";

export default function CourseDetail() {
    const [courses, setCourses] = useState<Course[]>([]);
    const { id } = useParams();
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/public/courses")
            .then((resp) => setCourses(resp.data || []))
            .catch(() => toast.error("Fetch courses failed"));
    }, []);

    const course = courses.find((course) => course.id.toString() === id);

    const handleBuySubmit = () => {
        if (user?.role === "STUDENT") {
            console.log(course);
            console.log(user.id);
            navigate("/order", {
                state: {
                    course: course,
                    userId: user.id
                }
            });
        } else {
            toast.error("You need login to buy course");
            navigate("/login", { replace: true });
        }
    };

    return (
        <MainLayout>
            <div className="page-content bg-white">
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(/assets/images/banner/banner2.jpg" }}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">Courses Details</h1>
                        </div>
                    </div>
                </div>
                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row d-flex flex-row-reverse">
                                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                    <div className="course-detail-bx">
                                        <div className="course-price">
                                            <h4 className="price">${course?.price}</h4>
                                        </div>
                                        <div className="course-buy-now text-center">
                                            <a className="btn radius-xl text-uppercase" onClick={handleBuySubmit}>
                                                Buy Now This Courses
                                            </a>
                                        </div>
                                        <div className="teacher-bx">
                                            <div className="teacher-info">
                                                <div className="teacher-thumb">
                                                    <img src="/assets/images/testimonials/pic1.jpg" alt="" />
                                                </div>
                                                <div className="teacher-name">
                                                    <h5>Hinata Hyuga</h5>
                                                    <span>Science Teacher</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cours-more-info">
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
                                            <div className="price categories">
                                                <span>Categories</span>
                                                <h5 className="text-primary">{course?.category.name}</h5>
                                            </div>
                                        </div>
                                        <div className="course-info-list scroll-page">
                                            <ul className="navbar">
                                                <li>
                                                    <a className="nav-link" href="#overview">
                                                        <i className="ti-zip"></i>Overview
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="nav-link" href="#curriculum">
                                                        <i className="ti-bookmark-alt"></i>Curriculum
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="nav-link" href="#instructor">
                                                        <i className="ti-user"></i>Instructor
                                                    </a>
                                                </li>
                                                <li>
                                                    <a className="nav-link" href="#reviews">
                                                        <i className="ti-comments"></i>Reviews
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-lg-9 col-md-8 col-sm-12">
                                    <div className="courses-post">
                                        <div className="ttr-post-media media-effect">
                                            <a href="#">
                                                <img src="/assets/images/blog/default/thum1.jpg" alt="" />
                                            </a>
                                        </div>
                                        <div className="ttr-post-info">
                                            <div className="ttr-post-title ">
                                                <h2 className="post-title">{course?.name}</h2>
                                            </div>
                                            <div className="ttr-post-text">
                                                <p>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                                    ever since the 1500s, when an unknown printer took a galley of type
                                                    and scrambled it to make a type specimen book.
                                                </p>
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
                                                        <i className="ti-time"></i>{" "}
                                                        <span className="label">Duration</span>{" "}
                                                        <span className="value">60 hours</span>
                                                    </li>
                                                    <li>
                                                        <i className="ti-stats-up"></i>{" "}
                                                        <span className="label">Skill level</span>{" "}
                                                        <span className="value">Beginner</span>
                                                    </li>
                                                    <li>
                                                        <i className="ti-smallcap"></i>{" "}
                                                        <span className="label">Language</span>{" "}
                                                        <span className="value">English</span>
                                                    </li>
                                                    <li>
                                                        <i className="ti-user"></i>{" "}
                                                        <span className="label">Students</span>{" "}
                                                        <span className="value">32</span>
                                                    </li>
                                                    <li>
                                                        <i className="ti-check-box"></i>{" "}
                                                        <span className="label">Assessments</span>{" "}
                                                        <span className="value">Yes</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-12 col-lg-8">
                                                <h5 className="m-b5">Course Description</h5>
                                                <p>{course?.description}</p>
                                                <h5 className="m-b5">Certification</h5>
                                                <p>
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry’s standard dummy text
                                                    ever since the 1500s, when an unknown printer took a galley of type
                                                    and scrambled it to make a type specimen book. It has survived not
                                                    only five centuries, but also the leap into electronic typesetting,
                                                    remaining essentially unchanged.
                                                </p>
                                                <h5 className="m-b5">Learning Outcomes</h5>
                                                <ul className="list-checked primary">
                                                    <li>Over 37 lectures and 55.5 hours of content!</li>
                                                    <li>LIVE PROJECT End to End Software Testing Training Included.</li>
                                                    <li>
                                                        Learn Software Testing and Automation basics from a professional
                                                        trainer from your own desk.
                                                    </li>
                                                    <li>
                                                        Information packed practical training starting from basics to
                                                        advanced testing techniques.
                                                    </li>
                                                    <li>
                                                        Best suitable for beginners to advanced level users and who
                                                        learn faster when demonstrated.
                                                    </li>
                                                    <li>
                                                        Course content designed by considering current software testing
                                                        technology and the job market.
                                                    </li>
                                                    <li>Practical assignments at the end of every session.</li>
                                                    <li>
                                                        Practical learning experience with live project work and
                                                        examples.cv
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="m-b30" id="curriculum">
                                        <h4>Curriculum</h4>
                                        <ul className="curriculum-list">
                                            <li>
                                                <h5>First Level</h5>
                                                <ul>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Lesson 1.</span> Introduction to UI Design
                                                        </div>
                                                        <span>120 minutes</span>
                                                    </li>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Lesson 2.</span> User Research and Design
                                                        </div>
                                                        <span>60 minutes</span>
                                                    </li>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Lesson 3.</span> Evaluating User Interfaces Part 1
                                                        </div>
                                                        <span>85 minutes</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <h5>Second Level</h5>
                                                <ul>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Lesson 1.</span> Prototyping and Design
                                                        </div>
                                                        <span>110 minutes</span>
                                                    </li>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Lesson 2.</span> UI Design Capstone
                                                        </div>
                                                        <span>120 minutes</span>
                                                    </li>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Lesson 3.</span> Evaluating User Interfaces Part 2
                                                        </div>
                                                        <span>120 minutes</span>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <h5>Final</h5>
                                                <ul>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Part 1.</span> Final Test
                                                        </div>
                                                        <span>120 minutes</span>
                                                    </li>
                                                    <li>
                                                        <div className="curriculum-list-box">
                                                            <span>Part 2.</span> Online Test
                                                        </div>
                                                        <span>120 minutes</span>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="" id="instructor">
                                        <h4>Instructor</h4>
                                        <div className="instructor-bx">
                                            <div className="instructor-author">
                                                <img src="/assets/images/testimonials/pic1.jpg" alt="" />
                                            </div>
                                            <div className="instructor-info">
                                                <h6>Keny White </h6>
                                                <span>Professor</span>
                                                <ul className="list-inline m-tb10">
                                                    <li>
                                                        <a href="#" className="btn sharp-sm facebook">
                                                            <i className="fa fa-facebook"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="btn sharp-sm twitter">
                                                            <i className="fa fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="btn sharp-sm linkedin">
                                                            <i className="fa fa-linkedin"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="btn sharp-sm google-plus">
                                                            <i className="fa fa-google-plus"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <p className="m-b0">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                                    ever since the 1500s, when an unknown printer took a galley of type
                                                    and scrambled it to make a type specimen book. It has survived not
                                                    only five centuries
                                                </p>
                                            </div>
                                        </div>
                                        <div className="instructor-bx">
                                            <div className="instructor-author">
                                                <img src="/assets/images/testimonials/pic2.jpg" alt="" />
                                            </div>
                                            <div className="instructor-info">
                                                <h6>Keny White </h6>
                                                <span>Professor</span>
                                                <ul className="list-inline m-tb10">
                                                    <li>
                                                        <a href="#" className="btn sharp-sm facebook">
                                                            <i className="fa fa-facebook"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="btn sharp-sm twitter">
                                                            <i className="fa fa-twitter"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="btn sharp-sm linkedin">
                                                            <i className="fa fa-linkedin"></i>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#" className="btn sharp-sm google-plus">
                                                            <i className="fa fa-google-plus"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                                <p className="m-b0">
                                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                                    industry. Lorem Ipsum has been the industry's standard dummy text
                                                    ever since the 1500s, when an unknown printer took a galley of type
                                                    and scrambled it to make a type specimen book. It has survived not
                                                    only five centuries
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="" id="reviews">
                                        <h4>Reviews</h4>

                                        <div className="review-bx">
                                            <div className="all-review">
                                                <h2 className="rating-type">3</h2>
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
                                                <span>3 Rating</span>
                                            </div>
                                            <div className="review-bar">
                                                <div className="bar-bx">
                                                    <div className="side">
                                                        <div>5 star</div>
                                                    </div>
                                                    <div className="middle">
                                                        <div className="bar-container">
                                                            <div className="bar-5" style={{ width: "90%" }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="side right">
                                                        <div>150</div>
                                                    </div>
                                                </div>
                                                <div className="bar-bx">
                                                    <div className="side">
                                                        <div>4 star</div>
                                                    </div>
                                                    <div className="middle">
                                                        <div className="bar-container">
                                                            <div className="bar-5" style={{ width: "70%" }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="side right">
                                                        <div>140</div>
                                                    </div>
                                                </div>
                                                <div className="bar-bx">
                                                    <div className="side">
                                                        <div>3 star</div>
                                                    </div>
                                                    <div className="middle">
                                                        <div className="bar-container">
                                                            <div className="bar-5" style={{ width: "50%" }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="side right">
                                                        <div>120</div>
                                                    </div>
                                                </div>
                                                <div className="bar-bx">
                                                    <div className="side">
                                                        <div>2 star</div>
                                                    </div>
                                                    <div className="middle">
                                                        <div className="bar-container">
                                                            <div className="bar-5" style={{ width: "40%" }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="side right">
                                                        <div>110</div>
                                                    </div>
                                                </div>
                                                <div className="bar-bx">
                                                    <div className="side">
                                                        <div>1 star</div>
                                                    </div>
                                                    <div className="middle">
                                                        <div className="bar-container">
                                                            <div className="bar-5" style={{ width: "20%" }}></div>
                                                        </div>
                                                    </div>
                                                    <div className="side right">
                                                        <div>80</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
