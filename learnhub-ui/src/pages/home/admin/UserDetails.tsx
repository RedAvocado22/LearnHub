import { Link, useParams } from "react-router-dom";
import { HomeLayout } from "../../../layouts";
import { UserRole, UserStatus } from "../../../types/User";
import Swal from "sweetalert2";
import NotFound from "../../error/NotFound";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { API } from "../../../api";
import { useManageUsers } from "../../../hooks/useManageUsers";

export default function UserDetails() {
    const { id } = useParams();
    const { users, refreshUsers } = useManageUsers();
    const user = users.find((u) => u.id.toString() === id);
    if (!user) {
        return <NotFound />;
    }

    const handleBanUser = async () => {
        const { value } = await Swal.fire({
            title: "Ban Reason",
            input: "textarea",
            inputPlaceholder: "Type your message here...",
            showCancelButton: true
        });
        if (value) {
            try {
                const resp = await API.put(`/users/${user.id}/status`, { status: UserStatus.SUSPENDED, reason: value });
                if (resp.status === 200) {
                    toast.success("Ban user successfully");
                    await refreshUsers();
                }
            } catch (err) {
                let msg = "Something went wrong";
                if (isAxiosError(err)) {
                    msg = err.response?.data.error || msg;
                }
                toast.error(msg);
            }
        }
    };

    const handleUnbanUser = async () => {
        const { value } = await Swal.fire({
            title: "Unban Reason",
            input: "textarea",
            inputPlaceholder: "Type your message here...",
            showCancelButton: true
        });
        if (value) {
            try {
                const resp = await API.put(`/users/${user.id}/status`, { status: UserStatus.ACTIVE, reason: value });
                if (resp.status === 200) {
                    toast.success("Unban user successfully");
                    await refreshUsers();
                }
            } catch (err) {
                let msg = "Something went wrong";
                if (isAxiosError(err)) {
                    msg = err.response?.data.error || msg;
                }
                toast.error(msg);
            }
        }
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="db-breadcrumb">
                        <h4 className="breadcrumb-title">User Details</h4>
                        <ul className="db-breadcrumb-list">
                            <li>
                                <Link to="/admin/users">
                                    <i className="fa fa-home"></i>Users
                                </Link>
                            </li>
                            <li>User Details</li>
                        </ul>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title d-flex justify-content-between align-items-center">
                                    <h4>
                                        {user.firstName} {user.lastName}
                                    </h4>
                                    {user.status === UserStatus.ACTIVE ? (
                                        <button type="button" className="btn" onClick={handleBanUser}>
                                            Ban User
                                        </button>
                                    ) : (
                                        <button type="button" className="btn" onClick={handleUnbanUser}>
                                            Unban User
                                        </button>
                                    )}
                                </div>
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="ml-auto">
                                                    <h3>1. Basic info</h3>
                                                </div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">First name</label>
                                                <div>{user.firstName}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Last name</label>
                                                <div>{user.lastName}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Email</label>
                                                <div>{user.email}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Role</label>
                                                <div>{user.role}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Joined Date</label>
                                                <div>{new Date(user.createdAt || "").toDateString()}</div>
                                            </div>
                                            <div className="form-group col-6">
                                                <label className="col-form-label">Account Status</label>
                                                <div
                                                    className={
                                                        user.status === UserStatus.ACTIVE
                                                            ? "text-success"
                                                            : "text-danger"
                                                    }>
                                                    {user.status}
                                                </div>
                                            </div>
                                            <div className="seperator"></div>

                                            <div className="col-12 m-t20">
                                                <div className="ml-auto m-b5">
                                                    <h3>2. More Details</h3>
                                                </div>
                                            </div>
                                            {user.role === UserRole.STUDENT && user.student && (
                                                <>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Grade</label>
                                                        <div>{user.student.type}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">School</label>
                                                        <div>{user.student.school}</div>
                                                    </div>
                                                </>
                                            )}
                                            {user.role === UserRole.TEACHER && user.teacher && (
                                                <>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Major</label>
                                                        <div>{user.teacher.major}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Phone</label>
                                                        <div>{user.teacher.phone}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Website</label>
                                                        <div>
                                                            <a href={user.teacher.website} target="_blank">
                                                                {user.teacher.website}
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">Work At</label>
                                                        <div>{user.teacher.workAddress}</div>
                                                    </div>
                                                    <div className="form-group col-6">
                                                        <label className="col-form-label">City</label>
                                                        <div>{user.teacher.city}</div>
                                                    </div>
                                                    <div className="form-group col-12">
                                                        <label className="col-form-label">Biography</label>
                                                        <div>
                                                            <p>{user.teacher.biography}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                            {user.role === UserRole.COURSE_MANAGER && user.manager && (
                                                <div className="form-group col-6">
                                                    <label className="col-form-label">Department</label>
                                                    <div>{user.manager.department}</div>
                                                </div>
                                            )}
                                            <div className="seperator"></div>

                                            <div className="col-12 m-t20">
                                                <div className="ml-auto m-b5">
                                                    <h3>3. Contacts</h3>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <table className="table table-striped table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Subject</th>
                                                            <th scope="col">State</th>
                                                            <th scope="col">Resolved Date</th>
                                                            <th scope="col">Created Date</th>
                                                            <th scope="col">Details</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {user.contacts.map((contact, idx) => (
                                                            <tr key={idx}>
                                                                <td>{contact.subject}</td>
                                                                <td>
                                                                    {contact.resolved ? (
                                                                        <p className="text-success">Resolved</p>
                                                                    ) : (
                                                                        <p className="text-danger">Not resolved</p>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {contact.resolvedAt
                                                                        ? new Date(contact.resolvedAt).toDateString()
                                                                        : ""}
                                                                </td>
                                                                <td>{new Date(contact.createdAt).toDateString()}</td>
                                                                <td>
                                                                    <Link
                                                                        to={`/admin/contacts/${contact.id}`}
                                                                        style={{ textDecoration: "underline" }}>
                                                                        Details
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </HomeLayout>
    );
}
