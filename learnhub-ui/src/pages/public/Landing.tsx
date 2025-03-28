import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CountUp from "react-countup";
import { MainLayout } from "../../layouts";
import CourseCard from "../../layouts/elements/CourseCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../../api";
import { toast } from "react-toastify";

interface Category {
    id: number;
    name: string;
}

interface Course {
    id: number;
    name: string;
    image: string;
    price: number;
    category: Category;
}

interface LandingPageData {
    studentCounted: number;
    teacherCounted: number;
    courseCounted: number;
    courses: Course[];
}

export default function Landing() {
    const [searchQuery, setSearchQuery] = useState("");
    const [landingData, setLandingData] = useState<LandingPageData>({
        studentCounted: 0,
        teacherCounted: 0,
        courseCounted: 0,
        courses: []
    });
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        API.get("/public/landing-page")
            .then((resp) => setLandingData(resp.data))
            .catch(() => toast.error("Failed to load landing page data"))
            .finally(() => setIsLoading(false));
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <MainLayout>
            <div className="page-content bg-white">
                {/* Main Slider */}
                <div
                    className="section-area section-sp1 ovpr-dark bg-fix online-cours"
                    style={{ backgroundImage: "url(assets/images/background/bg1.jpg)" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center text-white">
                                <h2>High School Courses To Learn</h2>
                                <h5>Enhance Your Skills with Online Learning for High School Students</h5>
                                <form className="cours-search" onSubmit={handleSearch}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="What subject would you like to learn today?"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn" type="submit">
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div className="mw800 m-auto">
                            <div className="row">
                                <div className="col-md-6 col-sm-6">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3>
                                                <i className="ti-user"></i>
                                                <CountUp
                                                    start={0}
                                                    end={isLoading ? 0 : landingData.studentCounted}
                                                    duration={5}
                                                    className="counter"
                                                />
                                            </h3>
                                        </div>
                                        <span className="cours-search-text">
                                            {isLoading ? "Loading..." : `${landingData.studentCounted} Students`}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6 col-sm-6">
                                    <div className="cours-search-bx m-b30">
                                        <div className="icon-box">
                                            <h3>
                                                <i className="ti-book"></i>
                                                <CountUp
                                                    start={0}
                                                    end={isLoading ? 0 : landingData.teacherCounted}
                                                    duration={5}
                                                    className="counter"
                                                />
                                            </h3>
                                        </div>
                                        <span className="cours-search-text">
                                            {isLoading ? "Loading..." : `${landingData.teacherCounted} Teachers`}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Main Slider */}
                <div className="content-block">
                    {/* Popular Courses */}
                    <div className="section-area section-sp2 popular-courses-bx">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 heading-bx left">
                                    <h2 className="title-head">
                                        Newest <span>High School Courses</span>
                                    </h2>
                                    <p>
                                        Discover a wide range of high school courses designed to help students build the
                                        foundation for their future. Whether it's Math, Science, or English, we've got
                                        everything you need to succeed.
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                {isLoading ? (
                                    <div className="col-12 text-center">
                                        <p>Loading courses...</p>
                                    </div>
                                ) : (
                                    <Slider
                                        dots={true}
                                        infinite={true}
                                        speed={500}
                                        slidesToShow={landingData.courses.length < 4 ? landingData.courses.length : 4}
                                        slidesToScroll={1}
                                        className="courses-carousel col-12 p-lr0">
                                        {landingData.courses.map((course) => (
                                            <CourseCard
                                                key={course.id.toString()}
                                                id={course.id}
                                                title={course.name}
                                                imagePath={
                                                    course.image
                                                        ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${course.image}`
                                                        : "assets/images/courses/pic1.jpg"
                                                }
                                                category={course.category.name}
                                                price={course.price}
                                            />
                                        ))}
                                    </Slider>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Popular Courses END */}
                    <div
                        className="section-area section-sp2 bg-fix ovbl-dark join-bx text-center"
                        style={{ backgroundImage: "url(assets/images/background/bg1.jpg)" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="join-content-bx text-white">
                                        <h2>
                                            Learn a new skill online on <br /> your time
                                        </h2>
                                        <h4>
                                            <CountUp
                                                start={0}
                                                end={landingData.courseCounted}
                                                duration={5}
                                                className="counter"
                                            />{" "}
                                            High School Courses
                                        </h4>
                                        <p>
                                            Our platform provides high-quality courses that allow students to learn at
                                            their own pace. From science to history, you can find everything you need to
                                            excel in school and prepare for exams.
                                        </p>
                                        <a href="/register" className="btn button-md">
                                            Join Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Form END */}
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 m-b30">
                                    <h2 className="title-head ">
                                        Learn a new skill online
                                        <br /> <span className="text-primary"> on your time</span>
                                    </h2>
                                    <h4>
                                        <CountUp
                                            start={0}
                                            end={landingData.courses.length}
                                            duration={5}
                                            className="counter"
                                        />{" "}
                                        High School Courses
                                    </h4>
                                    <p>
                                        High school students can access a variety of subjects and levels. Master
                                        subjects like Math, English, and Science to boost your grades and knowledge.
                                    </p>
                                    <a href="/register" className="btn button-md">
                                        Join Now
                                    </a>
                                </div>
                                <div className="col-lg-6">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon1.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Our Philosophy</h5>
                                                    <p>
                                                        We believe in providing accessible education for all students.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon2.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Kingster's Principle</h5>
                                                    <p>
                                                        We focus on providing structured courses that match school
                                                        curriculums.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon3.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Key Of Success</h5>
                                                    <p>
                                                        Consistency and hard work are the keys to mastering any subject.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6 m-b30">
                                            <div className="feature-container">
                                                <div className="feature-md text-white m-b20">
                                                    <a href="#" className="icon-cell">
                                                        <img src="assets/images/icon/icon4.png" alt="" />
                                                    </a>
                                                </div>
                                                <div className="icon-content">
                                                    <h5 className="ttr-tilte">Our Philosophy</h5>
                                                    <p>
                                                        Empowering students to be independent learners with the right
                                                        resources.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div
                        className="section-area section-sp1 bg-fix ovbl-dark text-white"
                        style={{ backgroundImage: "url(assets/images/background/bg1.jpg)" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp
                                                start={0}
                                                end={landingData.studentCounted}
                                                duration={5}
                                                className="counter"
                                            />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Students</span>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp
                                                start={0}
                                                end={landingData.teacherCounted}
                                                duration={5}
                                                className="counter"
                                            />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Teachers</span>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-6 m-b30">
                                    <div className="counter-style-1">
                                        <div className="text-white">
                                            <CountUp
                                                start={0}
                                                end={landingData.courses.length}
                                                duration={5}
                                                className="counter"
                                            />
                                            <span>+</span>
                                        </div>
                                        <span className="counter-text">Courses</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Stats END */}
                    {/* Testimonials ==== */}
                    <div className="section-area section-sp2">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 heading-bx left">
                                    <h2 className="title-head text-uppercase">
                                        what people <span>say</span>
                                    </h2>
                                    <p>Our students and teachers share their experiences with the platform.</p>
                                </div>
                            </div>
                            <Slider
                                dots={true}
                                infinite={true}
                                speed={500}
                                slidesToShow={2}
                                slidesToScroll={1}
                                className="testimonial-carousel col-12 p-lr0">
                                <div className="item position-relative">
                                    <div className="testimonial-bx">
                                        <div className="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic1.jpg" alt="" />
                                        </div>
                                        <div className="testimonial-info">
                                            <h5 className="name">Peter Packer</h5>
                                            <p>-Art Director</p>
                                        </div>
                                        <div className="testimonial-content">
                                            <p>
                                                "This platform has helped me learn at my own pace. I can now understand
                                                high school subjects much better, thanks to the amazing teachers and
                                                resources available."
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="item position-relative">
                                    <div className="testimonial-bx">
                                        <div className="testimonial-thumb">
                                            <img src="assets/images/testimonials/pic2.jpg" alt="" />
                                        </div>
                                        <div className="testimonial-info">
                                            <h5 className="name">Sarah Lee</h5>
                                            <p>-High School Student</p>
                                        </div>
                                        <div className="testimonial-content">
                                            <p>
                                                "The courses on this platform are easy to follow, and I can study
                                                whenever I want. It’s been an amazing experience to improve my grades!"
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                    {/* Testimonials END ==== */}
                </div>
                {/* contact area END */}
            </div>
        </MainLayout>
    );
}
