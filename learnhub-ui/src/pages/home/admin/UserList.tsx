import { Link, useSearchParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { UserRole, UserStatus } from "../../../types/User";
import { useEffect, useState } from "react";
import { API } from "../../../api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    status: UserStatus;
    role: UserRole;
    createdAt: Date;
}

const itemsPerPage = 10;
export default function UserList() {
    const [params, _] = useSearchParams();
    const role = params.get("role") || "teachers";
    const [users, setUsers] = useState<User[]>([]);
    const [currPage, setCurrPage] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        API.get("/users")
            .then((resp) => setUsers(resp.data))
            .catch((err) => {
                if (isAxiosError(err)) {
                    toast.error(err.response?.data || "Something went wrong");
                }
                console.error((err as Error).message);
            });
    }, []);

    let list = users
        .filter((user) => {
            const fullName = `${user.firstName} ${user.lastName}`;
            return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        })
        .filter((user) => {
            if (role === "teachers") {
                return user.role === UserRole.TEACHER;
            } else if (role === "coursemanagers") {
                return user.role === UserRole.COURSE_MANAGER;
            } else if (role === "students") {
                return user.role === UserRole.STUDENT;
            }
            return true;
        })
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const totalPages = Math.ceil(list.length / itemsPerPage);
    const startIdx = currPage * itemsPerPage;
    list = list.slice(startIdx, startIdx + itemsPerPage);
    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">Manage Users</h4>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="email-wrapper">
                                    <div className="email-menu-bar">
                                        <div className="compose-mail">
                                            <Link to="/admin/users/add" className="btn btn-block">
                                                Add User
                                            </Link>
                                        </div>
                                        <div className="email-menu-bar-inner">
                                            <ul>
                                                <li className={role === "teachers" ? "active" : ""}>
                                                    <Link to="/admin/users?role=teachers">
                                                        <i className="fa fa-book"></i>Teachers
                                                    </Link>
                                                </li>
                                                <li className={role === "coursemanagers" ? "active" : ""}>
                                                    <Link to="/admin/users?role=coursemanagers">
                                                        <i className="fa fa-user"></i>Course Managers
                                                    </Link>
                                                </li>
                                                <li className={role === "students" ? "active" : ""}>
                                                    <Link to="/admin/users?role=students">
                                                        <i className="fa fa-graduation-cap"></i>Students
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="mail-list-container">
                                        <div className="mail-toolbar">
                                            <div className="mail-search-bar">
                                                <input
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Search"
                                                />
                                            </div>
                                            <div className="next-prev-btn">
                                                <span className="mr-3">
                                                    Page {currPage + 1} of {totalPages}
                                                </span>
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        if (currPage > 0) {
                                                            setCurrPage(currPage - 1);
                                                        }
                                                    }}>
                                                    <i className="fa fa-angle-left"></i>
                                                </a>{" "}
                                                <a
                                                    href="#"
                                                    onClick={() => {
                                                        if (currPage < totalPages - 1) {
                                                            setCurrPage(currPage + 1);
                                                        }
                                                    }}>
                                                    <i className="fa fa-angle-right"></i>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="mail-box-list">
                                            {list.map((user) => (
                                                <div key={user.id} className="mail-list-info">
                                                    <span
                                                        className={`ml-2 badge ${user.status === UserStatus.ACTIVE ? "badge-success" : "badge-danger"}`}>
                                                        {user.status === UserStatus.ACTIVE
                                                            ? "Active"
                                                            : user.status === UserStatus.UNACTIVE
                                                              ? "Unactive"
                                                              : "Suspended"}
                                                    </span>
                                                    <div className="mail-list-title">
                                                        <h6>
                                                            <Link
                                                                to={`/admin/users/${user.id}`}
                                                                state={{ role: user.role }}>
                                                                {user.firstName} {user.lastName}
                                                            </Link>
                                                        </h6>
                                                    </div>
                                                    <div className="mail-list-title-info">
                                                        <p>{user.email}</p>
                                                    </div>
                                                    <div className="mail-list-time">
                                                        <span>{new Date(user.createdAt).toDateString()}</span>
                                                    </div>
                                                </div>
                                            ))}
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
