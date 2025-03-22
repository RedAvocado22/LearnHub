import { useEffect, useState } from "react";
import { API } from "../../../api";
import { MainLayout } from "../../../layouts";

interface CoursePurchase {
    courseName: string;
    teacherName: string;
    categoryName: string;
    status: string;
    price: number;
    createdAt: Date;
    image: string;
}

export default function TransactionHistory() {
    const [coursePurchase, setCoursePurchase] = useState<CoursePurchase[]>([]);
    const itemsPerPage = 6;
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
    }, [coursePurchase]); // Reset currentPage khi coursePurchase thay đổi

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <MainLayout>
            {/* Banner */}
            <div
                className="page-banner ovbl-dark"
                style={{
                    backgroundImage: "url(/assets/images/banner/banner3.jpg)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "300px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    textAlign: "center"
                }}>
                <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
                    Transaction History
                </h1>
            </div>

            {/* Bảng lịch sử giao dịch */}
            <div
                className="transaction-history-container"
                style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th>#</th>
                                <th>Course Name</th>
                                <th>Image</th>
                                <th>Teacher Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Transaction Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((course, index) => (
                                <tr key={index} className="course-row">
                                    <td>{index + 1}</td>
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
                                    <td>{course.categoryName}</td>
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
                                                    course.status.toLowerCase() === "success" ? "#28a745" : "#dc3545",
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
                                        <a href="#" onClick={() => handlePageChange(index + 1)}>
                                            {index + 1}
                                        </a>
                                    </li>
                                ))}
                                <li className={`next ${currentPage === totalPages ? "disabled" : ""}`}>
                                    <a href="#" onClick={() => handlePageChange(currentPage + 1)}>
                                        Next <i className="ti-arrow-right"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
