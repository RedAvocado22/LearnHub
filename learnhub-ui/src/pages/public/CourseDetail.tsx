import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Course, useUser } from "../../hooks/useUser";
import { API } from "../../api";
import { toast } from "react-toastify";
import { MaterialType } from "../../types/Course";
import ReviewCard from "../../layouts/elements/ReviewCard";
import ReviewOverview from "../../layouts/elements/ReviewOverview";

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

    console.log(course);

    const handleBuySubmit = () => {
        navigate("/order", {
            state: {
                course: course,
                userId: user?.id
            }
        });
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
                                            {!user ? (
                                                <a
                                                    className="btn radius-xl text-uppercase"
                                                    onClick={() => navigate("/login")}>
                                                    Login to Buy Now
                                                </a>
                                            ) : user?.student?.enrollments?.find(
                                                  (enrollment) => enrollment.course?.id === course?.id
                                              ) ? (
                                                <a
                                                    className="btn radius-xl text-uppercase"
                                                    onClick={() => navigate("/home/courses?status=progess")}>
                                                    Already Enrolled
                                                </a>
                                            ) : (
                                                <a className="btn radius-xl text-uppercase" onClick={handleBuySubmit}>
                                                    Buy Now This Courses
                                                </a>
                                            )}
                                        </div>
                                        <div className="teacher-bx">
                                            <div className="teacher-info">
                                                <div className="teacher-thumb">
                                                    <img src="/assets/images/testimonials/pic1.jpg" alt="" />
                                                </div>
                                                <div className="teacher-name">
                                                    <h5>
                                                        <Link to={`/teacher/${course?.teacher.id}`}>
                                                            {course?.teacher.name}
                                                        </Link>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="cours-more-info">
                                            <div className="review">
                                                <span>{course?.reviews.length || 0} Review</span>
                                                <ul className="cours-star">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <li
                                                            key={star}
                                                            className={
                                                                course?.reviews.length &&
                                                                course.reviews.length > 0 &&
                                                                star <=
                                                                    course.reviews.reduce(
                                                                        (sum, review) => sum + review.star,
                                                                        0
                                                                    ) /
                                                                        course.reviews.length
                                                                    ? "active"
                                                                    : ""
                                                            }>
                                                            <i className="fa fa-star"></i>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div className="price categories">
                                                <span>Categories</span>
                                                <h5 className="text-primary">
                                                    <Link to={`/courses?category=${course?.category.name}`}>
                                                        {course?.category.name}
                                                    </Link>
                                                </h5>
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
                                            <img
                                                src={
                                                    course?.image
                                                        ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${course.image}`
                                                        : "/assets/images/courses/pic1.jpg"
                                                }
                                            />
                                        </div>
                                        <div className="ttr-post-info">
                                            <div className="ttr-post-title ">
                                                <h2 className="post-title">{course?.name}</h2>
                                            </div>
                                            <div className="ttr-post-text">
                                                <p>{course?.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="courese-overview" id="overview">
                                        <h4>Overview</h4>
                                        <div className="row">
                                            <div className="col-md-12 col-lg-4">
                                                <ul className="course-features">
                                                    <li>
                                                        <i className="ti-help-alt"></i>{" "}
                                                        <span className="label">Quizzes</span>{" "}
                                                        <span className="value">
                                                            {course?.chapters.reduce(
                                                                (count, chapter) =>
                                                                    count +
                                                                    chapter.materials.filter(
                                                                        (material) =>
                                                                            material?.type === MaterialType.QUIZ
                                                                    ).length,
                                                                0
                                                            )}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <i className="ti-video-clapper mr-2"></i>{" "}
                                                        <span className="label">Lesson</span>{" "}
                                                        <span className="value">
                                                            {course?.chapters.reduce(
                                                                (count, chapter) =>
                                                                    count +
                                                                    chapter.materials.filter(
                                                                        (material) =>
                                                                            material?.type === MaterialType.LESSON
                                                                    ).length,
                                                                0
                                                            )}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <i className="ti-smallcap"></i>{" "}
                                                        <span className="label">Language</span>{" "}
                                                        <span className="value">Vietnamese</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="col-md-12 col-lg-8">
                                                <h4>Curriculum</h4>
                                                <ul className="curriculum-list">
                                                    {course?.chapters.map((chapter) => (
                                                        <li key={chapter.id}>
                                                            <h5>{chapter.name}</h5>
                                                            <ul>
                                                                {chapter.materials.length > 0 ? (
                                                                    chapter.materials.map((material) => (
                                                                        <li key={material.id}>
                                                                            <div className="curriculum-list-box">
                                                                                <span>
                                                                                    {material.type ===
                                                                                    MaterialType.LESSON
                                                                                        ? "Lesson"
                                                                                        : "Quiz"}
                                                                                </span>{" "}
                                                                                {material.name}
                                                                            </div>
                                                                        </li>
                                                                    ))
                                                                ) : (
                                                                    <li>
                                                                        <div className="curriculum-list-box">
                                                                            No lessons or quizzes in this chapter
                                                                        </div>
                                                                    </li>
                                                                )}
                                                            </ul>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="" id="reviews">
                                        <h4>Reviews</h4>
                                        <ReviewOverview reviews={course?.reviews || []} />
                                        {course?.reviews?.map((review) => (
                                            <ReviewCard
                                                key={review.id}
                                                username={review.reviewer}
                                                submittedAt={review.submittedAt}
                                                rating={review.star}
                                                comment={review.comment}
                                            />
                                        ))}
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
