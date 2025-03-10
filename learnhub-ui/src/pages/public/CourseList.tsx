import { useEffect, useState } from "react";
import { MainLayout } from "../../layouts";
import { API } from "../../api";

interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
    image: string;
    teacher: { id: number; name: string };
}

export default function CourseList() {
    const [courses, setCourses] = useState<Course[]>([]); // All courses
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]); // Filtered courses based on search term
    const [paginatedCourses, setPaginatedCourses] = useState<Course[]>([]); // Paginated courses for display
    const [searchTerm, setSearchTerm] = useState<string>(""); // Track search term
    const [currentPage, setCurrentPage] = useState<number>(1); // Track current page
    const coursesPerPage = 6; // Number of courses per page

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const resp = await API.get("/public/courses");
                setCourses(resp?.data || []); // Store all courses
                setFilteredCourses(resp?.data || []); // Set initial filtered courses
                console.log(resp.data);
            } catch (error) {
                console.error("Failed to fetch courses:", error);
            }
        };

        fetchCourses();
    }, []); // Fetch courses on initial load

    useEffect(() => {
        // Filter courses based on the search term
        const filtered = courses.filter((course) => course.name.toLowerCase().includes(searchTerm.toLowerCase()));
        setFilteredCourses(filtered);
        setCurrentPage(1); // Reset to page 1 when search term changes
    }, [searchTerm, courses]); // Trigger filtering on search term or courses change

    useEffect(() => {
        // Paginate filtered courses
        const indexOfLastCourse = currentPage * coursesPerPage;
        const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
        setPaginatedCourses(filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse));
    }, [currentPage, filteredCourses]); // Update pagination when filtered courses or currentPage change

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // Calculate the total number of pages
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    return (
        <MainLayout>
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
                <div className="content-block">
                    <div className="section-area section-sp1">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                    <div className="widget courses-search-bx placeani">
                                        <div className="form-group">
                                            <div className="input-group">
                                                <input
                                                    name="dzName"
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={handleSearchChange}
                                                    required
                                                    className="form-control"
                                                    placeholder="Search course"
                                                />
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
                                    </div>
                                </div>
                                <div className="col-lg-9 col-md-8 col-sm-12">
                                    <div className="row">
                                        {paginatedCourses.length > 0 ? (
                                            paginatedCourses.map((course) => (
                                                <div key={course.id} className="col-md-6 col-lg-4 col-sm-6 m-b30">
                                                    <div className="cours-bx">
                                                        <div className="action-box" style={{ maxHeight: "160px" }}>
                                                            {course.image ? (
                                                                <img src={course.image} alt="Course Image" />
                                                            ) : (
                                                                <img
                                                                    src="/assets/images/courses/pic1.jpg"
                                                                    alt="Default Course"
                                                                />
                                                            )}
                                                            <a href="#" className="btn">
                                                                Read More
                                                            </a>
                                                        </div>
                                                        <div
                                                            className="info-bx text-center"
                                                            style={{ minHeight: "135px" }}>
                                                            <h5>
                                                                <a href="#">{course.name}</a>
                                                            </h5>
                                                            <span>{course.category.name}</span>
                                                        </div>
                                                        <div className="cours-more-info">
                                                            <div className="review">
                                                                <span>
                                                                    <a href={`/teacher/${course.teacher.id}`}>
                                                                        {course.teacher.name}
                                                                    </a>
                                                                </span>
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
                                                                <h5>
                                                                    {course.price > 0 ? `$${course.price}` : "FREE"}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Loading courses...</p>
                                        )}
                                        {/* Pagination */}
                                        <div className="col-lg-12 m-b20">
                                            <div className="pagination-bx rounded-sm gray clearfix">
                                                <ul className="pagination">
                                                    <li className={`previous ${currentPage === 1 ? "disabled" : ""}`}>
                                                        <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                                            <i className="ti-arrow-left"></i> Prev
                                                        </a>
                                                    </li>
                                                    {[...Array(totalPages)].map((_, index) => (
                                                        <li
                                                            key={index}
                                                            className={currentPage === index + 1 ? "active" : ""}>
                                                            <a href="#" onClick={() => handlePageChange(index + 1)}>
                                                                {index + 1}
                                                            </a>
                                                        </li>
                                                    ))}
                                                    <li
                                                        className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
                                                        <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
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
        </MainLayout>
    );
}
