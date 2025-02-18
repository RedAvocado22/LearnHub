import { useState } from "react";
import { HomeLayout } from "../../../layouts";
import { API } from "../../../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";
import { useStudent } from "../../../hooks/useUser";
import { StudentType } from "../../../types/User";

export default function StudentProfile() {
    const { user, setUser } = useStudent();
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [type, setType] = useState<StudentType>(user.details.studentType);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const handleSubmitAccountChange = async () => {
        try {
            const resp = await API.put("/students/me", { firstName, lastName, type });
            if (resp.status === 200) {
                toast.success("Updated successfully");
                if (resp.data) {
                    setFirstName(resp.data.firstName);
                    setLastName(resp.data.lastName);
                    setType(resp.data.studentType);
                    setUser(resp.data);
                }
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message);
            }
        }
    };

    const handleCancelAccountChange = () => {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setType(user.details.studentType);
    };

    const handleSubmitPasswordChange = async () => {
        try {
            const res = await API.put("/users/me/password", { oldPassword, newPassword });
            if (res.status === 200) {
                toast.success("Change password successfully");
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            if (isAxiosError(err)) {
                toast.error(err.response?.data.message || "Something went wrong");
            } else {
                toast.error((err as Error).message);
            }
        }
        setOldPassword("");
        setNewPassword("");
        setRePassword("");
    };

    const handleCancelPasswordChange = async () => {
        setOldPassword("");
        setNewPassword("");
        setRePassword("");
    };

    return (
        <HomeLayout>
            <main className="ttr-wrapper">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 m-b30">
                            <div className="widget-box">
                                <div className="wc-title">
                                    <h4>User Profile</h4>
                                </div>
                                <div className="widget-inner">
                                    <form className="edit-profile m-b30">
                                        <div className="">
                                            <div className="form-group row">
                                                <div className="col-sm-10  ml-auto">
                                                    <h3>1. Personal Details</h3>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">First Name</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={firstName}
                                                        onChange={(e) => setFirstName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Last Name</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={lastName}
                                                        onChange={(e) => setLastName(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Email</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="text"
                                                        value={email}
                                                        readOnly
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Education Level</label>
                                                <div className="col-sm-7">
                                                    <select
                                                        value={type}
                                                        onChange={(e) => setType(e.target.value as StudentType)}
                                                        className="form-select form-control">
                                                        <option value={StudentType.GRADE10}>Grade 10</option>
                                                        <option value={StudentType.GRADE11}>Grade 11</option>
                                                        <option value={StudentType.GRADE12}>Grade 12</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="">
                                                <div className="row">
                                                    <div className="col-sm-2"></div>
                                                    <div className="col-sm-7">
                                                        <button
                                                            type="reset"
                                                            className="btn"
                                                            onClick={handleSubmitAccountChange}>
                                                            Save changes
                                                        </button>{" "}
                                                        <button
                                                            type="reset"
                                                            className="btn-secondry"
                                                            onClick={handleCancelAccountChange}>
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                    <form className="edit-profile">
                                        <div className="">
                                            <div className="form-group row">
                                                <div className="col-sm-10 ml-auto">
                                                    <h3>2. Password</h3>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Current Password</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        value={oldPassword}
                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">New Password</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Re Type Password</label>
                                                <div className="col-sm-7">
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        value={rePassword}
                                                        onChange={(e) => setRePassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-7">
                                                <button
                                                    type="reset"
                                                    className="btn"
                                                    onClick={handleSubmitPasswordChange}>
                                                    Save changes
                                                </button>{" "}
                                                <button
                                                    type="reset"
                                                    className="btn-secondry"
                                                    onClick={handleCancelPasswordChange}>
                                                    Cancel
                                                </button>
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
