import { useEffect, useState } from "react";
import { HomeLayout } from "../layouts";
import { API } from "../api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function StudentProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    useEffect(() => {
        API.get("/students/me").then((resp) => {
            setFirstName(resp.data.firstName);
            setLastName(resp.data.lastName);
            setEmail(resp.data.email);
            setType(resp.data.type);
        });
    }, []);

    const handleSubmitProfile = async () => {
        try {
            const res = await API.post("/students/me", { firstName, lastName, email });
            if (res.status === 200) {
                toast.success("Updated successfully");
            }
        } catch (err) {
            if (isAxiosError(err)) {
                switch (err.status) {
                    case 400:
                        toast.error("");
                        break;
                    default:
                        toast.success("Sent successful!");
                        break;
                }
            }
        }
    };

    const handleChangePassword = async () => {
        try {
            const res = await API.post("/changePassword", { oldpassword, newpassword, repassword });
            if ((res.status = 200)) {
                toast.success("change password successful!");
            } else {
                throw new Error("Something went wrong");
            }
        } catch (err) {
            if (isAxiosError(err)) {
                if (err.response?.status === 400) {
                    toast.error(err.response.data);
                }
            } else {
                toast.error((err as Error).message);
            }
            setOldPassword("");
            setNewPassword("");
            setRePassword("");
        }
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
                                                <label className="col-sm-2 col-form-label">Grade</label>
                                                <div className="col-sm-7">
                                                    <input className="form-control" type="text" value={type} readOnly />
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
                                                            onClick={handleSubmitProfile}>
                                                            Save changes
                                                        </button>{" "}
                                                        <button type="reset" className="btn-secondry">
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
                                                        value={oldpassword}
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
                                                        value={newpassword}
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
                                                        value={repassword}
                                                        onChange={(e) => setRePassword(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-2"></div>
                                            <div className="col-sm-7">
                                                <button type="reset" className="btn" onClick={handleChangePassword}>
                                                    Save changes
                                                </button>{" "}
                                                <button type="reset" className="btn-secondry">
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
