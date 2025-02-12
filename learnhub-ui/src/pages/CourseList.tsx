import { useEffect, useState } from "react";
import { Footer, Header } from "../layouts";
import { API } from "../api";

export default function CourseList() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        API.get("/courses").then((resp) => {
            setCourses(resp.data);
            console.log(courses);
        });
    }, []);

    return (
        <>
            <Header />
            <div className="page-content bg-white">
                <div
                    className="page-banner ovbl-dark"
                    style={{ backgroundImage: "url(assets/images/banner/banner3.jpg)" }}>
                    <div className="container">
                        <div className="page-banner-entry">
                            <h1 className="text-white">Our Courses</h1>
                        </div>
                    </div>
                </div>
                <div className="breadcrumb-row">
                    <div className="container">
                        <ul className="list-inline">
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>Our Courses</li>
                        </ul>
                    </div>
                </div>
                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                    <div className="widget courses-search-bx placeani">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <label>Search Courses</label>
                                                <input name="dzName" type="text" required className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget_archive">
                                        <h5 className="widget-title style-1">All Courses</h5>
                                        <ul>
                                            <li className="active">
                                                <a href="#">General</a>
                                            </li>
                                            <li>
                                                <a href="#">IT & Software</a>
                                            </li>
                                            <li>
                                                <a href="#">Photography</a>
                                            </li>
                                            <li>
                                                <a href="#">Programming Language</a>
                                            </li>
                                            <li>
                                                <a href="#">Technology</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="widget">
                                        <a href="#">
                                            <img src="assets/images/adv/adv.jpg" alt="" />
                                        </a>
                                    </div>
                                    <div className="widget recent-posts-entry widget-courses">
                                        <h5 className="widget-title style-1">Recent Courses</h5>
                                        <div className="widget-post-bx">
                                            <div className="widget-post clearfix">
                                                <div className="ttr-post-media">
                                                    {" "}
                                                    <img
                                                        src="assets/images/blog/recent-blog/pic1.jpg"
                                                        width="200"
                                                        height="143"
                                                        alt=""
                                                    />{" "}
                                                </div>
                                                <div className="ttr-post-info">
                                                    <div className="ttr-post-header">
                                                        <h6 className="post-title">
                                                            <a href="#">Introduction EduChamp</a>
                                                        </h6>
                                                    </div>
                                                    <div className="ttr-post-meta">
                                                        <ul>
                                                            <li className="price">
                                                                <del>$190</del>
                                                                <h5>$120</h5>
                                                            </li>
                                                            <li className="review">03 Review</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="widget-post clearfix">
                                                <div className="ttr-post-media">
                                                    {" "}
                                                    <img
                                                        src="assets/images/blog/recent-blog/pic3.jpg"
                                                        width="200"
                                                        height="160"
                                                        alt=""
                                                    />{" "}
                                                </div>
                                                <div className="ttr-post-info">
                                                    <div className="ttr-post-header">
                                                        <h6 className="post-title">
                                                            <a href="#">English For Tommorow</a>
                                                        </h6>
                                                    </div>
                                                    <div className="ttr-post-meta">
                                                        <ul>
                                                            <li className="price">
                                                                <h5 className="free">Free</h5>
                                                            </li>
                                                            <li className="review">07 Review</li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12">
                                    <div className="row">
                                        {courses && courses.length > 0 ? (
                                            courses.map((course) => (
                                                <div key={course.id} className="col-md-6 col-lg-4 col-sm-6 m-b30">
                                                    <div className="cours-bx">
                                                        <div className="action-box">
                                                            <img src="assets/images/courses/pic1.jpg" alt="Course" />
                                                            <a href="#" className="btn">
                                                                Read More
                                                            </a>
                                                        </div>
                                                        <div className="info-bx text-center">
                                                            <h5>
                                                                <a href="#">{course.name}</a>
                                                            </h5>
                                                            <span>Programming</span>
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
                                                            <div className="price">
                                                                <del>$190</del>
                                                                <h5>${course.price}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Loading courses...</p>
                                        )}

                                        <div className="col-lg-12 m-b20">
                                            <div className="pagination-bx rounded-sm gray clearfix">
                                                <ul className="pagination">
                                                    <li className="previous">
                                                        <a href="#">
                                                            <i className="ti-arrow-left"></i> Prev
                                                        </a>
                                                    </li>
                                                    <li className="active">
                                                        <a href="#">1</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">2</a>
                                                    </li>
                                                    <li>
                                                        <a href="#">3</a>
                                                    </li>
                                                    <li className="next">
                                                        <a href="#">
                                                            Next <i className="ti-arrow-right"></i>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
