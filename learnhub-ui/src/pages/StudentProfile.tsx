import { useEffect, useState } from "react";
import { Footer, Header } from "../layouts";
import { API } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";

export default function StudentProfile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const navigate = useNavigate();

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
                navigate("/user-profile");
                toast.success("Edited successful!");
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
            if (res.status === 200) {
                navigate("/userProfile");
                toast.success("change password successful!");
            }
        } catch (err) {
            if (isAxiosError(err)) {
                if (err.response?.status === 400) {
                    toast.error(err.response.data);
                }
            }
        }
    };

    return (
        <div className="page-content bg-white">
            <Header />
            <div
                className="page-banner ovbl-dark"
                style={{ backgroundImage: "url(/assets/images/banner/banner1.jpg)" }}>
                <div className="container">
                    <div className="page-banner-entry">
                        <h1 className="text-white">Profile</h1>
                    </div>
                </div>
            </div>
            <div className="content-block">
                <div className="section-area section-sp1">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-12 m-b30">
                                <div className="profile-bx text-center">
                                    <div className="user-profile-thumb">
                                        <img src="/assets/images/profile/pic1.jpg" alt="" />
                                    </div>
                                    <div className="profile-info">
                                        <h4>
                                            {firstName} {lastName}
                                        </h4>
                                        <span>{email}</span>
                                    </div>
                                    <div className="profile-social">
                                        <ul className="list-inline m-a0">
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-linkedin"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="fa fa-google-plus"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="profile-tabnav">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#courses">
                                                    <i className="ti-book"></i>Courses
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#edit-profile">
                                                    <i className="ti-pencil-alt"></i>Edit Profile
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#change-password">
                                                    <i className="ti-lock"></i>Change Password
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-12 m-b30">
                                <div className="profile-content-bx">
                                    <div className="tab-content">
                                        <div className="tab-pane active" id="courses">
                                            <div className="profile-head">
                                                <h3>My Courses</h3>
                                                <div className="feature-filters style1 ml-auto">
                                                    <ul className="filters" data-toggle="buttons">
                                                        <li data-filter="" className="btn active">
                                                            <input type="radio" />
                                                            <a href="#">
                                                                <span>All</span>
                                                            </a>
                                                        </li>
                                                        <li data-filter="publish" className="btn">
                                                            <input type="radio" />
                                                            <a href="#">
                                                                <span>Publish</span>
                                                            </a>
                                                        </li>
                                                        <li data-filter="pending" className="btn">
                                                            <input type="radio" />
                                                            <a href="#">
                                                                <span>Pending</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="courses-filter">
                                                <div className="clearfix">
                                                    <ul id="masonry" className="ttr-gallery-listing magnific-image row">
                                                        <li className="action-card col-xl-4 col-lg-6 col-md-12 col-sm-6 publish">
                                                            <div className="cours-bx">
                                                                <div className="action-box">
                                                                    <img src="assets/images/courses/pic9.jpg" alt="" />
                                                                    <a href="#" className="btn">
                                                                        Read More
                                                                    </a>
                                                                </div>
                                                                <div className="info-bx text-center">
                                                                    <h5>
                                                                        <a href="#">
                                                                            Introduction EduChamp – LMS plugin
                                                                        </a>
                                                                    </h5>
                                                                    <span>Programming</span>
                                                                </div>
                                                                <div className="cours-more-info">
                                                                    <div className="review">
                                                                        <span>3 Review</span>
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
                                                                        <del>$190</del>
                                                                        <h5>$120</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="quiz-results">
                                            <div className="profile-head">
                                                <h3>Quiz Results</h3>
                                            </div>
                                            <div className="courses-filter">
                                                <div className="row">
                                                    <div className="col-md-6 col-lg-6">
                                                        <ul className="course-features">
                                                            <li>
                                                                <i className="ti-book"></i>{" "}
                                                                <span className="label">Lectures</span>{" "}
                                                                <span className="value">8</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-help-alt"></i>{" "}
                                                                <span className="label">Quizzes</span>{" "}
                                                                <span className="value">1</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-time"></i>{" "}
                                                                <span className="label">Duration</span>{" "}
                                                                <span className="value">60 hours</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-stats-up"></i>{" "}
                                                                <span className="label">Skill level</span>{" "}
                                                                <span className="value">Beginner</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-smallcap"></i>{" "}
                                                                <span className="label">Language</span>{" "}
                                                                <span className="value">English</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-user"></i>{" "}
                                                                <span className="label">Students</span>{" "}
                                                                <span className="value">32</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-check-box"></i>{" "}
                                                                <span className="label">Assessments</span>{" "}
                                                                <span className="value">Yes</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="col-md-6 col-lg-6">
                                                        <ul className="course-features">
                                                            <li>
                                                                <i className="ti-book"></i>{" "}
                                                                <span className="label">Lectures</span>{" "}
                                                                <span className="value">8</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-help-alt"></i>{" "}
                                                                <span className="label">Quizzes</span>{" "}
                                                                <span className="value">1</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-time"></i>{" "}
                                                                <span className="label">Duration</span>{" "}
                                                                <span className="value">60 hours</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-stats-up"></i>{" "}
                                                                <span className="label">Skill level</span>{" "}
                                                                <span className="value">Beginner</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-smallcap"></i>{" "}
                                                                <span className="label">Language</span>{" "}
                                                                <span className="value">English</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-user"></i>{" "}
                                                                <span className="label">Students</span>{" "}
                                                                <span className="value">32</span>
                                                            </li>
                                                            <li>
                                                                <i className="ti-check-box"></i>{" "}
                                                                <span className="label">Assessments</span>{" "}
                                                                <span className="value">Yes</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane" id="edit-profile">
                                            <div className="profile-head">
                                                <h3>Edit Profile</h3>
                                            </div>
                                            <form className="edit-profile">
                                                <div className="">
                                                    <div className="form-group row">
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-10 ml-auto">
                                                            <h3> Personal Details</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            First name
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            <input
                                                                type="text"
                                                                value={firstName}
                                                                onChange={(e) => setFirstName(e.target.value)}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Last name
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            <input
                                                                type="text"
                                                                value={lastName}
                                                                onChange={(e) => setLastName(e.target.value)}
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Email
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            <input
                                                                type="text"
                                                                value={email}
                                                                readOnly
                                                                className="form-control"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-3 col-md-3 col-lg-2 col-form-label">
                                                            Grade
                                                        </label>
                                                        <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                            <input
                                                                className="form-control"
                                                                type="text"
                                                                value={type}
                                                                readOnly
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="seperator"></div>
                                                </div>
                                                <div className="">
                                                    <div className="">
                                                        <div className="row">
                                                            <div className="col-12 col-sm-3 col-md-3 col-lg-2"></div>
                                                            <div className="col-12 col-sm-9 col-md-9 col-lg-7">
                                                                <button
                                                                    type="button"
                                                                    className="btn"
                                                                    onClick={handleSubmitProfile}>
                                                                    Save changes
                                                                </button>
                                                                {/* <button type="reset" className="btn-secondry">
                                                                    Cancel
                                                                </button> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="tab-pane" id="change-password">
                                            <div className="profile-head">
                                                <h3>Change Password</h3>
                                            </div>
                                            <form className="edit-profile">
                                                <div className="">
                                                    <div className="form-group row">
                                                        <div className="col-12 col-sm-8 col-md-8 col-lg-9 ml-auto">
                                                            <h3>Password</h3>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                                                            Current Password
                                                        </label>
                                                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                                                            <input
                                                                className="form-control"
                                                                type="password"
                                                                value={oldpassword}
                                                                onChange={(e) => setOldPassword(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                                                            New Password
                                                        </label>
                                                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                                                            <input
                                                                className="form-control"
                                                                type="password"
                                                                value={newpassword}
                                                                onChange={(e) => setNewPassword(e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                        <label className="col-12 col-sm-4 col-md-4 col-lg-3 col-form-label">
                                                            Re Type New Password
                                                        </label>
                                                        <div className="col-12 col-sm-8 col-md-8 col-lg-7">
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
                                                    <div className="col-12 col-sm-4 col-md-4 col-lg-3"></div>
                                                    <div className="col-12 col-sm-8 col-md-8 col-lg-7">
                                                        <button
                                                            type="button"
                                                            className="btn"
                                                            onClick={handleChangePassword}>
                                                            Save changes
                                                        </button>

                                                        {/* <button type="reset" className="btn-secondry">
                                                            Cancel
                                                        </button> */}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
