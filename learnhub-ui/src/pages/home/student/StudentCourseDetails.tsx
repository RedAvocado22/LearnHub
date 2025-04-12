import { Link } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { MaterialType } from "../../../types/Course";
import { Course, Enrollment, useUser } from "../../../hooks/useUser";
import defaultThumbnail from "/assets/images/blog/default/thum1.jpg";
import CourseRating from "../../../layouts/elements/Rating";
import ReviewCard from "../../../layouts/elements/ReviewCard";

interface StudentCourseDetailsProps {
    enrollment: Enrollment;
}

const countMaterials = (course: Course): { lessonCount: number; quizCount: number } => {
    let lessonCount = 0;
    let quizCount = 0;

    course.chapters.forEach((c) => {
        c.materials.forEach((m) => {
            if (m.type === MaterialType.LESSON) {
                lessonCount++;
            } else if (m.type === MaterialType.QUIZ) {
                quizCount++;
            }
        });
    });

    return { lessonCount, quizCount };
};

export default function StudentCourseDetails({ enrollment }: StudentCourseDetailsProps) {
    const { user } = useUser();
    const review = enrollment.course.reviews?.find((r) => r.user === user?.id);
    const { lessonCount, quizCount } = countMaterials(enrollment.course);
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="page-content bg-white">
                        <div className="content-block">
                            <div className="section-area">
                                <div className="row d-flex flex-row-reverse">
                                    <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                        <div className="course-detail-bx">
                                            <div className="course-buy-now text-center">
                                                <h4>{enrollment.status}</h4>
                                            </div>
                                            <div className="teacher-bx">
                                                <div className="teacher-info">
                                                    <div className="teacher-thumb">
                                                        <img
                                                            src={
                                                                enrollment.course.teacher.avatar
                                                                    ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${enrollment.course.teacher.avatar}`
                                                                    : "/assets/images/testimonials/default.jpg"
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                    <div className="teacher-name">
                                                        <h5>
                                                            <Link to={`/teacher/${enrollment.course.teacher.id}`}>
                                                                {enrollment.course.teacher.fullName}
                                                            </Link>
                                                        </h5>
                                                        <span>{enrollment.course.teacher.major}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="cours-more-info">
                                                <div className="review">
                                                    <span>{enrollment.course?.reviews.length || 0} Review</span>
                                                    <ul className="cours-star">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <li
                                                                key={star}
                                                                className={
                                                                    enrollment.course?.reviews.length &&
                                                                    enrollment.course.reviews.length > 0 &&
                                                                    star <=
                                                                        enrollment.course.reviews.reduce(
                                                                            (sum, review) => sum + review.star,
                                                                            0
                                                                        ) /
                                                                            enrollment.course.reviews.length
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
                                                        <Link
                                                            to={`/courses?category=${enrollment.course.category.name}`}>
                                                            {enrollment.course.category.name}
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
                                                        enrollment.course.image
                                                            ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${enrollment.course.image}`
                                                            : defaultThumbnail
                                                    }
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
                                                    <h2 className="post-title">{enrollment.course.name}</h2>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="courese-overview" id="overview">
                                            <h4>Overview</h4>
                                            <div className="row">
                                                <div className="col-md-12 col-lg-4">
                                                    <ul className="course-features">
                                                        <li>
                                                            <i className="ti-book"></i>
                                                            <span className="label">Lectures</span>
                                                            <span className="value">{lessonCount}</span>
                                                        </li>
                                                        <li>
                                                            <i className="ti-help-alt"></i>
                                                            <span className="label">Quizzes</span>
                                                            <span className="value">{quizCount}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className="col-md-12 col-lg-8">
                                                    <h5 className="m-b5">Course Description</h5>
                                                    <p>{enrollment.course.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="m-b30" id="curriculum">
                                            <h4>Curriculum</h4>
                                            <ul className="curriculum-list">
                                                {enrollment.course.chapters.map((c) => (
                                                    <li key={c.id}>
                                                        <h5>{c.name}</h5>
                                                        <ul>
                                                            {c.materials.map((m) => (
                                                                <li
                                                                    key={m.id}
                                                                    className="d-flex justify-content-between align-items-center">
                                                                    <div className="curriculum-list-box">
                                                                        <i
                                                                            className={`${m.type === MaterialType.LESSON ? `ti-video-clapper` : `ti-help`} mr-2`}
                                                                        />
                                                                        <Link
                                                                            to={`/home/courses/${enrollment.course.id}/materials/${m.id}`}>
                                                                            {m.name}
                                                                        </Link>
                                                                    </div>
                                                                    {enrollment.finishedMaterials.some(
                                                                        (f) => f.materialId === m.id
                                                                    ) && (
                                                                        <i
                                                                            className="fa fa-check text-success"
                                                                            aria-hidden="true"></i>
                                                                    )}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="m-b30" id="reviews">
                                            <h4>Reviews</h4>
                                            {review ? (
                                                <ReviewCard
                                                    username={review.reviewer}
                                                    submittedAt={review.submittedAt}
                                                    rating={review.star}
                                                    comment={review.comment}
                                                />
                                            ) : (
                                                <CourseRating courseId={enrollment.course.id} />
                                            )}
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
