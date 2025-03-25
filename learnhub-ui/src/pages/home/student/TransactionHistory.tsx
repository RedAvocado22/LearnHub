import { useEffect, useState } from "react";
import { API } from "../../../api";
import { HomeLayout } from "../../../layouts";

interface CoursePurchase {
    courseName: string;
    teacherName: string;
    status: string;
    price: number;
    createdAt: Date;
    image: string;
}

export default function TransactionHistory() {
    const [coursePurchase, setCoursePurchase] = useState<CoursePurchase[]>([]);
    const itemsPerPage = 2;
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        API.get("/users/me/transactionHistory")
            .then((resp) => setCoursePurchase(resp.data))
            .catch((error) => console.error("Error fetching transaction history:", error));
    }, []);

    const totalPages = Math.ceil(coursePurchase.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const list = coursePurchase.slice(startIdx, startIdx + itemsPerPage);

    useEffect(() => {
        setCurrentPage(1);
    }, [coursePurchase]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div
                    className="transaction-history-container"
                    style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Course Name</th>
                                    <th>Image</th>
                                    <th>Teacher Name</th>
                                    <th>Price</th>
                                    <th>Transaction Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((course, index) => (
                                    <tr key={index} className="course-row">
                                        <td>{course.courseName}</td>
                                        <td>
                                            <img
                                                src={
                                                    course.image
                                                        ? `https://learnhub-uploads.s3.ap-southeast-2.amazonaws.com/${course.image}`
                                                        : "/assets/images/courses/pic1.jpg"
                                                }
                                                alt="Course Image"
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    borderRadius: "8px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </td>
                                        <td>{course.teacherName}</td>
                                        <td>${course.price.toFixed(2)}</td>
                                        <td>{new Date(course.createdAt).toLocaleString()}</td>
                                        <td>
                                            <span
                                                style={{
                                                    padding: "5px 10px",
                                                    borderRadius: "12px",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    textTransform: "uppercase",
                                                    backgroundColor:
                                                        course.status.toLowerCase() === "success"
                                                            ? "#28a745"
                                                            : "#dc3545",
                                                    color: "white"
                                                }}>
                                                {course.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="col-lg-12 m-b20">
                            <div className="pagination-bx rounded-sm gray clearfix">
                                <ul className="pagination">
                                    <li className={`previous ${currentPage === 1 ? "disabled" : ""}`}>
                                        <a href="#" onClick={() => handlePageChange(currentPage - 1)}>
                                            <i className="ti-arrow-left"></i> Prev
                                        </a>
                                    </li>
                                    {[...Array(totalPages)].map((_, index) => (
                                        <li key={index} className={currentPage === index + 1 ? "active" : ""}>
                                            <a onClick={() => handlePageChange(index + 1)}>{index + 1}</a>
                                        </li>
                                    ))}
                                    <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
                                        <a onClick={() => handlePageChange(currentPage + 1)}>
                                            Next <i className="ti-arrow-right"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
