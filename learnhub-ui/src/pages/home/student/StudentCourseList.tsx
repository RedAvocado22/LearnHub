import { HomeLayout } from "../../../layouts";
import placeholder from "/assets/images/blog/default/thum1.jpg";
import avaPlaceholder from "/assets/images/testimonials/default.jpg";

interface Course {
    id: number;
    name: string;
    category: { id: number; name: string };
    price: number;
}

export default function StudentCourseList({ status }: { status: string }) {
    console.log(status);
    return (
        <HomeLayout>
            <div
                className="container-fluid "
                style={{
                    marginTop: "80px",
                    maxHeight: "calc(100vh - 80px)",
                    padding: "0 100px"
                }}>
                <h1>{status}</h1>
                <ul>
                    <li
                        className="row px-0 shadow p-4 mb-4"
                        style={{
                            borderRadius: "10px"
                        }}>
                        <div className="col-3">
                            <img
                                src={placeholder}
                                loading="lazy"
                                style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "10px"
                                }}
                            />
                        </div>
                        <div className="col-9">
                            <div
                                className="row d-flex flex-column"
                                style={{
                                    gap: "8px"
                                }}>
                                <div className="col-12 p-0">
                                    <h1
                                        className="m-0"
                                        style={{
                                            fontSize: "30px"
                                        }}>
                                        A Design Thinking Approach to Putting the Customer First
                                    </h1>
                                </div>
                                <ul
                                    className="col-12 p-0 list-unstyled d-flex "
                                    style={{
                                        gap: "100px"
                                    }}>
                                    <li
                                        className="d-flex align-items-center"
                                        style={{
                                            gap: "6px"
                                        }}>
                                        <img
                                            src={avaPlaceholder}
                                            loading="lazy"
                                            style={{
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%"
                                            }}
                                        />
                                        <span>Quoc bao</span>
                                    </li>
                                    <li
                                        className="d-flex align-items-center"
                                        style={{
                                            gap: "6px"
                                        }}>
                                        <i className="fa fa-book" aria-hidden="true"></i>
                                        <span>Lessons 12</span>
                                    </li>
                                    <li
                                        className="d-flex align-items-center"
                                        style={{
                                            gap: "6px"
                                        }}>
                                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                                        <span>Assignment 07</span>
                                    </li>
                                    <li
                                        className="d-flex align-items-center"
                                        style={{
                                            gap: "6px"
                                        }}>
                                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                                        <span>3h 10m</span>
                                    </li>
                                </ul>
                                <div className="row col-12 align-items-center ">
                                    <div className="progress col-9 p-0">
                                        <div
                                            className="progress-bar "
                                            role="progressbar"
                                            style={{ width: "20%" }}
                                            aria-valuenow={50}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        />
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-primary">Continue Course</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </HomeLayout>
    );
}
